import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';
import { ScrollService } from '../../services/scroll.service';
import { Database } from '../../models/Database.model'

@Component({
    selector: 'app-actor',
    standalone: true,
    templateUrl: './actor.component.html',
    styleUrl: '../home/home.component.css',
    imports: [CommonModule, CardComponent, RouterLink]
})
export class ActorComponent {
  actor: string = '';
  categories : any[] = [];
  category : Category | undefined;
  movies: Database[] = [];
  filteredMovies: any[] = [];

  constructor(
    private CategoryService: CategoryService,
    private scrollService: ScrollService,
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTopOnRouteChange();
    const parts = window.location.href.split('/');
    this.actor = parts[parts.length - 1].replaceAll('%20', ' ');
    this.filterByActor(this.actor);
  }

  filterByActor(actor: string): void {
    this.actor = actor;
    this.filteredMovies = [];
    const actorToFilter = this.actor.toLowerCase().trim();
    const movieIds = new Set();

    this.CategoryService.categories.forEach(category => {
      const filtered = category.movies.filter(movie => {
        const actor = movie?.Actors.split(',').map(g => g.toLowerCase().trim());
        return actor?.includes(actorToFilter);
      });

      filtered.forEach(movie => {
        if (!movieIds.has(movie?.imdbID)) {
          movieIds.add(movie?.imdbID);
          this.filteredMovies.push(movie);
        }
      });

    });
  }
}
