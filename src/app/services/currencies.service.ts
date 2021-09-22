import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(public http: HttpClient) {}

  url = 'http://nelsonintech-001-site1.itempurl.com/';
  travels$;
  convertCurrency(devise: string): Observable<any> {
    return this.http.get<any>(this.url + 'Rate', {
      params: {
        Devise: devise,
      },
    });
  }
  currencyChangeEvent(rate: number) {
    console.log(this.travels$)
    
    this.travels$.forEach((travel, idx) => {
      travel['Line'].forEach((line, lineIdx) => {
        this.travels$[idx]['Line'][lineIdx]['Price'] = line['Price'] * rate;
      });
    });
    console.log('gg')
    return this.travels$;
  }
}
