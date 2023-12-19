import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';
import { HomeComponent } from '../home/home.component';

@Component({
    selector: 'app-genre',
    standalone: true,
    templateUrl: './genre.component.html',
    styleUrl: '../home/home.component.css',
    imports: [CommonModule, CardComponent,RouterLink]
})
export class GenreComponent {
  movieTitle: string = '';
  movieDirector: string = '';
  movieYear: number = 0;
  movieGenre: string = '';
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

  categories : any[] = [];
  category : Category | undefined;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private moviedbService: MoviedbService) {}

  ngOnInit() {
    this.categories = this.categoryService.categories;

    const parts = window.location.href.split('/');
    this.movieGenre = parts[parts.length - 1].replace('%20', ' ');

    this.category = this.categories.find((category: Category) => category.title === this.movieGenre);
    console.log(this.category)
  }


  /* private loadMovieDetails() {
    this.moviedbService.getMovieByTitle(this.movieGenre).subscribe(
      (data) => {
        console.table(data);
        this.movieDirector = data.Director;
        this.movieYear = data.Year;
        this.movieGenre = data.Genre.split(',');
        this.moviePoster = data.Poster;
        this.movieimdbRating = data.imdbRating;
        this.movieRunTime = data.Runtime;
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
*/
}
