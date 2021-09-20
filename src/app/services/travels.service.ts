import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from "axios";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  test;

  constructor(public http :  HttpClient) { }

   url = "http://nelsonintech-001-site1.itempurl.com/";

  getTravel(): Observable<any>{
    axios.get(this.url+"Travels")
      .then(response => {
          console.log(response.data);
          this.test = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return this.test;
  }

  getTravels(): Observable<any> {
    return this.http.get<any>(this.url + "Travels")
  }
}
