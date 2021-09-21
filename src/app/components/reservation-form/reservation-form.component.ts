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

  isEscale: boolean;

  @Input() idTravel;

  ngOnInit(): void {
    this.formInit()
    if(this.idTravel){
      console.log("idTravel",this.idTravel);

      // Avec Escale
      this.idTravel.Line.length > 1 ? this.isEscale = true : this.isEscale = false;
    }
  }

  formInit(){
    this.travelForm = this.fb.group({
      name: ['',Validators.required],
      id: [''],
      first_class: [''],
      currency: [''],
      first_class_0: [''],
      first_class_1: [''],
    })
  }

  onSubmit(){
    this.travelForm.get("id").setValue(this.idTravel.Id);
    console.log("Reservation :s", this.travelForm.value);
  }

  eventCheck(event, index){
    console.log("eee", event.checked, index);
    if(index === 0){
      this.travelForm.get("first_class_0").setValue(event.checked);
    } else {
      this.travelForm.get("first_class_1").setValue(event.checked);
    }
  }
}
