import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Database } from '../../models/Database.model';
import { CategoryService } from '../../services/category.service';
import { MoviedbService } from '../../services/moviedb.service';

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
  movies : any[] = [];
  database?:Database;
  isCheckboxChecked: boolean = false;
  notFoundMovie:boolean = false;
  categories : any[] = [];

  constructor(
    private CategoryService:CategoryService,
    private MoviedbService:MoviedbService,
    private zone:NgZone,
    private router:Router){
    }

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

    this.categories = this.CategoryService.categories;
  }

  search() {
    const movie = this.CategoryService.getMovieDetailsByTitle(this.title);

    if (movie) {
      this.movie = movie;
      this.router.navigate(['/movie', this.title], { queryParams: { fromSearch: true } });
      this.title = '';
    } else {
      const partialMovies = this.CategoryService.searchMoviesByPartialTitle(this.title);
      if (partialMovies.length > 0) {
        this.movies = partialMovies;

        this.router.navigate(['/search', this.title]).then(() => {
          this.clearSearchField();
          this.closeMenu();
        });

      } else {
        this.MoviedbService.getMovieByTitle(this.title).subscribe((data) => {
          if (data.Response !== 'False') {
            this.movie = data;

            this.router.navigate(['/movie', this.title], { queryParams: { fromSearch: true } });
            this.title = '';
          } else {
            console.log('Filme não encontrado.');
            this.notFoundMovie = true;

            setTimeout(() => {
              this.zone.run(() => {
                this.notFoundMovie = false;
              });
            }, 3000);

            return;
          }
        });
      }
    }
  }

  private clearSearchField() {
    this.title = '';
  }

  navigateToCategory(categoryName: string): void {
    this.isCheckboxChecked = false;

    this.router.navigate(['/thebest', categoryName]).then(() => {
      this.closeMenu();
    });
  }

  closeMenu(): void {
    this.isCheckboxChecked = false;
    const checkbox = document.getElementById('openSidebarMenu') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  }
}
