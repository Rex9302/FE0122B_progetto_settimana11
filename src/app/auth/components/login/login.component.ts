import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: NgForm) {
    console.log(form.value);
      await this.authSrv.login(form.value).toPromise();
      this.router.navigate(['/'])
  }

}
