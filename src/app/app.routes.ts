import { Routes } from '@angular/router';
import { CurationComponent } from './pages/curation/curation.component';
import { GenreComponent } from './pages/genre/genre.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { DetailsComponent } from './pages/details/details.component';
import { ActorComponent } from './pages/actor/actor.component';
import { DirectorComponent } from './pages/director/director.component';

export const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'thebest', component:CurationComponent},
  {path: 'thebest/:categoryTitle', component: GenreComponent },
  {path: 'genre/:genreTitle', component: DetailsComponent },
  {path: 'movie/:movieTitle', component: MovieComponent },
  {path: 'actor/:actorName', component: ActorComponent },
  {path: 'director/:directorName', component: DirectorComponent },
  {path:'', redirectTo:'/home', pathMatch:'full'}
];
