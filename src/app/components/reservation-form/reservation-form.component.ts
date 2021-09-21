import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  constructor(private fb:FormBuilder, private travelService: TravelsService) { }

  travelForm:FormGroup;

  isEscale: boolean;

  @Input() idTravel;

  @Output() fristClassEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.formInit()
    if(this.idTravel){
      // Calcul de voyage avec escale
      this.idTravel.Line.length > 1 ? this.isEscale = true : this.isEscale = false;
    }
  }

  formInit(){
    this.travelForm = this.fb.group({
      name: ['',Validators.required],
      id: [''],
      first_class: [0],
      currency: [''],
      first_class_0: [0],
      first_class_1: [0],
      first_class_line_0: [''],
      first_class_line_1: [''],
    })
  }

  onSubmit(){
    this.travelForm.get("id").setValue(this.idTravel.Id);
    this.travelForm.get("first_class_line_0").setValue(this.idTravel.Line[0]['Id']);
    this.travelService.bookTravel(this.travelForm.value).subscribe((d)=> console.log(d));
  }

  eventCheck(event, index: number, lineId: number){
    if(index === 0){
      this.travelForm.get("first_class_0").setValue(event.checked);
      this.fristClassEvent.emit({event, index});
      this.travelForm.get("first_class_line_0").setValue(lineId);
    } else {
      this.travelForm.get("first_class_1").setValue(event.checked);
      this.fristClassEvent.emit({event, index});
      this.travelForm.get("first_class_line_1").setValue(lineId);
    }
  }
}
