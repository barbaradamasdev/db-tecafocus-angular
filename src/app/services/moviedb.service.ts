import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {
  private _key:string = '1fc23959';

  constructor(private http:HttpClient) { }

  getMovieByTitle(title:string):Observable<any>{
    return this.http.get(`https://www.omdbapi.com/?apikey=${this._key}&t=${title}&plot=full`);
  }
}
