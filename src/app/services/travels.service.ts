import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class TravelsService {


  constructor(private http: HttpClientModule) { }

   url = "http://nelsonintech-001-site1.itempurl.com/";

  getTravel(){
    axios.get(this.url+"Travels")
      .then(response => {
        return response.data;
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        console.log('CORS issue');
      });
  }
}
