import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TempoDeFilmePipe } from '../../pipes/tempo-de-filme.pipe';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, TempoDeFilmePipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  @Input() movieTitle: string = '';
  @Input() movieYear: number = 0;
  @Input() moviePlot: number = 0;
  @Input() moviePoster: string = '';
  @Input() movieRuntime: string = '';
  @Input() movieimdbRating: string = '';
  @Input() movieBgPoster:string = '';

  constructor(private moviedbService: MoviedbService) {}

  ngOnInit() {
    this.loadMovieDetails();
  }

  get backgroundStyle() {
    return {
      'background': `linear-gradient(to left, rgba(245, 246, 252, 0.025), rgba(10, 10, 10, 0.847)), url(${this.movieBgPoster}) center/cover no-repeat`
    };
  }

  private loadMovieDetails() {
    this.moviedbService.getMovieByTitle(this.movieTitle).subscribe(
      (data) => {
        //console.log('Detalhes do Filme:', data);
        this.movieYear = data.Year;
        this.moviePlot = data.Plot;
        this.moviePoster = data.Poster;
        this.movieRuntime = data.Runtime;
        this.movieimdbRating = data.imdbRating;
      },
      (error) => {
        //console.error('Erro ao obter detalhes do filme:', error);
      }
    );
  }
}
