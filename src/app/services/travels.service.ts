import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  constructor(public http :  HttpClient) { }

   url = "http://nelsonintech-001-site1.itempurl.com/";
   travels$: Observable<Array<object>> = of();

  getTravels(): Observable<any> {
    const res = this.http.get<any>(this.url + "Travels");
    console.log(res)
    this.travels$ = res;
    return res
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
