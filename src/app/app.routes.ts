import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';

export const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path: 'movie/:movieTitle', component: MovieComponent },
  {path:'', redirectTo:'/home', pathMatch:'full'}
];
