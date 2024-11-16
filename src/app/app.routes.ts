import { Routes } from '@angular/router';
import { CurationComponent } from './pages/curation/curation.component';
import { GenreComponent } from './pages/genre/genre.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'thebest', component:CurationComponent},
  {path: 'thebest/:categoryTitle', component: GenreComponent },
  {path: 'movie/:movieTitle', component: MovieComponent },
  // {path: 'genre/:genreTitle', component: DetailsComponent },
  {path: 'genre/:genreTitle', component: DetailsComponent },
  {path: 'actor/:actorName', component: DetailsComponent },
  {path: 'director/:directorName', component: DetailsComponent },
  {path:'', redirectTo:'/home', pathMatch:'full'}
];

/*

ator, diretor, genero, todos tem o mesmo estilo, pode ser uma tela so

dessa forma fica:

home
curadorias
list especifica (ator, diretor, genero, tipo curadoria)
movie


*/
