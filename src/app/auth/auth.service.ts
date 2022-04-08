import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  URL = 'http://localhost:4201';
  private authSub = new BehaviorSubject<AuthData | null>(null);
  user$ = this.authSub.asObservable();
  timeOut: any;

  constructor(private http: HttpClient, private router: Router) {
    this.ripristina()
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.URL}/login`, data).pipe(
      tap((data) => {
        this.authSub.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.autoLogout(data);
      })
    );
  }
  logout() {
    this.authSub.next(null)
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  registration(data: { name:string, email: string, password: string }) {
    return this.http.post(`${this.URL}/register`, data);
  }

  autoLogout(data:AuthData) {
    const scadenza = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
    const intervallo =  scadenza.getTime() - new Date().getTime();
    this.timeOut = setTimeout(()=> {
      this.logout();
    }, intervallo)
  }

  ripristina() {
    const user = localStorage.getItem('user');
    if (!user){
      return;
    }
    const userData:AuthData = JSON.parse(user);
    if ( this.jwtHelper.isTokenExpired(userData.accessToken)){
      return;
    }
    this.authSub.next(userData);
    this.autoLogout(userData);
  }
}
