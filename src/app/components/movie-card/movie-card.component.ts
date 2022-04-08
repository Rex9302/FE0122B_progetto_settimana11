import { Component, OnInit } from '@angular/core';
import { FavMovies, MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies!:FavMovies[]
  constructor(private movieSrv:MoviesService) { }

  async ngOnInit(){
    this.movies = await this.movieSrv.getPopularMovies();

  }

  async addFav(idM: number, i: number) {
    this.movies[i].favIsLoading = true;
    try {
      const newFav = await (await this.movieSrv.addFavorite(idM)).toPromise();
      this.movies[i].favIsLoading = false;
      this.movies[i] = {...this.movies[i],favId:newFav.id}
    } catch (error) {
      this.movies[i].favIsLoading = false;
      alert(error);
    }
  }
  async removeFav(idF: number, i: number) {
    this.movies[i].favIsLoading = true;
    try {
    await this.movieSrv.removeFavorite(idF).toPromise();
    this.movies[i].favIsLoading = false;
    this.movies[i] = {...this.movies[i],favId:undefined}
  } catch (error) {
    this.movies[i].favIsLoading = false;
    alert(error);
  }
  }
}
