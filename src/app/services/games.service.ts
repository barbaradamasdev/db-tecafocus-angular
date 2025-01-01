import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  games: any[] = [];

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData(): Observable<void> {
    return forkJoin({
      games: this.http.get<any[]>('assets/data/games.json'),
    }).pipe(
      tap((data) => {
        this.games = data.games || [];
      }),
      map(() => { })
    );
  }

  getGamesDetailsByTitle(title: string): any {
    const game = this.games.find(m => m.title === title);

    if (game) {
      return game;
    }

    return null;
  }


}
