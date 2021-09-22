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
  displayTravels;

  ngOnInit(): void {

    this.travelsService.getTravels().subscribe(item => {
      console.log("item", item);
      this.travels = item;
      console.log(this.travelsService.travels$.subscribe())
      this.travelsService.travels$.subscribe((value) => {
        this.displayTravels = value;
      });
    });
  }
}