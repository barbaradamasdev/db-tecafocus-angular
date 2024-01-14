import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviedbService } from '../../services/moviedb.service';
import { TempoDeFilmePipe } from "../../pipes/tempo-de-filme.pipe";
import { Season } from '../../models/Season';
import { Episode } from '../../models/Episode';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-movie',
    standalone: true,
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css', '../home/home.component.css'],
    imports: [CommonModule, RouterLink, TempoDeFilmePipe ]
})

export class MovieComponent {
  movieTitle: string = '';
  movieDirector?: string;
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
  totalSeasons: number = 0;
  notaTeca: string = '';
  movieRatings:  string[] = [];

  seasons: Season [] = [];
  selectedSeason: Season | null = null;
  selectedSeasonYear: number = 0;

  constructor(
    private route: ActivatedRoute,
    private CategoryService: CategoryService,
    private moviedbService: MoviedbService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieTitle = params.get('movieTitle') ?? '';
      console.log(this.movieTitle)
      this.loadMovieDetails();
    });

    if (this.seasons.length > 0 && !this.selectedSeason) {
      this.selectedSeason = this.seasons[0];
      this.selectedSeasonYear = this.selectedSeason.Episodes[0].Year;
      this.selectedSeason.active = true;
    }
  }

  selectSeason(season: Season) {
    this.selectedSeason = season;
    this.selectedSeasonYear = this.selectedSeason.Episodes[0].Year;
    this.seasons.forEach(s => s.active = false);
    season.active = true;
  }

  private loadMovieDetails() {
    let movieDetails = this.CategoryService.getMovieDetailsByTitle(this.movieTitle);

    if (!movieDetails) {
      this.moviedbService.getMovieByTitle(this.movieTitle).subscribe(
        (data) => {
          movieDetails = data;
          console.warn('Esse titulo não faz parte da nossa curadoria');
          console.warn('Informação retirada da API!');
          this.handleMovieDetails(movieDetails);
        },
        (error) => {
          console.error('Erro ao obter detalhes do filme:', error);
        }
      );
    } else {
      console.warn('Esse titulo faz parte da nossa curadoria.');
      this.handleMovieDetails(movieDetails);
    }
  }

  private handleMovieDetails(movieDetails: any) {
    this.movieYear = movieDetails.Year;
    this.movieGenre = movieDetails.Genre.split(',');
    this.moviePoster = movieDetails.Poster;
    this.movieimdbRating = movieDetails.imdbRating;
    this.movieRunTime = movieDetails.Runtime;
    this.movieWriter = movieDetails.Writer.split(',');
    this.movieActors = movieDetails.Actors.split(',');
    for (const rating of movieDetails.Ratings) {
      this.movieRatings.push(rating.Source + ': ' + rating.Value);
    }
    this.moviePlot = movieDetails.Plot;
    this.movieLanguage = movieDetails.Language;
    this.movieCountry = movieDetails.Country;
    this.movieAwards = movieDetails.Awards;
    this.movieType = movieDetails.Type;
    this.notaTeca = movieDetails.NotaTeca ? movieDetails.NotaTeca : '';
    this.totalSeasons = movieDetails.totalSeasons;
    this.movieDirector = movieDetails.Director;

    if (this.movieType === 'series') {
      for (let s = 1; s <= this.totalSeasons; s++) {
        this.moviedbService.getSeasonsByTitle(this.movieTitle, s).subscribe(
          (seasonData) => {
            const seasonInfo: Season = {
              Title: seasonData.Title,
              Season: seasonData.Season,
              Episodes: [],
              totalSeasons: seasonData.totalSeasons,
            };

            for (let episode = 1; episode <= seasonData.Episodes.length; episode++) {
              this.moviedbService.getEpisodeBySeason(this.movieTitle, s, episode).subscribe(
                (episodeData) => {
                  const episodeInfo: Episode = {
                    Type: episodeData.Type,
                    Title: episodeData.Title,
                    Year: episodeData.Year,
                    Rated: episodeData.Rated,
                    Released: episodeData.Released,
                    Season: episodeData.Season,
                    Episode: episodeData.Episode,
                    Runtime: episodeData.Runtime,
                    Genre: episodeData.Genre,
                    Director: episodeData.Director,
                    Writer: episodeData.Writer,
                    Actors: episodeData.Actors,
                    Plot: episodeData.Plot,
                    Language: episodeData.Language,
                    Country: episodeData.Country,
                    Poster: episodeData.Poster,
                    Ratings: episodeData.Ratings,
                    imdbRating: episodeData.imdbRating,
                  };

                  seasonInfo.Episodes.push(episodeInfo);
                },
                (error) => {
                  console.error('Erro ao obter detalhes do episódio:', error);
                }
              );
            }
            this.seasons.push(seasonInfo);
            this.seasons = this.seasons.sort((a, b) => a.Season - b.Season);
          },
          (error) => {
            console.error('Erro ao obter detalhes da temporada:', error);
          }
        );
      }
    }
  }
}
