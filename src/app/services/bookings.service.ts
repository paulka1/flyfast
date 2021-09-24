import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor() {
  }

  private _isBooked = new BehaviorSubject<boolean>(false);
  public isBooked$ = this._isBooked.asObservable();

  private _isBooking = new BehaviorSubject<boolean>(false);
  public isBooking$ = this._isBooking.asObservable();

  private _bookedFail = new BehaviorSubject<boolean>(false);
  public bookedFail$ = this._bookedFail.asObservable();

  validateBooking(isValidated: boolean) {
    this._isBooked.next(isValidated);

  }

  isCurrentlyBooking(isBooking: boolean) {
    this._isBooking.next(isBooking);
  }

  setFailure(failed: boolean) {
    this._bookedFail.next(failed);
  }
}
