import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking } from '../components/reservation-form/booking';
import { Line } from '../components/reservation-form/line';
import { CurrenciesService } from './currencies.service';
import { BookingPrice } from '../components/reservation-form/bookingPrice';
import { BookingsService } from './bookings.service';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
  constructor(public http: HttpClient, private bookingService: BookingsService) {}

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

  async bookTravel(reservations: object, price: number, currencyService: CurrenciesService) {
    this.bookingService.isCurrentlyBooking(true)
    let booking: Booking = new Booking() 
    let bookingPrice: BookingPrice = new BookingPrice(currencyService, price);

    await bookingPrice.setPrice().then(allPrices => {

      booking.customerName = reservations['name'];
      booking.tripId = reservations['id'];
      booking.PriceEUR = allPrices[0];
      booking.PriceUSD = allPrices[1];
      booking.date = reservations['date'];
      booking.company = reservations['company'];
      booking.basePrice = reservations['basePrice']
      const firstTicket: Line = new Line();
      firstTicket.LineId = reservations['first_class_line_0'];
      firstTicket.TicketType = reservations['first_class_0']
      booking.Lines = [firstTicket]

      if (reservations['first_class_line_1'] !== '') {
        const secondTicket: Line = new Line();
        secondTicket.LineId = reservations['first_class_line_1'];
        secondTicket.TicketType = reservations['first_class_1'];
        booking.Lines.push(secondTicket);
      }
      
      this.http.post(`${this.url}/Book`, booking).subscribe({
        next: () => {
          this.bookingService.validateBooking(true);
          this.bookingService.isCurrentlyBooking(false);
          setTimeout(() => {
            this.bookingService.validateBooking(false)
          }, 5000);

        },
        error: () => {
          this.bookingService.isCurrentlyBooking(false)

          this.bookingService.setFailure(true);
          setTimeout(() => {
            this.bookingService.setFailure(false)
          }, 5000);

        }
      });
  });
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
