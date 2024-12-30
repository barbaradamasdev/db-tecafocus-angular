import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CardComponent } from "../../components/card/card.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { ScrollService } from '../../services/scroll.service';

@Component({
    selector: 'app-curation',
    standalone: true,
    templateUrl: './curation.component.html',
    styleUrls: ['../home/home.component.css'],
    imports: [CardComponent, BannerComponent, RouterLink, CommonModule]
})
export class CurationComponent {
  categories : any[] = [];

  constructor(
    private CategoryService: CategoryService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTopOnRouteChange();

    if (this.CategoryService.categories.length > 0) {
      this.categories = this.CategoryService.categories;
    } else {
      this.CategoryService.loadData().subscribe(() => {
        this.categories = this.CategoryService.categories;
      });
    }
  }
}
