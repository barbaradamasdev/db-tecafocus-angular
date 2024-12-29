import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';
import { ScrollService } from '../../services/scroll.service';
import { Database } from '../../models/Database.model'

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrls: ['../home/home.component.css', '../search/search.component.css'],
    imports: [CommonModule, CardComponent, RouterLink]
})
export class SearchComponent {
  actor: string = '';
  director: string = '';
  breadcrumbName: string = '';
  totalFilteredMovies: number = 0;

  categories : any[] = [];
  movies : any[] = [];
  category : Category | undefined;
  filteredMovies: any[] = [];

  constructor(
    private CategoryService: CategoryService,
    private scrollService: ScrollService,
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTopOnRouteChange();
    const parts = window.location.href.split('/');
    const routeValue = decodeURIComponent(parts[4]);
    this.breadcrumbName = routeValue;

    if (!this.CategoryService.categories.length || !this.CategoryService.movies.length) {
      this.CategoryService.loadData().subscribe(() => {
        this.initializeFilteredMovies(routeValue);
      });
    } else {
      this.initializeFilteredMovies(routeValue);
    }
  }

  private initializeFilteredMovies(routeValue: string): void {
    const matchingMovies = this.CategoryService.searchMoviesByPartialTitle(routeValue);

    if (matchingMovies.length > 0) {
      this.filteredMovies = matchingMovies;
      this.totalFilteredMovies = matchingMovies.length;
      console.log('Filmes filtrados:', this.filteredMovies);
    } else {
      console.log('Nenhum filme encontrado para:', routeValue);
      this.filteredMovies = [];
      this.totalFilteredMovies = 0;
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  }

}
