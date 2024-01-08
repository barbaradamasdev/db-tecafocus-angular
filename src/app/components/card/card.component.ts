import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit  {
  @Input() movieTitle: string = '';
  @Input() movieDirector: string = '';
  @Input() movieYear: number = 0;
  @Input() movieGenre: string = '';
  @Input() moviePoster: string = '';
  @Input() movieimdbRating: string = '';
  @Input() notaTeca?: string;

  constructor(
    private moviedbService: MoviedbService,
    private CategoryService: CategoryService) {}

  ngOnInit() {
    this.loadMovieDetails();
  }

  private loadMovieDetails() {
    const movieDetails = this.CategoryService.getMovieDetailsByTitle(this.movieTitle);

    if (movieDetails) {
      this.movieYear = movieDetails.Year;
      this.movieDirector = movieDetails.Director;
      this.moviePoster = movieDetails.Poster;
      this.movieimdbRating = movieDetails.imdbRating;
      this.notaTeca = movieDetails.NotaTeca;
    }
  }
}
