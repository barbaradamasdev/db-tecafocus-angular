import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Database } from '../../models/Database.model';
import { MoviedbService } from '../../services/moviedb.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  title:string ='';
  movie: any;
  database?:Database;
  isCheckboxChecked: boolean = false;

  constructor(
    private CategoryService:CategoryService,
    private MoviedbService:MoviedbService,
    private router: Router){}

  @ViewChild('openSidebarMenu', { static: false })
  openSidebarMenu!: ElementRef<HTMLInputElement>;

  checkCheckboxState() {
    if (this.openSidebarMenu && this.openSidebarMenu.nativeElement) {
      this.isCheckboxChecked = this.openSidebarMenu.nativeElement.checked;

      if (this.isCheckboxChecked) {
        this.openSidebarMenu.nativeElement.checked = false;
      }
    }
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkCheckboxState();
      }
    });
  }

  search() {
    const categoryMovie = this.CategoryService.getMovieDetailsByTitle(this.title);

    if (categoryMovie) {
      this.movie = categoryMovie;
    } else {
      this.MoviedbService.getMovieByTitle(this.title).subscribe((data) => {
        this.movie = data;
      });
    }
    this.router.navigate(['/movie', this.title]);
    this.title = '';
  }
}
