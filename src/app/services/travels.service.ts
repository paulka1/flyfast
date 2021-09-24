import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
  constructor(public http: HttpClient) {}

  url = environment.urlFlyfast;
  private _travels = new BehaviorSubject<Array<object>>([]);
  public travels$ = this._travels.asObservable();

  getTravels() {
    this.http.get<Array<object>>(this.url + 'Travels').subscribe((value) => {
      this.setFlights(value);
    });
  }

  setFlights(array) {
    this._travels.next(array);
  }
  bookTravel(reservations: object) {
    let bookData = {};
    bookData['customerName'] = reservations['name'];
    bookData['tripId'] = reservations['id'];
    bookData['PriceEUR'] = 12;
    bookData['PriceUSD'] = 14;
    const firstTicket = {
      LineId: reservations['first_class_line_0'],
      TicketType: reservations['first_class_0'],
    };


    bookData['Lines'] = [firstTicket];
    if (reservations['first_class_line_1'] !== '') {
      const secondTicket = {
        LineId: reservations['first_class_line_1'],
        TicketType: reservations['first_class_1'],
      };
      bookData['Lines'].push(secondTicket);
    }

    return this.http.post(`${this.url}/Book`, bookData);
  }

  RechercherTravel(params:any){
    console.log("parma", params);
    if(params.date){
      return this.http.get<any>(this.url + "Travels?date="+params.date.format('YYYY-MM-DD'));
    } else {
      return this.http.get<any>(this.url + "Travels");
    }
  }
}
