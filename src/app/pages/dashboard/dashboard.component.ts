import { Component, OnInit } from '@angular/core';
import {TravelsService} from '../../services/travels.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private travelsService : TravelsService) { }

  travels;

  ngOnInit(): void {
    let test = (async () => await this.travelsService.getTravel());
    this.travels = test();
    console.log('0', this.travels);
  }




  // travels = [
  //   {
  //     departure: 'JFK',
  //     arrived: 'DTW',
  //     date: '2021-09-04T10:11:25+0200',
  //   },
  //   {
  //     departure: 'JHG',
  //     arrived: 'TRE',
  //     date: '2021-09-04T10:11:25+0200',
  //   },
  //   {
  //     departure: 'GTF',
  //     arrived: 'GYT',
  //     date: '2021-09-04T10:11:25+0200',
  //   }
  // ];
}
