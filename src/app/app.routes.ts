import { Routes } from '@angular/router';
import { CurationComponent } from './pages/curation/curation.component';
import { GenreComponent } from './pages/genre/genre.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';

export const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'thebest', component:CurationComponent},
  {path: 'movie/:movieTitle', component: MovieComponent },
  {path: 'genre/:category', component: GenreComponent },
  /* {path: 'genre/:genreTitle', component: GenreComponent }, */
  {path:'', redirectTo:'/home', pathMatch:'full'}
];
