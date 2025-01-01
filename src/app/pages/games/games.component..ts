import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { GamesService } from '../../services/games.service';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './games.component.html',
    styleUrls: ['../home/home.component.css', '../list/list.component.css'],
    imports: [CommonModule, CardComponent, BannerComponent]
})
export class GamesComponent {
  games : any[] = [];
  totalGames: number = 0;

  constructor(
    private GamesService: GamesService,
  ) {}

  ngOnInit(): void {
    this.GamesService.loadData().subscribe(() => {
      this.games = this.GamesService.games;

      if (this.games.length > 0) {
        this.totalGames = this.games.length;
      } else {
        this.games = [];
        this.totalGames = 0;
      }
    });
  }
}
