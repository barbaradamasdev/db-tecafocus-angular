import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { BannerComponent } from "./components/banner/banner.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { DatabaseComponent } from './components/database/database.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule,
      RouterOutlet,
      HeaderComponent,
      BannerComponent,
      CarouselComponent,
      DatabaseComponent
    ]
})
export class AppComponent {
  title = 'tecafocus-db';
}
