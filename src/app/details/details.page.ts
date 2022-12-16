import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { WcConnectService } from '../services/wc-connect.service';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  updateTicketForm: FormGroup;
  id: any;
  Ticket: any=[];
  checkInLabel: any;


  constructor(
    private wcService:  WcConnectService,
    private actRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router,
    public fb: FormBuilder
      ){

    this.id = this.actRoute.snapshot.paramMap.get('id');
    // this.wcService.getTicket(this.id).subscribe(res => {
    // this.updateTicketForm.setValue(res);
    //     })
    }

   ngOnInit() {
   //this.loadForm();
   this.getDetails();
  }

  // async loadForm(){
  //   this.updateTicketForm = this.fb.group({
  //     order_id: [''],
  //     first_name: [''],
  //     last_name: [''],
  //     phone_number: [''],
  //     amount: [''],
  //     type_of_ticket: [''],
  //     number_of_tickets: ['']
  //   })
  //   console.log(this.updateTicketForm.value)
  //
  // }

  // updateForm() {
  //   this.wcService.updateTicket(this.id, this.updateTicketForm.value)
  //     .then(() => {
  //       this.router.navigate(['/tickets']);
  //       alert("Ticket Update successfull");
  //     })
  //     .catch(error => console.log(error));
  //    }

     checkIn() {
       this.id = this.actRoute.snapshot.paramMap.get('id');
       this.wcService.updateTicket(this.Ticket)
         .then(() => {
           //this.router.navigate(['/tickets']);
           alert("Ticket Update successfull");
         })
         .catch(error => console.log(error));
        }

        async getDetails(){

              let loading = await this.loadingController.create({
                  message: 'Loading ...'
                 });
                 await loading.present();

              this.id = this.actRoute.snapshot.paramMap.get('id');
              this.wcService.getTicketsFireStore("tickets",this.id).subscribe((response) => {
              this.Ticket=response;

              console.log(response);
              loading.dismiss();
           });
        }

        enableCheckInBtn(){
          if(this.Ticket.checked_in=="true"){
            this.checkInLabel="Checked In";
            return true

          }else{
            this.checkInLabel="Check In";
            return false


          }
          console.log(this.checkInLabel);

        }
}
