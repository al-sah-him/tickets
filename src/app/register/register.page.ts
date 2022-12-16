import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from "@angular/router";
import { WcConnectService } from '../services/wc-connect.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public eventCode:any;
  public email: any;
  public password: any;

  constructor(
    private wcService:  WcConnectService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  // signUp(){
  //     this.wcService.RegisterUser(this.email, this.password)
  //     .then((res) => {
  //       this.router.navigate(['login']);
  //       // Do something here
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  signUp(){
    this.wcService.RegisterUser({email:this.email,password:this.password}).then(res=>{
      if(res.user.uid){
        let data = {
          uid:res.user.uid,
          eventCode:this.eventCode,
          email:this.email,
          password:this.password


        }
        this.wcService.saveDetails(data).then(res=>{
         this.redirectLoggedUserToLoginPage();
         alert('Account Created!');

        },err=>{
          console.log(err);
        })
      }
    },err=>{
      alert(err.message);

      console.log(err);
    })
  }

  redirectLoggedUserToLoginPage() {
   // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
   // That's why we need to wrap the router navigation call inside an ngZone wrapper
   this.ngZone.run(() => {
     this.router.navigate(['login']);
   });
 }

}
