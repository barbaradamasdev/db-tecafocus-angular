import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Database } from '../models/Database.model';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {
  private _key:string = '1fc23959';

  constructor(private http:HttpClient) { }

  //private url:string =`https://www.omdbapi.com/?apikey=${this._key}`;

  getMovieByTitle(title:string):Observable<any>{
    return this.http.get(`https://www.omdbapi.com/?apikey=${this._key}&t=${title}`);
    /* return this.http.get<Database[]>(this.url+`&t=${title}`); */
  }

  //title = '&t=${title}'
  //listarFilme(title:string):Observable<Database>{
  //  return this.http.get<Database>(`https://www.omdbapi.com/?apikey=${this._key}&t=${title}`);
  //  /* return this.http.get<Database[]>(this.url+`&t=${title}`); */
  //}
}
