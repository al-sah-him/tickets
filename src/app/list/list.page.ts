import { Component, OnInit } from '@angular/core';

import { WcConnectService } from '../services/wc-connect.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {


      Orders: any=[];

      myOrders: any=[];

  constructor(

      private wcService:  WcConnectService,
      private loadingController: LoadingController,
      private router: Router
  ) { }

  ngOnInit() {
      this.initOrders();
  }

  async initOrders(){

    let loading = await this.loadingController.create({
        message: 'Loading ...'
       });
       await loading.present();

    this.wcService.getOrders().subscribe((response) => {
    var myFilteredOrders: any=[];
    this.myOrders = response;
    myFilteredOrders= this.myOrders.map((item)=>{
      return {"order_id":item.id,
              "first_name":item.billing.first_name  ,
              "last_name":item.billing.last_name ,
              "phone_number":item.billing.address_1 ,
              "amount":item.total ,
              "type_of_ticket":item.line_items[0].variation_id ,
              "number_of_tickets":item.line_items[0].quantity };
                //this.dbService.addTicket(item.id, item.billing.first_name, item.billing.last_name, item.billing.address_1, item.total, item.line_items[0].variation_id,item.line_items[0].quantity);
           });
    console.log(myFilteredOrders);
    this.Orders= myFilteredOrders;
    loading.dismiss();

    //return myFilteredOrders;

     });


  }


}
