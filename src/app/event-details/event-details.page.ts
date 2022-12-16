import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { WcConnectService } from '../services/wc-connect.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  eventForm: FormGroup;

  constructor(
    private wcService:  WcConnectService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      event_id: [''],
      event_name: [''],
      event_date: ['']

    })
  }

  formSubmit() {
   if (!this.eventForm.valid) {
     return false;
   } else {
     this.wcService.createEventMeta(this.eventForm.value).then(res => {
       console.log(res)
       alert("Event successfully added");
       this.eventForm.reset();
       this.router.navigate(['/analytics/'+this.eventForm.value.event_id]);

     })
       .catch(error => console.log(error));
   }
 }

}
