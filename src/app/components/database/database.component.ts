import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Database } from '../../models/Database.model';
import { MoviedbService } from '../../services/moviedb.service';


@Component({
  selector: 'app-database',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css'
})
export class DatabaseComponent {

  title:string ='';
  movie: any;
  database?:Database;

  constructor(private serviceDB:MoviedbService){}

  search() {
    this.serviceDB.getMovieByTitle(this.title).subscribe((data) => {
      this.movie = data;
      console.log(this.movie);
    });
  }

 /*  ngOnInit(){
    this.title = 'titans';
  } */

  /* getMovieByTitle():void{
    this.serviceDB.getMovieByTitle(this.title)
    .subscribe(retorno => {
      this.database = retorno;
      console.log(this.database);
    });
  } */

  /* listarDB():void {
    this.serviceDB.listarFilme()
    .subscribe(retorno => {
      this.database = retorno;
      console.log(this.database);
    });
  } */
}
