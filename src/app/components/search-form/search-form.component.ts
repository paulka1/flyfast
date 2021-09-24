import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { BookingsService } from 'src/app/services/bookings.service';
import {TravelsService} from '../../services/travels.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchForm:FormGroup;

  dateError:boolean;

  airport: Array<string> = ['DTW', 'CDG', 'JFK'];

  isBooking: boolean;
  isBooked: boolean;
  bookedFailed: boolean;

  constructor(private fb:FormBuilder,
              private travelsService:TravelsService, 
              private bookingService: BookingsService) { }

  ngOnInit(): void {
    this.formInit();
    this.bookingService.isBooking$.subscribe(value => {
      this.isBooking = value;
    });
    
    this.bookingService.isBooked$.subscribe(value => {
      this.isBooked = value;
    });

    this.bookingService.bookedFail$.subscribe(value => {
      this.bookedFailed = value;
    });
  }

  formInit(){
    this.searchForm = this.fb.group({
      date: [''],
      departure: [''],
      arrived: ['']
    })
  }

  onSubmit(){
    let today = new Date();
    if(today > this.searchForm.get('date').value){
      this.dateError = true;
    }else {
      this.dateError = false;
      this.travelsService.RechercherTravel(this.searchForm.value);
    }
  }

}
