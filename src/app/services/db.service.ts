import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export class Ticket{
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  amount: string;
  type_of_tickets: number;
  number_of_tickets: number;
  checked_in: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class DbService {
  // private storage: SQLiteObject;
  // ticketsList = new BehaviorSubject([]);
  // private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
   // private platform: Platform,
   // private sqlite: SQLite,
   // private httpClient: HttpClient,
   // private sqlPorter: SQLitePorter,
  ) {
      // this.platform.ready().then(() => {
      // this.sqlite.create({
      // name: 'tickets_db.db',
      // location: 'default'
      //   })
      //  .then((db: SQLiteObject) => {
      //  this.storage = db;
      //  this.getFakeData();
      //      });
      //   });
    }

  // dbState() {
  // return this.isDbReady.asObservable();
  //   }
  //
  // fetchTickets(): Observable<Ticket[]> {
  // return this.ticketsList.asObservable();
  //   }
  //
  //   // Render fake data
  //   getFakeData() {
  //     this.httpClient.get(
  //       'assets/orders.sql',
  //       {responseType: 'text'}
  //     ).subscribe(data => {
  //       this.sqlPorter.importSqlToDb(this.storage, data)
  //         .then(_ => {
  //           this.getTickets();
  //           this.isDbReady.next(true);
  //         })
  //         .catch(error => console.error(error));
  //     });
  //   }
  //
  //   // Get list
  // getTickets(){
  //   return this.storage.executeSql('SELECT * FROM ordertable', []).then(res => {
  //     let items: Ticket[] = [];
  //     if (res.rows.length > 0) {
  //       for (var i = 0; i < res.rows.length; i++) {
  //         items.push({
  //
  //           id: res.rows.item(i).id,
  //           first_name: res.rows.item(i).first_name,
  //           last_name: res.rows.item(i).last_name,
  //           phone_number: res.rows.item(i).phone_number,
  //           amount: res.rows.item(i).amount,
  //           type_of_tickets: res.rows.item(i).type_of_tickets,
  //           number_of_tickets: res.rows.item(i).number_of_tickets,
  //           checked_in: res.rows.item(i).checked_in
  //          });
  //       }
  //     }
  //     this.ticketsList.next(items);
  //   });
  // }
  //
  //
  // // Add
  // addTicket(id, first_name, last_name, phone_number, amount, type_of_tickets, number_of_tickets, checked_in) {
  //   let data = [id, first_name, last_name, phone_number, amount, type_of_tickets, number_of_tickets, checked_in];
  //   return this.storage.executeSql('INSERT INTO ordertable (id, first_name, last_name, phone_number, amount, type_of_tickets, number_of_tickets, checked_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data)
  //   .then(res => {
  //     this.getTickets();
  //   });
  // }
  //
  // // Get single object
  // getTicket(id): Promise<Ticket> {
  //   return this.storage.executeSql('SELECT * FROM ordertable WHERE id = ?', [id]).then(res => {
  //     return {
  //       id: res.rows.item(0).id,
  //       first_name: res.rows.item(0).first_name,
  //       last_name: res.rows.item(0).last_name,
  //       phone_number: res.rows.item(0).phone_number,
  //       amount: res.rows.item(0).amount,
  //       type_of_tickets: res.rows.item(0).type_of_tickets,
  //       number_of_tickets: res.rows.item(0).number_of_tickets,
  //       checked_in: res.rows.item(0).checked_in
  //     }
  //   });
  // }
  // // Update
  // updateTicket(id, ticket: Ticket) {
  //   let data = [ticket.id,
  //               ticket.first_name,
  //               ticket.last_name,
  //               ticket.phone_number,
  //               ticket.amount,
  //               ticket.type_of_tickets,
  //               ticket.number_of_tickets,
  //               ticket.checked_in];
  //   return this.storage.executeSql(`UPDATE ordertable SET id = ?,
  //                                                         first_name = ?,
  //                                                         last_name = ?,
  //                                                         phone_number = ?,
  //                                                         amount = ?,
  //                                                         type_of_tickets = ?,
  //                                                         number_of_tickets = ?,
  //                                                         checked_in = ?,
  //                                    WHERE id = ${id}`, data)
  //   .then(data => {
  //     this.getTickets();
  //   })
  // }
  // // Delete
  // deleteTicket(id) {
  //   return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
  //   .then(_ => {
  //     this.getTickets();
  //   });
  // }

}
