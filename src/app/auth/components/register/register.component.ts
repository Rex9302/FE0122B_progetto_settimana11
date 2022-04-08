import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: NgForm) {
    console.log('ciao');
    console.log(form.value);
      await this.authSrv.registration(form.value).subscribe(()=>{
        this.authSrv.registration(form.value)
      })
      alert('Nuovo User registrato correttamente!');
      this.router.navigate(['/login']);
  }

}
