import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
        const minutosConvertidos: number = parseInt(data.Runtime.split(" ")[0]);
        const { horas, minutos: minutosRestantes } = this.converterMinutosParaHoras(minutosConvertidos);
        this.movieRuntime = `${horas} h ${minutosRestantes} min`;
        this.movieimdbRating = data.imdbRating;
        /* this.movieBgPoster = `linear-gradient(to left, rgba(245, 246, 252, 0.025), rgba(10, 10, 10, 0.847)), center/cover no-repeat`; */
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

  getMovieDetails() {
    this.moviedbService.getMovieByTitle(this.movieTitle).subscribe(
      (data) => {
        console.log('Detalhes do Filme:', data);
      },
      (error) => {
        console.error('Erro ao obter detalhes do filme:', error);
      }
    );
  }
}
