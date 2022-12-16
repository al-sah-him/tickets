import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from "@angular/router";
import { WcConnectService } from '../services/wc-connect.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  eventID: any;
  eventMeta: any[];
  Tickets: any[];
  soldTickets: any;
  checkedIn: any;
  total: any;
  payout: any;
  onlineTotal: any;
  paybillTotal: any;
  cashTotal: any;

  // features= [
  //   {id: 1, name: 'Tickets sold', value: this.soldTickets, background: 'rgba(27,150,181, 0.1)', page: ''},
  //   {id: 2, name: 'Checked In', value: this.checkedIn, background: 'rgba(106,100,255, 0.1)', page: ''},
  //   {id: 3, name: 'Total', value: this.total, background: 'rgba(255, 196, 9, 0.1)', page: ''},
  //   {id: 4, name: 'Payout', value: this.payout, background: 'rgba(27,150,181, 0.1)', page: ''},
  // ];

  transactions: any[] = [
    {id: 1, vendor: 'Withdrawn', image: '', amount: 15000, time: '3:00PM'},
    {id: 2, vendor: 'Balance', image: '', amount: 10000, time: '4:00PM'}
  ];

  constructor(
    private wcService:  WcConnectService,
    private actRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router

  ) {
    this.eventID = this.actRoute.snapshot.paramMap.get('eventID');
   }

  ngOnInit() {

    this.getEventDetails();

  }

  async getEventDetails(){

        let loading = await this.loadingController.create({
            message: 'Loading ...'
           });
           await loading.present();

        this.eventID = this.actRoute.snapshot.paramMap.get('eventID');
        this.wcService.getTicketsFireStore(this.eventID+"_meta", "event_meta").subscribe((response) => {
        this.eventMeta=response
        console.log(response);
        this.updateMeta();
        loading.dismiss();
     });
  }


  async updateMeta(){

    let loading = await this.loadingController.create({
        message: 'Loading ...'
       });
       await loading.present();

    this.wcService.getTicketsListFireStore(this.eventID).subscribe((response) => {

    this.Tickets = response;


    console.log(this.Tickets);

    //total sold tickets
    var soldTicketsInt= this.Tickets.length;
    this.soldTickets= soldTicketsInt.toString();
    console.log(this.soldTickets);

    //checked in
     var checkedInList= this.Tickets.filter((item)=>{
       return item.checked_in === "true";
        })
     var checkedInInt= checkedInList.length;
     this.checkedIn= checkedInInt.toString();
     console.log(this.checkedIn);

     //total
     var totalInt= this.Tickets.reduce((currentTotal, item)=> {
       return Number(item.amount)+ currentTotal;
     },0);

     this.total= totalInt.toString();

     //payout
     var payoutInt= Math.round(totalInt* 0.90);
     this.payout= payoutInt.toString();

     //onlineTotal

     //paybillTotal

     //cashTotal

     loading.dismiss();

     });

  }



}
