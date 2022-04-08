import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public showNav = false;
  constructor(private authSrv: AuthService) {}

  ngOnInit() {
    this.authSrv.user$.subscribe((user) => {
      this.showNav = !!user;
    });
  }
  logout() {
    this.authSrv.logout();
  }
}
