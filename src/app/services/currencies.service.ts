import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(public http :  HttpClient) { }

   url = "http://nelsonintech-001-site1.itempurl.com/";

  convertCurrency(devise: string): Observable<any> {
    return this.http.get<any>(this.url + "Rate", {
        params:{
            Devise: devise
        }
    });
  }
}
