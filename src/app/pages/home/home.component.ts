import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ScrollService } from '../../services/scroll.service';
import { BannerButtonComponent } from "../../components/banner-button/banner-button.component";
import { HighlightComponent } from "../../components/highlight/highlight.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CardComponent, CommonModule, BannerComponent, RouterLink, BannerButtonComponent, HighlightComponent]
})
export class HomeComponent {
  highlightTitles1: any[] = [
    { title: "Sci-fi", bg: "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-202131-maxresdefault.jpg" },
    { title: "Zombie", bg: "https://images.lifestyleasia.com/wp-content/uploads/sites/2/2022/10/13155003/train-to-busan-final-1600x900.jpeg" },
    { title: "Alien", bg: "https://variety.com/wp-content/uploads/2020/12/alien-1.jpg" }
  ];
  highlightTitles2: any[] = [
    { title: "Killer Creatures", bg: "https://pm1.aminoapps.com/7088/abf2cf4f5e0fca8423538a831c4036398ecbb952r1-735-556v2_00.jpg" },
    { title: "Cosmic horror", bg: "https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2019/04/annihilation-bear-2.png" },
    { title: "Cults", bg: "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABcyAvPrc5uifNXmTJh0kXQag928uKcMaRbvjWcmN1qMDbDzdbf_hxf2m6FU1xErT_dQIlrIJTsNYPxRzgaGEQSMWheetz2SIKTRH.jpg" }
  ];

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
