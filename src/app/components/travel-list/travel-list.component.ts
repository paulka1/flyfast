import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {
    console.log("travels", this.travels);
  }

  @Input() travels;

  departure: string;
  arrived:string;

  choseTrip(trip) {
    console.log("trip :", trip);
  }

  ngOnChanges(){
  }

  getLine(idTravel, way){
    if(this.travels){
        if(idTravel.Line > 1){

        } else {
          this.departure = idTravel.Line[0].Departure;
          this.arrived = idTravel.Line[0].Arrived;
        }
       return way == 1 ? this.departure : this.arrived;
    }
  }
}
