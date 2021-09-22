import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  constructor(public http :  HttpClient) { }

   url = environment.urlFlyfast;

  getTravels(): Observable<any> {
    return this.http.get<any>(this.url + "Travels");
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

  RechercherTravel(params:any){
    console.log("SERACH PARMA", params);
  }
}
