import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  movies: any[] = [];
  categories: any[] = [];

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
      movies: this.http.get<any[]>('assets/data/movies.json'),
      categories: this.http.get<any[]>('assets/data/categories.json'),
    }).subscribe((data) => {
      this.movies = data.movies;
      this.categories = data.categories;
    });
  }

  getDados(): Observable<any> {
    return of({ categories: this.categories, movies: this.movies });
  }

  getMovieDetailsByTitle(title: string): any {
    const titleUpperCase = title.toUpperCase();

    const movie = this.movies.find(m => m?.Title.toUpperCase() === titleUpperCase);

    if (movie) {
      return movie;
    }

    const badMoviesCategory = this.categories.find(cat => cat.title.toUpperCase() === "WORST MOVIES, SO YOU DON'T HAVE TO WATCH THEM");
    if (badMoviesCategory) {
      const badMovie = badMoviesCategory.movies.find((m: { Title: string; }) => m?.Title.toUpperCase() === titleUpperCase);
      return badMovie || null;
    }

    return null;
  }

  getMoviesByCategory(categoryTitle: string): any[] {
    const titleUpperCase = categoryTitle.toUpperCase();

    const category = this.categories.find(cat => cat.title.toUpperCase() === titleUpperCase);
    if (!category) {
      return [];
    }

    return category.movies.map((movieRef: { imdbID: any; }) => {
      const movie = this.movies.find(m => m?.imdbID === movieRef.imdbID);

      if (!movie && category.title.toUpperCase() === "WORST MOVIES, SO YOU DON'T HAVE TO WATCH THEM") {
        return movieRef;
      }

      return movie;
    }).filter((movie: any) => movie);
  }
}
