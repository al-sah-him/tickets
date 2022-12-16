import { Component, OnInit } from '@angular/core';


import { WcConnectService } from '../services/wc-connect.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    eventID: any;
    Orders: any=[];
    dbOrders: any[];
    filteredOrders: any[];

    myOrders: any=[];
    public searchTerm: string = "";


  constructor(
    private wcService:  WcConnectService,
    private actRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.eventID = this.actRoute.snapshot.paramMap.get('eventID');
  }

  ngOnInit(){
    //this.wcService.getOrdersArray();

    this.initOrders();
  }

    async initOrders(){

      let loading = await this.loadingController.create({
          message: 'Loading ...'
         });
         await loading.present();

      this.wcService.getTicketsListFireStore(this.eventID).subscribe((response) => {

      this.dbOrders = response;
      this.Orders = this.dbOrders;

      console.log(this.Orders);

      loading.dismiss();

      //return myFilteredOrders;

       });

    }

    async saveToFirestore(){

      let loading = await this.loadingController.create({
          message: 'Loading ...'
         });
         await loading.present();

      this.wcService.getOrders(this.eventID).subscribe((response) => {
      var myFilteredOrders: any=[];
      this.myOrders = response;
      myFilteredOrders= this.myOrders.map((item)=>{
        return {"order_id":item.id.toString(),
                "first_name":item.billing.first_name  ,
                "last_name":item.billing.last_name ,
                "phone_number":item.billing.address_1 ,
                "amount":item.total ,
                "type_of_ticket":item.line_items[0].variation_id ,
                "number_of_tickets":item.line_items[0].quantity };
                 });
      //console.log(myFilteredOrders);

      myFilteredOrders.forEach((item)=>{

        this.wcService.checkDoc(this.eventID, item);


      });


      loading.dismiss();

      alert("Data synced successfully")

      return myFilteredOrders;

       });


    }

    setFilteredItems() {
    this.Orders = this.filterItems(this.searchTerm);
     }

    filterItems(searchTerm) {
    return this.Orders.filter(item => {
      return item.phone_number.indexOf(searchTerm.toLowerCase()) > -1;
       });
    }

    resetData(){
      this.Orders = this.dbOrders;

    }

    // validateAndSave(data){
    //   this.wcService.checkDoc(data.order_id);
    //     //console.log("Item not in database");
    //     //this.wcService.createTicket(data);
    //
    //
    // }


}
