import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Database } from '../../models/Database.model';
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
  database?:Database;
  isCheckboxChecked: boolean = false;

  constructor(private serviceDB:MoviedbService, private router: Router){}

  ngOnInit() {
    this.checkCheckboxState();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkCheckboxState();
      }
    });
  }

  checkCheckboxState() {
    const checkbox = document.getElementById('openSidebarMenu') as HTMLInputElement;
    this.isCheckboxChecked = checkbox.checked;

    if (this.isCheckboxChecked) {
      checkbox.checked = false;
    }
  }

  search() {
    this.serviceDB.getMovieByTitle(this.title).subscribe((data) => {
      this.movie = data;
      this.router.navigate(['/movie', this.title]);
      this.title = '';
    });
  }
}
