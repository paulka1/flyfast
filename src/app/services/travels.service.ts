import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  constructor(public http :  HttpClient) { }

   url = "http://nelsonintech-001-site1.itempurl.com/";
   //travels$: Observable<Array<object>> = of();
   private _travels = new BehaviorSubject<Array<object>>([]);
   public travels$ = this._travels.asObservable();

   
   private _basicTravels = new BehaviorSubject<Array<object>>([]);
   public basicTravels$ = this._basicTravels.asObservable();
  getTravels() {
    this.http.get<Array<object>>(this.url + "Travels").subscribe(value => {
      this.setFlights(value)
    });
  }

  setFlights( array )
 {
   this._travels.next( array )
 }
  bookTravel(reservations: object) {
    let bookData = {}
    bookData['customerName'] = reservations['name'];
    bookData['tripId'] = reservations['id'];
    bookData['PriceEUR'] = 12;
    bookData['PriceUSD'] = 14;
    const firstTicket = {
      "LineId": reservations['first_class_line_0'],
      "TicketType": reservations['first_class_0'],
    };


    bookData['Lines'] = [firstTicket];
    if(reservations['first_class_line_1'] !== "") {
      const secondTicket = {
        "LineId": reservations['first_class_line_1'],
        "TicketType": reservations['first_class_1'],
      };
      bookData['Lines'].push(secondTicket);
    }

    return this.http.post(`${this.url}/Book`, bookData);
  }

}
