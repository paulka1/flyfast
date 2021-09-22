import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {TravelsService} from '../../services/travels.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchForm:FormGroup;

  dateError:boolean;

  airport = ['DTW', 'CDG', 'JFK'];

  constructor(private fb:FormBuilder,
              private travelsService:TravelsService) { }

  ngOnInit(): void {
    this.formInit();
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
