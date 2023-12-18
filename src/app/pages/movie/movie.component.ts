import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  movieTitle: string = '';
  movieDirector: string = '';
  movieYear: number = 0;
  movieGenre: string[] = [];
  moviePoster: string = '';
  movieimdbRating: string = '';
  movieRunTime: string = '';
  movieWriter:  string[] = [];
  movieActors: string[] = [];
  moviePlot: string = '';
  movieLanguage: string = '';
  movieCountry: string = '';
  movieAwards: string = '';
  movieType: string = '';
  totalSeasons: string = '';
  movieRatings:  string[] = [];

  constructor(
    private route: ActivatedRoute,
    private moviedbService: MoviedbService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieTitle = params.get('movieTitle') ?? '';
      this.loadMovieDetails();
    });

  }

  private loadMovieDetails() {
    this.moviedbService.getMovieByTitle(this.movieTitle).subscribe(
      (data) => {
        //console.table(data);
        this.movieDirector = data.Director;
        this.movieYear = data.Year;
        this.movieGenre = data.Genre.split(',');
        this.moviePoster = data.Poster;
        this.movieimdbRating = data.imdbRating;
        const minutosConvertidos: number = parseInt(data.Runtime.split(" ")[0]);
        const { horas, minutos: minutosRestantes } = this.converterMinutosParaHoras(minutosConvertidos);
        this.movieRunTime = `${horas} h ${minutosRestantes} min`;
        this.movieWriter = data.Writer.split(',');
        this.movieActors = data.Actors.split(',');
        for (const rating of data.Ratings) {
          this.movieRatings.push(rating.Source + ': ' + rating.Value);
        }
        this.moviePlot = data.Plot;
        this.movieLanguage = data.Language;
        this.movieCountry = data.Country;
        this.movieAwards = data.Awards;
        this.movieType = data.Type;
        this.totalSeasons = data.totalSeasons;
      },
      (error) => {
        console.error('Erro ao obter detalhes do filme:', error);
      }
    );
  }

  converterMinutosParaHoras(minutos: number): { horas: number; minutos: number } {
    const horas: number = Math.floor(minutos / 60);
    const minutosRestantes: number = minutos % 60;
    return { horas, minutos: minutosRestantes };
  }
}
