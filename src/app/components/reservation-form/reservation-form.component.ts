import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  travelForm:FormGroup;

  ngOnInit(): void {
    this.formInit()
  }

  formInit(){
    this.travelForm = this.fb.group({
      name: ['',Validators.required],
      date: [''],
      departure: [''],
      arrived: [''],
      first_class: ['']
    })
  }

  onSubmit(){
    this.travelForm.get("date").setValue(this.idTravel.date);
    this.travelForm.get("departure").setValue(this.idTravel.departure);
    this.travelForm.get("arrived").setValue(this.idTravel.arrived);
    console.log("Reservation :s", this.travelForm.value);
  }

  @Input() idTravel;

}
