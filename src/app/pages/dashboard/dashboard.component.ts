import {Component, OnInit } from '@angular/core';
import {TravelsService} from '../../services/travels.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private travelsService : TravelsService) { }

  travels: Array<object>;
  displayTravels: Array<object>;

  flightSearchResult;

  ngOnInit(): void {
    this.travelsService.getTravels();
    this.travelsService.travels$.subscribe((value) => {
      this.displayTravels = value;
    });
  }

  //   ngOnInit(): void {
  //
  //     this.travelsService.getTravels().subscribe(item => {
  //       this.travels = item;
  //       this.displayTravels = item;
  //     });
  // }

  currencyChangeEvent() {
    return null;
  }

    ngOnChanges() {

    }

  getTravels(event){
    console.log("this.flightSearchResult", this.flightSearchResult);
    this.travels = event;
    this.displayTravels = event;
    console.log("this.this.travels", this.travels);
  }
}
