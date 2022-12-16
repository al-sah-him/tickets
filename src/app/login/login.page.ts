import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { WcConnectService } from '../services/wc-connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  eventCode: any;
  email: any;
  password: any;


  constructor(
    private wcService:  WcConnectService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logIn() {
    this.wcService.SignIn(this.email, this.password)
      .then((res) => {
        alert('User logged in successfully');
      this.router.navigate(['analytics/'+this.eventCode]);
      }).catch((error) => {
        alert(error.message)
      })
  }

}
