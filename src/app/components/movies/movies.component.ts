import { Component, OnInit } from '@angular/core';
import { FavMovies, MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies!:FavMovies[]
  constructor(private movieSrv:MoviesService) { }

  async ngOnInit(){
    this.movies = await this.movieSrv.getPopularMovies();
  }

  async addFav(idMovie: number, i: number) {
      const newFav = await (await this.movieSrv.addPref(idMovie)).toPromise();
      this.movies[i] = {...this.movies[i],favId:newFav.id}
  }
  async removeFav(idPreferito: number, i: number) {
    await this.movieSrv.removePref(idPreferito).toPromise();
    this.movies[i] = {...this.movies[i],favId:undefined}
  }

}
