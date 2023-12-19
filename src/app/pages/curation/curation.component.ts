import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CardComponent } from "../../components/card/card.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';

@Component({
    selector: 'app-curation',
    standalone: true,
    templateUrl: './curation.component.html',
    styleUrl: '../home/home.component.css',
    imports: [CardComponent, BannerComponent, RouterLink, CommonModule]
})
export class CurationComponent {
  categories : any[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories = this.categoryService.categories;
  }

}