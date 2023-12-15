import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'app-carousel',
    standalone: true,
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css',
    imports: [CardComponent]
})
export class CarouselComponent {
  
}
