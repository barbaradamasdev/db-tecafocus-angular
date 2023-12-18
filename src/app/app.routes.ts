import { Routes } from '@angular/router';
import { GenreComponent } from './pages/genre/genre.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';

export const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path: 'movie/:movieTitle', component: MovieComponent },
  {path: 'genre', component: GenreComponent },
  /* {path: 'genre/:genreTitle', component: GenreComponent }, */
  {path:'', redirectTo:'/home', pathMatch:'full'}
];
