import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthData, AuthService } from '../auth/auth.service';
import { Favorites } from '../models/favorites';
import { Movies } from '../models/movies';

export interface FavMovies {
  data: Movies;
  favId?: number;
  favIsLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient, private authSrv: AuthService) {}
  async getPopularMovies(): Promise<FavMovies[]> {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    console.log(user.accessToken);
    const movies = await this.http
      .get<Movies[]>(`${this.authSrv.URL}/movie/popular`)
      .toPromise();
    console.log(user.accessToken);
    const fav = await this.http
      .get<Favorites[]>(`${this.authSrv.URL}/favorites?userId=${user.user.id}`)
      .toPromise();
    return movies.map((m) => ({
      data: m,
      favIsLoading: false,
      favId: fav.find((f) => f.movieId == m.id)?.id,
    }));
  }

  async addFavorite(movieId: number) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    return this.http.post<Favorites>(`${this.authSrv.URL}/favorites`, {
      userId: user.user.id,
      movieId,
    });
  }
  removeFavorite(id: number) {
    return this.http.delete(`${this.authSrv.URL}/favorites/${id}`);
  }
}
