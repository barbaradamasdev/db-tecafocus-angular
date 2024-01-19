import { Component, Input } from '@angular/core';
import { HighlightCardComponent } from "../highlight-card/highlight-card.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-highlight',
    standalone: true,
    templateUrl: './highlight.component.html',
    styleUrl: './highlight.component.css',
    imports: [HighlightCardComponent, CommonModule]
})
export class HighlightComponent {
  @Input() highlightTitles?: any[];

  constructor() {}
}