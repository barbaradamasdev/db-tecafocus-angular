import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {
  //private _key:string = '1b649b2b';
  private _key:string = '1fc23959';
  //private _key:string = '1b649dasd';

  constructor(private http:HttpClient) { }

  getMovieByTitle(title:string):Observable<any>{
    return this.http.get(`https://www.omdbapi.com/?apikey=${this._key}&t=${title}&plot=full`);
  }

  getSeasonsByTitle(title:string, season:number):Observable<any>{
    return this.http.get(`https://www.omdbapi.com/?apikey=${this._key}&t=${title}&plot=full&Season=${season}`);
  }

  getEpisodeBySeason(title:string, season:number, episode:number):Observable<any>{
    return this.http.get(`https://www.omdbapi.com/?apikey=${this._key}&t=${title}&plot=full&Season=${season}&Episode=${episode}`);
  }
}
