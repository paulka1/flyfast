import {Component, OnInit } from '@angular/core';
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

    this.travelsService.getTravels().subscribe(item => {
      console.log(item);
      this.travels = item;
    });
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
