import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-best-characters',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './best-characters.component.html',
    styleUrl: './best-characters.component.css',
})
export class BestCharactersComponent {
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

  characters = [
    {
      id: 1,
      name: 'Rick Blaine',
      work: 'Casablanca',
      image: 'assets/images/rick-blaine.jpg'
    },
    {
      id: 2,
      name: 'Ellen Ripley',
      work: 'Alien',
      image: 'assets/images/ellen-ripley.jpg'
    },
    {
      id: 3,
      name: 'Vito Corleone',
      work: 'The Godfather',
      image: 'assets/images/vito-corleone.jpg'
    },
    {
      id: 4,
      name: 'Tony Stark',
      work: 'Iron Man',
      image: 'assets/images/tony-stark.jpg'
    }
  ];
}
