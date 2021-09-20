import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() _travels;


  @Input() set(travels: any){
    this._travels = travels;
    console.log("TRAVELS", this._travels);
  }
  choseTrip(trip) {
  }

  ngOnChanges(){
    console.log('_travels', this._travels);
  }

}
