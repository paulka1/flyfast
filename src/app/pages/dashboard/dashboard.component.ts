import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  travels = [
    {
      departure: 'JFK',
      arrived: 'DTW',
      date: '2021-09-04T10:11:25+0200',
    },
    {
      departure: 'JHG',
      arrived: 'TRE',
      date: '2021-09-04T10:11:25+0200',
    },
    {
      departure: 'GTF',
      arrived: 'GYT',
      date: '2021-09-04T10:11:25+0200',
    }
  ];
}
