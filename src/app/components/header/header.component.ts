import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Database } from '../../models/Database.model';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  title:string ='';
  movie: any;
  database?:Database;

  constructor(private serviceDB:MoviedbService){}

  search() {
    this.serviceDB.getMovieByTitle(this.title).subscribe((data) => {
      this.movie = data;
      console.log(this.movie);
      this.title = '';

    });
  }
}
