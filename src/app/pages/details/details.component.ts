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
    selector: 'app-details',
    standalone: true,
    templateUrl: './details.component.html',
    styleUrls: ['../home/home.component.css', '../genre/genre.component.css'],
    imports: [CommonModule, CardComponent, RouterLink]
})
export class DetailsComponent {
  movieGenre: string = '';
  actor: string = '';
  director: string = '';
  breadcrumbName: string = '';

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
    const routeName = parts[parts.length - 2];
    const routeValue = decodeURIComponent(parts[parts.length - 1]);

    switch (routeName) {
      case 'genre':
        this.breadcrumbName = routeValue;
        this.filterByGenre(this.breadcrumbName);
        break;
      case 'actor':
        this.breadcrumbName = routeValue;
        this.filterByActor(this.breadcrumbName);
        break;
      case 'director':
        this.breadcrumbName = routeValue;
        this.filterByDirector(this.breadcrumbName);
        break;
    }
  }

  filterByGenre(genre: string): void {
    this.breadcrumbName = genre;
    this.filteredMovies = [];
    const genreToFilter = this.breadcrumbName.toLowerCase().trim();
    const movieIds = new Set();

    this.CategoryService.categories.forEach(category => {
      const filtered = category.movies.filter(movie => {
        const list = movie?.Genre.split(',').map(g => g.toLowerCase().trim());
        return list?.includes(genreToFilter);
      });

      filtered.forEach(movie => {
        if (!movieIds.has(movie?.imdbID)) {
          movieIds.add(movie?.imdbID);
          this.filteredMovies.push(movie);
        }
      });

    });
  }

  filterByActor(actor: string): void {
    this.breadcrumbName = actor;
    this.filteredMovies = [];
    const actorToFilter = this.breadcrumbName.toLowerCase().trim();
    const movieIds = new Set();


    this.CategoryService.categories.forEach(category => {
      const filtered = category.movies.filter(movie => {
        const list = movie?.Actors.split(',').map(g => g.toLowerCase().trim());
        return list?.includes(actorToFilter);
      });

      filtered.forEach(movie => {
        if (!movieIds.has(movie?.imdbID)) {
          movieIds.add(movie?.imdbID);
          this.filteredMovies.push(movie);
        }
      });

    });
  }

  filterByDirector(director: string): void {
    this.breadcrumbName = director;
    this.filteredMovies = [];
    const directorToFilter = this.breadcrumbName.toLowerCase().trim();
    const movieIds = new Set();

    this.CategoryService.categories.forEach(category => {
      const filtered = category.movies.filter(movie => {
        const list = movie?.Director.split(',').map(d => d.toLowerCase().trim());
        return list?.includes(directorToFilter);
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
