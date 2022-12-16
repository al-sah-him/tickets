import { Injectable, NgZone } from '@angular/core';

import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';


import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import 'rxjs/add/operator/toPromise';

//import { DbService } from '../services/db.service';

// export class Order {
//   _id: number;
//   name: string;
//   email: string;
//   phone: string;
// }

export class Order {

billing:{};
cart_hash: string;
cart_tax: string;
coupon_lines: [];
created_via: string;
currency: string;
currency_symbol: string;
customer_id: number;
customer_ip_address: string;
customer_note: string;
customer_user_agent: string;
date_completed: string;
date_completed_gmt: string;
date_created: string;
date_created_gmt: string;
date_modified: string;
date_modified_gmt: string;
date_paid: string;
date_paid_gmt: string;
discount_tax: string;
discount_total: string;
fee_lines: [];
id: number;
line_items: [];
meta_data:  [];
number: string;
order_key: string;
parent_id: number;
payment_method: string;
payment_method_title: string;
prices_include_tax: boolean;
refunds: [];
shipping: {};
shipping_lines: [];
shipping_tax: string;
shipping_total: string;
status: string;
tax_lines: [];
total: string;
total_tax: string;
transaction_id: string;
version: string;
_links: {};

};

export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
};

//firebase db tickets model
export class Ticket {
    order_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    amount: string;
    type_of_ticket: number;
    number_of_tickets: number;
    checked_in: boolean;
};

export class TicketList {

};

export class EventMeta{
  event_id: string;
  event_name: string;
  event_date: string;
  total_tickets: string;
  checked_in: string;
  total_amount: string;

};






@Injectable({
  providedIn: 'root'
})
export class WcConnectService {
  ticketListRef: AngularFireList<any>;
  ticketRef: AngularFireObject<any>;

  //OrderArray: any=[];
  //myOrders:OrderArray[]=[];
  myOrders: any=[];

   userData: any;
  // myFilteredOrders: any=[];

  //endpoint = "https://radiantmagazine.co.ke/wp-json/wc/v3/orders?per_page=100&product=2406&status=completed";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': 'Basic <WooCommerce Store Access Token>'
                               })
        };

  constructor(private httpClient: HttpClient,
              public afStore: AngularFirestore,
              public ngFireAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone,
              private db: AngularFireDatabase
              //private dbService:  DbService
                  ) {

                    this.ngFireAuth.authState.subscribe((user) => {
                    if (user) {
                        this.userData = user;
                        localStorage.setItem('user', JSON.stringify(this.userData));
                        JSON.parse(localStorage.getItem('user'));
                      } else {
                              localStorage.setItem('user', null);
                              JSON.parse(localStorage.getItem('user'));
                             }
                     });

                   }

//this function gets the raw order data from the woocommerce shop
  getOrders(productID: string): Observable<Order[]> {
    var endpoint="https://radiantmagazine.co.ke/wp-json/wc/v3/orders?per_page=100&product="+productID+"&status=completed";

    return this.httpClient.get<Order[]>(endpoint, this.httpOptions)
      .pipe(
        //tap(orders => console.log('Orders retrieved!')),
          tap(orders => console.log("Data successfully retrieved from Radiant Wc Shop")),
          //tap(orders => this.OrderArray.push(orders)),
        //map(orders => console.log(orders.id)),
        catchError(this.handleError<Order[]>('Get order', []))
      );
  }





//this function refines the woocommerce order data to only the relevant fields
  getOrdersArray(productID: string){
      this.getOrders(productID).subscribe((response) => {
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
      console.log("Data from successfully processed");
      return myFilteredOrders;
       });
  }



  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  RegisterUser(data) {

    return this.ngFireAuth.createUserWithEmailAndPassword(data.email, data.password);
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  //save user data on firestore database
  saveDetails(data) {
   return this.afStore.collection("users").doc(data.uid).set(data);
   }

  // Store user in localStorage
 SetUserData(user) {
   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
     `users/${user.uid}`
   );
   const userData: User = {
     uid: user.uid,
     email: user.email,
     displayName: user.displayName,
     photoURL: user.photoURL,
     emailVerified: user.emailVerified,
   };
   return userRef.set(userData, {
     merge: true,
   });
 }
 // Sign-out
 SignOut() {
   return this.ngFireAuth.signOut().then(() => {
     alert('User logged out successfully');
     localStorage.removeItem('user');
     this.router.navigate(['login']);
   });
 }

