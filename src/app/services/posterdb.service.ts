import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosterdbService {
  private _key:string = 'e0802f79771c516105a6c9af480f490f';
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPosterByTitle(title: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this._key)
      .set('query', title);

    return this.http.get(`${this.baseUrl}/search/movie`, { params });
  }

  // constructor(private http:HttpClient) { }

  // getPosterByTitle(title:string):Observable<any>{
  //   return this.http.get(`https://api.themoviedb.org/3/movie/157336?api_key=${this._key}`);
  // }

  // getVideoByTitle(title:string):Observable<any>{
  //   return this.http.get(`https://api.themoviedb.org/3/movie/157336/videos?api_key=${this._key}`);
  // }

  // getPosterAndVideoByTitle(title:string):Observable<any>{
  //   return this.http.get(`https://api.themoviedb.org/3/movie/157336/videos?api_key=${this._key}append_to_response=videos,images`);
  // }
}

// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=e0802f79771c516105a6c9af480f490f
