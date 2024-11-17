import { Routes } from '@angular/router';
import { CurationComponent } from './pages/curation/curation.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'movie/:movieTitle', component: MovieComponent },
  {path: 'thebest', component: CurationComponent},

  {path: 'thebest/:categoryTitle', component: ListComponent },
  {path: 'genre/:genreTitle', component: ListComponent },
  {path: 'actor/:actorName', component: ListComponent },
  {path: 'director/:directorName', component: ListComponent },
  {path: 'language/:languageName', component: ListComponent },
  {path: 'country/:countryName', component: ListComponent },
  {path: 'writer/:writerName', component: ListComponent },
  {path: 'year/:yearValue', component: ListComponent },
  {path: 'type/:typeName', component: ListComponent },
  {path: 'imdb', component: ListComponent },
  {path:'', redirectTo:'/home', pathMatch:'full'}
];
