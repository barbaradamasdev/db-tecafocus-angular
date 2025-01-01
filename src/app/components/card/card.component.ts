import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';
import { BooksService } from '../../services/books.service';

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
  @Input() tecaNota?: string;

  @Input() bookTitle: string = '';
  @Input() bookAuthor: string = '';
  @Input() bookGenre: string = '';
  @Input() bookImageUrl: string = '';
  @Input() bookYear: number = 0;
  @Input() bookPageCount: number = 0;
  @Input() bookSynopsis: string = '';

  private defaultPoster: string = 'assets/default.png';

  constructor(
    private MoviedbService: MoviedbService,
    private BooksService: BooksService,
    private CategoryService: CategoryService) {}

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails() {
    if (this.movieTitle && this.movieTitle.trim() !== '' && (!this.bookTitle || this.bookTitle.trim() === '')) {
      this.loadMovieDetails();
    } else if (this.bookTitle && this.bookTitle.trim() !== '') {
      this.loadBookDetails();
    }
  }

  loadMovieDetails() {
    let movieDetails = this.CategoryService.getMovieDetailsByTitle(this.movieTitle);

    if (!movieDetails) {
      movieDetails = this.MoviedbService.getMovieByTitle(this.movieTitle)
    }

    this.movieYear = movieDetails.Year;
    this.movieDirector = movieDetails.Director;
    this.moviePoster = (movieDetails?.Poster && movieDetails.Poster !== 'N/A')
    ? movieDetails.Poster
    : this.defaultPoster;
    this.movieimdbRating = movieDetails.imdbRating;
    this.tecaNota = movieDetails.TecaNota;
  }

  loadBookDetails() {
    let bookDetails = this.BooksService.getBooksDetailsByTitle(this.bookTitle);
    console.log(bookDetails)

    this.bookAuthor = bookDetails.author;
    this.bookGenre = bookDetails.genre;
    console.log(bookDetails.image_url)
    this.bookImageUrl = (bookDetails?.image_url && bookDetails.image_url !== 'N/A')
      ? bookDetails.image_url
      : this.defaultPoster;
    this.bookYear = bookDetails.year;
    this.bookPageCount = bookDetails.page_count;
    this.bookSynopsis = bookDetails.synopsis;
    this.tecaNota = bookDetails.TecaNota;
  }
}
