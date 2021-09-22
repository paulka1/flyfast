import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(public http: HttpClient) {
    this.setToEuro();
  }

  url: string = 'http://nelsonintech-001-site1.itempurl.com/';
  travels$: Array<object>;
  private _currency = new BehaviorSubject<string>("€");
  public currency$ = this._currency.asObservable();

  setToDollar() {
    this._currency.next("$")
  }
  
  setToEuro() {
    this._currency.next("€")
  }
  convertCurrency(devise: string): Observable<any> {
    return this.http.get<any>(this.url + 'Rate', {
      params: {
        Devise: devise,
      },
    });
  }
  currencyChangeEvent(rate: number) {    
    this.travels$.forEach((travel, idx) => {
      travel['Line'].forEach((line, lineIdx) => {
        this.travels$[idx]['Line'][lineIdx]['Price'] = line['Price'] * rate;
      });
    });
    return this.travels$;
  }
}
