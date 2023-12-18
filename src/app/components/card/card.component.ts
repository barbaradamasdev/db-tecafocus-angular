import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
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

  constructor(private moviedbService: MoviedbService) {}

  ngOnInit() {
    this.loadMovieDetails();
  }

  private loadMovieDetails() {
    this.moviedbService.getMovieByTitle(this.movieTitle).subscribe(
      (data) => {
        //console.log('Detalhes do Filme:', data);
        this.movieYear = data.Year;
        this.movieDirector = data.Director;
        this.moviePoster = data.Poster;
        this.movieimdbRating = data.imdbRating;
      },
      (error) => {
        console.error('Erro ao obter detalhes do filme:', error);
      }
    );
  }
}
