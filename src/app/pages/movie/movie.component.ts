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
    imports: [CommonModule, RouterLink, TempoDeFilmePipe ],
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
  tecaNota: string = '';
  movieRatings:  string[] = [];
  tecaComments:  string = '';
  tecaReviewColor: string = '';

  seasons: Season [] = [];
  selectedSeason: Season | null = null;
  selectedSeasonYear: number = 0;

  categories : any[] = [];
  filteredMovies: any[] = [];

  private defaultPoster: string = 'assets/default.png';

  constructor(
    private route: ActivatedRoute,
    private CategoryService: CategoryService,
    private MoviedbService: MoviedbService,
    private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieTitle = params.get('movieTitle') ?? '';

      this.CategoryService.loadData().subscribe(() => {
        let movieDetails = this.CategoryService.getMovieDetailsByTitle(this.movieTitle)
        this.loadMovieDetails(movieDetails);
      });
    });
  }

  filterByGenre(genre: string): void {
    const genreToFilter = genre.toLowerCase().trim();
    this.router.navigate(['/genre', genreToFilter]);
  }

  filterByDirector(director: string): void {
    const directorToFilter = director.toLowerCase().trim();
    this.router.navigate(['/director', directorToFilter]);
  }

  filterByActor(actor: string): void {
    const actorToFilter = actor.toLowerCase().trim();
    this.router.navigate(['/actor', actorToFilter]);
  }

  filterByLanguage(language: string): void {
    const languageToFilter = language.toLowerCase().trim();
    this.router.navigate(['/language', languageToFilter]);
  }

  filterByCountry(country: string): void {
    const countryToFilter = country.toLowerCase().trim();
    this.router.navigate(['/country', countryToFilter]);
  }

  filterByWriter(writer: string): void {
    const writerToFilter = writer.toLowerCase().trim();
    this.router.navigate(['/writer', writerToFilter]);
  }

  filterByYear(year: number): void {
    const yearString = String(year)
    const firstYeartoFilter: string = yearString.split('–')[0];
    this.router.navigate(['/year', firstYeartoFilter]);
  }

  filterByType(type: string): void {
    const typeToFilter = type.toLowerCase().trim();
    this.router.navigate(['/type', typeToFilter]);
  }

  filterByRating(): void {
    this.router.navigate(['/imdb']);
  }

  private loadMovieDetails(movieDetails: any) {
    if (!movieDetails) {
      this.MoviedbService.getMovieByTitle(this.movieTitle).subscribe(
        (data) => {
          if (data.Response == 'False') {
            this.router.navigate(['/']);
          } else {
            movieDetails = data;
            console.warn('✅✅✅✅✅✅✅✅✅ Esse titulo faz parte da nossa curadoria. Provavelmente ele deve ser excelente!');
            this.handleMovieDetails(movieDetails);
          }
        },
        (error) => {
          console.error('Erro ao obter detalhes do filme:', error);
        }
      );
    } else {
      if (movieDetails.TecaNota <= 5) {
        console.error('🚫🚫🚫🚫🚫🚫🚫🚫🚫Não indicamos esse filme. Esse titulo faz parte da nossa curadoria na categoria de piores filmes!');
      }
      this.handleMovieDetails(movieDetails);
    }
  }

  private handleMovieDetails(movieDetails: any) {
    this.movieYear = movieDetails.Year;
    this.movieGenre = movieDetails.Genre.split(',');
    this.moviePoster = (movieDetails?.Poster && movieDetails.Poster !== 'N/A')
    ? movieDetails.Poster
    : this.defaultPoster;
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
    this.tecaNota = movieDetails.TecaNota ? movieDetails.TecaNota : '';
    this.defineColorReview();
    this.tecaComments = movieDetails.TecaComments ? movieDetails.TecaComments : '';
    this.totalSeasons = movieDetails.totalSeasons;
    this.movieDirector = movieDetails.Director.split(',').map((director: string) => director.trim());

    if (this.movieType === 'series') {
      for (let s = 1; s <= this.totalSeasons; s++) {
        this.MoviedbService.getSeasonsByTitle(this.movieTitle, s).subscribe(
          (seasonData) => {
            const seasonInfo: Season = {
              Title: seasonData.Title,
              Season: seasonData.Season,
              Episodes: [],
              totalSeasons: seasonData.totalSeasons,
            };

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

  defineColorReview(){
    if (this.tecaNota) {
      const nota = +this.tecaNota;
      if (nota >= 9) {
        this.tecaReviewColor = '#017617';
      } else if (nota >= 8) {
        this.tecaReviewColor = '#2a983f';
      } else if (nota >= 6) {
        this.tecaReviewColor = '#528543';
      } else if (nota >= 5) {
        this.tecaReviewColor = '#ad7714';
      } else if (nota >= 3) {
        this.tecaReviewColor = '#982107';
      } else {
        this.tecaReviewColor = '#8B0000';
      }
    } else {
      this.tecaReviewColor = '';
    }
  }

  selectSeason(season: Season) {
    this.selectedSeason = season;
    this.seasons.forEach(s => s.active = false);
    season.active = true;

    if (season.Episodes.length === 0) {
        this.MoviedbService.getSeasonsByTitle(this.movieTitle, season.Season).subscribe(
            (seasonData) => {
                for (let episode = 1; episode <= seasonData.Episodes.length; episode++) {
                    this.MoviedbService.getEpisodeBySeason(this.movieTitle, season.Season, episode).subscribe(
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

                            if (this.selectedSeason?.Episodes) {
                              this.selectedSeason.Episodes.push(episodeInfo);
                              this.selectedSeason.Episodes.sort((a, b) => a.Episode - b.Episode);

                              if (this.selectedSeason.Episodes.length > 0) {
                                  this.selectedSeasonYear = this.selectedSeason.Episodes[0].Year;
                              }
                          }
                        },
                        (error) => {
                            console.error('Erro ao obter detalhes do episódio:', error);
                        }
                    );
                }
            },
            (error) => {
                console.error('Erro ao carregar episódios da temporada selecionada:', error);
            }
        );
    } else {
        this.selectedSeason.Episodes.sort((a, b) => a.Episode - b.Episode);
        this.selectedSeasonYear = this.selectedSeason.Episodes[0].Year;
    }
  }
}
