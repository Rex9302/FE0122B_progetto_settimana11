import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { Favorites } from 'src/app/models/favorites';
import { Movies } from 'src/app/models/movies';

export interface FavMovies {
  data: Movies;
  favId?: number;
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
    const movies = await this.http
      .get<Movies[]>(`${this.authSrv.URL}/movie/popular`)
      .toPromise();
    const favorites = await this.http
      .get<Favorites[]>(`${this.authSrv.URL}/favorites?userId=${user.user.id}`)
      .toPromise();
    return movies.map((movies) => ({
      data: movies,
      favId: favorites.find((preferiti) => preferiti.movieId == movies.id)?.id,
    }));
  }
  async addPref(movieId: number) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    return this.http.post<Favorites>(`${this.authSrv.URL}/favorites`, {
      userId: user.user.id,
      movieId,
    });
  }
  removePref(id: number) {
    return this.http.delete(`${this.authSrv.URL}/favorites/${id}`);
  }
}
