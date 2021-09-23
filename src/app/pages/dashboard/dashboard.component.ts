import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TravelsService} from '../../services/travels.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {

  constructor(private travelsService : TravelsService) { }

  travels;
  displayTravels;

  flightSearchResult;

  ngOnInit(): void {

    this.travelsService.getTravels().subscribe(item => {
      console.log("item", item);
      this.travels = item;
      this.displayTravels = item;
    });
  }

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
