import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Database } from '../../models/Database.model';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  title:string ='';
  movie: any;
  database?:Database;

  constructor(private serviceDB:MoviedbService, private router: Router){}

  search() {
    this.serviceDB.getMovieByTitle(this.title).subscribe((data) => {
      this.movie = data;
      this.router.navigate(['/movie', this.title]);
      this.title = '';
    });
  }
}
