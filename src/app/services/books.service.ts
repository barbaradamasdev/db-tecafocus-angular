import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: any[] = [];

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData(): Observable<void> {
    return forkJoin({
      books: this.http.get<any[]>('assets/data/books.json'),
    }).pipe(
      tap((data) => {
        this.books = data.books || [];
      }),
      map(() => { })
    );
  }

  getBooksDetailsByTitle(title: string): any {
    const book = this.books.find(m => m.title === title);

    if (book) {
      return book;
    }

    return null;
  }


}
