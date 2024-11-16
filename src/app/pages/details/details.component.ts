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
    this.movieGenre = parts[parts.length - 1].replace('%20', ' ');
    this.filterByGenre(this.movieGenre);
  }

  filterByGenre(genre: string): void {
    this.movieGenre = genre;
    this.filteredMovies = [];
    const genreToFilter = this.movieGenre.toLowerCase().trim();

    this.CategoryService.categories.forEach(category => {
      const filtered = category.movies.filter(movie => {
        const genres = movie?.Genre.split(',').map(g => g.toLowerCase().trim());
        return genres?.includes(genreToFilter);
      });

      this.filteredMovies.push(...filtered);
    });
  }
}
