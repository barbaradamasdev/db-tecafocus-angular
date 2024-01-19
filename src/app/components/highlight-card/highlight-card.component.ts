import { Component, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-highlight-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './highlight-card.component.html',
  styleUrl: './highlight-card.component.css'
})
export class HighlightCardComponent {
  @Input() curation?: { title: string, bg: string };

  curationTitle: string = '';
  curationBgPoster:string = '';

  constructor() {}

  ngOnInit(){
    if (this.curation) {
      this.curationTitle = this.curation.title;
      this.curationBgPoster = this.curation.bg;
    }
  }

  get backgroundStyle() {
    return {
      'background': `linear-gradient(to left, rgba(245, 246, 252, 0.025), rgba(10, 10, 10, 0.847)), url(${this.curationBgPoster}) center/cover no-repeat`
    };
  }

}