//DATABASE OPERATIONS
 // Create
  // createTicket(ticket: Ticket) {
  //   data={
  //     order_id: ticket.order_id,
  //     first_name: ticket.first_name,
  //     last_name: ticket.last_name,
  //     phone_number: ticket.phone_number,
  //     amount: ticket.amount,
  //     type_of_ticket: ticket.type_of_ticket,
  //     number_of_tickets: ticket.number_of_tickets,
  //     checked_in: "false"
  //
  //   };
  //   return this.ticketListRef.set({
  //
  //
  //   });
  // }

  createTicket(eventID: string, ticket: Ticket) {
    var data={
      order_id: ticket.order_id,
      first_name: ticket.first_name,
      last_name: ticket.last_name,
      phone_number: ticket.phone_number,
      amount: ticket.amount,
      type_of_ticket: ticket.type_of_ticket,
      number_of_tickets: ticket.number_of_tickets,
      checked_in: "false"
    };
    return this.afStore.collection(eventID+"_data").doc(data.order_id).set(data);
  }

  createEventMeta(eventMeta: EventMeta) {
    var data={
      event_id: eventMeta.event_id,
      event_name: eventMeta.event_name,
      event_date: eventMeta.event_date,
      total_tickets: "",
      checked_in: "",
      total_amount: ""

    };


    var eventMeta_id= data.event_id+"_meta";

    return this.afStore.collection(eventMeta_id).doc("event_meta").set(data);
  }




  // Get Single

  getTicketsFireStore(collection: string, id: string): Observable<Ticket[]> {
    return this.afStore.collection<Ticket[]>(collection).doc(id).valueChanges()

      .pipe(
          tap(ticket => console.log(ticket)),
        catchError(this.handleError<Ticket[]>('Get ticket', []))
      );
  }


  // getTicket(id: string) {
  //   this.ticketRef = this.db.object('/ticket/' + id);
  //   return this.ticketRef;
  // }

  getTicket(id: string) {
    return this.afStore.collection("tickets").doc(id).valueChanges();
  }

  // Get List
  // getTicketList() {
  //   this.ticketListRef = this.db.list('/ticket');
  //   return this.ticketListRef;
  // }
  getTicketsListFireStore(eventID: string): Observable<TicketList[]> {
    return this.afStore.collection<TicketList[]>(eventID+"_data").valueChanges()

      .pipe(
          tap(tickets => console.log("Tickets retrieved successfully")),
        catchError(this.handleError<TicketList[]>('Get ticket', []))
      );

  }

  //check if a document exists in the db and return true or false

  async checkDoc(eventID: string, ticket: Ticket){
   const ticketDocRef = this.afStore.collection(eventID+"_data").doc(ticket.order_id)


   ticketDocRef.get().toPromise()
     .then((docSnapshot)=> {
       if(docSnapshot.exists){
         console.log("The ticket "+ticket.order_id+ " exists")
       }else{
         //add ticket
         this.createTicket(eventID+"_data", ticket);
         console.log("The ticket "+ticket.order_id+ " does not exist")
       }

     });


  }






  // Update
  // updateTicket(id, ticket: Ticket) {
  //   return this.ticketRef.update({
  //     order_id: ticket.order_id,
  //     first_name: ticket.first_name,
  //     last_name: ticket.last_name,
  //     phone_number: ticket.phone_number,
  //     amount: ticket.amount,
  //     type_of_ticket: ticket.type_of_ticket,
  //     number_of_tickets: ticket.number_of_tickets,
  //     checked_in: "true"
  //   });
  // }

  updateTicket(ticket: Ticket) {
    var data={
      order_id: ticket.order_id,
      first_name: ticket.first_name,
      last_name: ticket.last_name,
      phone_number: ticket.phone_number,
      amount: ticket.amount,
      type_of_ticket: ticket.type_of_ticket,
      number_of_tickets: ticket.number_of_tickets,
      checked_in: "true"
    };

  return this.afStore.collection("tickets").doc(data.order_id).update({

    checked_in: "true"
     });
  }

  // Delete
  deleteTicket(id: number) {
    this.ticketRef = this.db.object('/ticket/' + id);
    this.ticketRef.remove();
  }






  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
