import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TempoDeFilmePipe } from '../../pipes/tempo-de-filme.pipe';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, TempoDeFilmePipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  @Input() isMainBanner: boolean = false;
  @Input() movieTitle: string = '';
  @Input() movieYear: number = 0;
  @Input() moviePlot: number = 0;
  @Input() moviePoster: string = '';
  @Input() movieRuntime: string = '';
  @Input() movieimdbRating: string = '';
  @Input() movieBgPoster:string = '';

  IsBooksSectionBanner:boolean = false;

  constructor(
    private MoviedbService: MoviedbService,
    private CategoryService: CategoryService) {}

  ngOnInit() {
    this.CategoryService.loadData().subscribe(() => {
      let movieDetails = this.CategoryService.getMovieDetailsByTitle(this.movieTitle)

      if (this.movieTitle == "BooksSection") {
        this.loadBookBanner();
      } else {
        this.loadMovieDetails(movieDetails);
      }
    });
  }

  get backgroundStyle() {
    return {
      'background': `linear-gradient(to left, rgba(245, 246, 252, 0.06), rgba(10, 10, 10, 0.38)), url(${this.movieBgPoster}) center/cover no-repeat`
    };
  }

   loadMovieDetails(movieDetails: any) {

    if (!movieDetails) {
      movieDetails = this.MoviedbService.getMovieByTitle(this.movieTitle)
    }

    this.movieYear = movieDetails.Year;
    this.moviePlot = movieDetails.Plot;
    this.moviePoster = movieDetails.Poster;
    this.movieRuntime = movieDetails.Runtime;
    this.movieimdbRating = movieDetails.imdbRating;
  }

  loadBookBanner() {
    this.IsBooksSectionBanner = true;
  }

}
