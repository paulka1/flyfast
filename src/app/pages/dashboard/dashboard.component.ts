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

  ngOnInit(): void {
    this.travelsService.getTravels();
    this.travelsService.travels$.subscribe((value) => {
      this.displayTravels = value;
    });
  }

}