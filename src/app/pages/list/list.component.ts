import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';
import { ScrollService } from '../../services/scroll.service';
import { Database } from '../../models/Database.model'

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrls: ['../home/home.component.css', '../list/list.component.css'],
    imports: [CommonModule, CardComponent, RouterLink]
})
export class ListComponent {
  actor: string = '';
  director: string = '';
  breadcrumbName: string = '';
  totalFilteredMovies: number = 0;

  categories : any[] = [];
  category : Category | undefined;
  filteredMovies: any[] = [];

  routeMap: Record<string, 'Genre' | 'Actors' | 'Director' | 'Language' | 'Country' | 'Writer' | 'Year' | 'Type'> = {
    genre: 'Genre',
    actor: 'Actors',
    director: 'Director',
    language: 'Language',
    country: 'Country',
    writer: 'Writer',
    year: 'Year',
    type: 'Type'
  };

  constructor(
    private CategoryService: CategoryService,
    private scrollService: ScrollService,
  ) {
  }

  ngOnInit(): void {
    this.scrollService.scrollToTopOnRouteChange();

    const [routeName, routeValue] = this.extractRouteParts();
    this.breadcrumbName = routeValue;

    this.CategoryService.loadData().subscribe(() => {
      this.categories = this.CategoryService.categories;
      this.category = this.categories.find((category: Category) => category.title === routeValue);

      if (routeName === 'imdb') {
        this.sortByRating(routeName);
      } else if (this.routeMap[routeName]) {
        this.filterMoviesByProperty(this.routeMap[routeName], routeValue);
      } else if (this.category) {
        this.loadCategoryMovies(routeValue);
      }
    });
  }

  private extractRouteParts(): [string, string] {
    const parts = window.location.href.split('/');
    const routeName = parts[3] || '';
    const routeValue = decodeURIComponent(parts[4] || '');
    return [routeName, routeValue];
  }

  private loadCategoryMovies(routeValue: string): void {
    this.breadcrumbName = routeValue;
    this.loadMovieDetails();
    this.initializeFilteredMovies(routeValue);
  }


  private initializeFilteredMovies(routeValue: string): void {
    const matchingMovies = this.CategoryService.getMoviesByCategory(routeValue);

    if (matchingMovies.length > 0) {
      this.filteredMovies = matchingMovies;
      this.totalFilteredMovies = matchingMovies.length;
    }
  }

  private loadMovieDetails() {
    if (this.category) {
      this.filteredMovies = this.CategoryService.getMoviesByCategory(this.category.title);
      this.totalFilteredMovies = this.filteredMovies.length;
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  }

  filterMoviesByProperty(
    property: 'Genre' | 'Actors' | 'Director' | 'Language' | 'Country' | 'Writer' | 'Year' | 'Type',
    value: string
  ): void {
    this.breadcrumbName = value;
    this.filteredMovies = [];
    const filterValue = this.breadcrumbName.toLowerCase().trim();
    const movieIds = new Set();

    this.CategoryService.categories.forEach(category => {
      category.movies.forEach((movieRef: { imdbID: any; }) => {
        const movie = this.CategoryService.movies.find(m => m?.imdbID === movieRef.imdbID);
        if (!movie || movieIds.has(movie.imdbID)) {
          return;
        }

        if (property === 'Year' || property === 'Type') {
          if (movie[property]?.toLowerCase().trim() === filterValue) {
            movieIds.add(movie.imdbID);
            this.filteredMovies.push(movie);
          }
        } else {
          const list = movie[property]?.split(',').map((item: string) => item.toLowerCase().trim());
          if (list?.includes(filterValue)) {
            movieIds.add(movie.imdbID);
            this.filteredMovies.push(movie);
          }
        }
      });
    });

    this.totalFilteredMovies = this.filteredMovies.length;
  }


  sortByRating(routeName: string): void {
    this.breadcrumbName = routeName.toUpperCase();
    const movieIds = new Set<string>();
    this.filteredMovies = [];

    this.CategoryService.movies.forEach((movie: { imdbID: string; imdbRating: string; }) => {
      if (movie?.imdbID && !movieIds.has(movie.imdbID)) {
        movieIds.add(movie.imdbID);
        this.filteredMovies.push(movie);
      }
    });

    this.filteredMovies.sort((a, b) => {
      const ratingA = parseFloat(a.imdbRating) || 0;
      const ratingB = parseFloat(b.imdbRating) || 0;
      return ratingB - ratingA;
    });

    this.totalFilteredMovies = this.filteredMovies.length;
  }

}
