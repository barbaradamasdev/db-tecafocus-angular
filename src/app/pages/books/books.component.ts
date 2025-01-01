import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";
import { BooksService } from '../../services/books.service';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './books.component.html',
    styleUrls: ['../home/home.component.css', '../list/list.component.css'],
    imports: [CommonModule, CardComponent, RouterLink]
})
export class BooksComponent {
  books : any[] = [];
  totalBooks: number = 0;

  constructor(
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe(() => {
      this.books = this.booksService.books;

      if (this.books.length > 0) {
        this.totalBooks = this.books.length;
      } else {
        this.books = [];
        this.totalBooks = 0;
      }
    });
  }
}
