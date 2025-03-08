import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CategoryService } from '../../services/category.service';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './lastedreleases.component.html',
    styleUrls: ['../home/home.component.css', '../list/list.component.css'],
    imports: [CommonModule, CardComponent]
})
export class LastedReleasesComponent {
  latestReleases : any[] = [];
  total: number = 0;

  constructor(
    private CategoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.CategoryService.loadData().subscribe(() => {
      this.latestReleases = this.CategoryService.getLatestReleases();

      if (this.latestReleases.length > 0) {
        this.total = this.latestReleases.length;
      } else {
        this.latestReleases = [];
        this.total = 0;
      }
    });
  }
}
