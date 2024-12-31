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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTopOnRouteChange();

    this.route.paramMap.subscribe((params) => {
      const routeValue = decodeURIComponent(params.get('searchTitle') || '');
      this.breadcrumbName = routeValue;

      this.CategoryService.loadData().subscribe(() => {
        this.initializeFilteredMovies(routeValue);
      });
    });
  }

  private initializeFilteredMovies(routeValue: string): void {
    const matchingMovies = this.CategoryService.searchMoviesByPartialTitle(routeValue);

    if (matchingMovies.length > 0) {
      this.filteredMovies = this.sortMoviesByTitle(matchingMovies);
      this.totalFilteredMovies = matchingMovies.length;
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

  private sortMoviesByTitle(movies: Array<{ Title: string }>): Array<{ Title: string }> {
    return movies.sort((a, b) => a.Title.localeCompare(b.Title));
  }

}
