import { Component } from '@angular/core';

import { Router } from "@angular/router";
//import { WcConnectService } from "../services/wc-connect.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    //private wcService:  WcConnectService,
    public router: Router
  ) {}

  signOut(){
    //this.wcService.SignOut();
  }







}
