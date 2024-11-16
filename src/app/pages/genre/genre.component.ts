import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';
import { ScrollService } from '../../services/scroll.service';
import { Database } from '../../models/Database.model'

@Component({
    selector: 'app-genre',
    standalone: true,
    templateUrl: './genre.component.html',
    styleUrls: ['../home/home.component.css', '../genre/genre.component.css'],
    imports: [CommonModule, CardComponent, RouterLink]
})
export class GenreComponent {
  movieTitle: string = '';
  movieGenre: string = '';

  categories : any[] = [];
  category : Category | undefined;
  movies: Database[] = [];

  constructor(
    private CategoryService: CategoryService,
    private scrollService: ScrollService,
    private router: Router) {}

  ngOnInit() {
    this.categories = this.CategoryService.categories;
    this.scrollService.scrollToTopOnRouteChange();

    const parts = window.location.href.split('/');
    this.movieGenre = parts[parts.length - 1].replace('%20', ' ');

    this.category = this.categories.find((category: Category) => category.title === this.movieGenre);
    this.loadMovieDetails()
  }

  private loadMovieDetails() {
    if (this.category) {
      const categoryTitle = this.category.title;
      this.movies = this.CategoryService.getMoviesByCategory(categoryTitle);
    } else {
      this.router.navigate(['/']);
    }
  }
}
