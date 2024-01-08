import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ScrollService } from '../../services/scroll.service';
import { BannerButtonComponent } from "../../components/banner-button/banner-button.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CardComponent, CommonModule, BannerComponent, RouterLink, BannerButtonComponent]
})
export class HomeComponent {
  categories : any[] = [];

  constructor(
    private CategoryService: CategoryService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.categories = this.CategoryService.categories;
    this.scrollService.scrollToTopOnRouteChange();
  }
}
