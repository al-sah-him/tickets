import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { WcConnectService } from '../services/wc-connect.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  eventID: any;
  ticketForm: FormGroup;
  OrderID= Math.floor((Math.random() * 100) + 1);

  constructor(
    private wcService:  WcConnectService,
    private router: Router,
    private actRoute: ActivatedRoute,
    public fb: FormBuilder
  ) {
    this.eventID = this.actRoute.snapshot.paramMap.get('eventID');
  }

  ngOnInit() {
    this.ticketForm = this.fb.group({
      order_id: this.OrderID.toString(),
      first_name: [''],
      last_name: [''],
      phone_number: [''],
      amount: [''],
      type_of_ticket: [''],
      number_of_tickets: ['']
      //checked_in: ['']

    })
   }


   formSubmit() {
    if (!this.ticketForm.valid) {
      return false;
    } else {
      this.wcService.createTicket(this.eventID, this.ticketForm.value).then(res => {
        console.log(res)
        this.ticketForm.reset();
        this.router.navigate(['/tickets']);

      })
        .catch(error => console.log(error));
    }
  }

}
