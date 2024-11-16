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
    selector: 'app-director',
    standalone: true,
    templateUrl: './director.component.html',
    styleUrls: ['../home/home.component.css', '../genre/genre.component.css'],
    imports: [CommonModule, CardComponent, RouterLink]
})
export class DirectorComponent {
  director: string = '';
  categories : any[] = [];
  category : Category | undefined;
  movies: Database[] = [];
  filteredMovies: any[] = [];

  constructor(
    private CategoryService: CategoryService,
    private scrollService: ScrollService,
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTopOnRouteChange();
    const parts = window.location.href.split('/');
    this.director = parts[parts.length - 1].replaceAll('%20', ' ');
    this.filterByDirector(this.director);
  }

  filterByDirector(director: string): void {
    this.director = director;
    this.filteredMovies = [];
    const directorToFilter = this.director.toLowerCase().trim();
    const movieIds = new Set();

    this.CategoryService.categories.forEach(category => {
      const filtered = category.movies.filter(movie => {
        const directors = movie?.Director.split(',').map(d => d.toLowerCase().trim());
        return directors?.includes(directorToFilter);
      });

      filtered.forEach(movie => {
        if (!movieIds.has(movie?.imdbID)) {
          movieIds.add(movie?.imdbID);
          this.filteredMovies.push(movie);
        }
      });

    });
  }
}
