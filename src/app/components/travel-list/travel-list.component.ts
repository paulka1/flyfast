import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { company } from '../../enum/enum';
import {companyName} from '../../enum/constant';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit, OnChanges {

  constructor(private elem: ElementRef) { }

  ngOnInit(): void {
  }

  @Input() travels;

  departure: string;
  arrived: string;
  price: number;

  company = company;

  flagFirstClass: boolean;
  displayEscale: boolean;

  firstClassState = [];

  ngOnChanges(){
    // console.log("travel", this.travels);

    //===================================================
    // Modification du Model.
    //====================================================
    if (this.travels != undefined) {
      this.travels.forEach(travel => {
        travel.TotalSum = 0;
        for (let index = 0; index < travel.Line.length; index++) {
          const line = travel.Line[index];

          //===================================================
          // Création de ces champs pour faire le dataBinding.
          //====================================================
          travel.TotalSum += line.Price;
          line.IsFirstClass = false;
          for (let jindex = 0; jindex < line.Plane.Options.length; jindex++) {
            const option = line.Plane.Options[jindex];

            option.isCheck = false;

          }
        }

        //===================================================
        // Ajout des -15% lors des escales.
        //====================================================
        // if (travel.Line.length > 1) {
        //   travel.TotalSum = travel.TotalSum * 0.85;
        // }
      });
    }

  }

  getLine(idTravel, way) {
    if (idTravel) {
      if (idTravel.Line.length > 1) {
        let flag = 0;
        for (let i = 0; i < idTravel.Line.length; i++) {
          if (flag == 0) {
            this.departure = idTravel.Line[0].Departure;
            this.arrived = idTravel.Line[i + 1].Arrived;
            flag++;
            return way == 1 ? this.departure : this.arrived;
          } else {
            this.departure = idTravel.Line[i].Departure;
            this.arrived = idTravel.Line[i].Arrived;
          }
        }
      } else {
        this.departure = idTravel.Line[0].Departure;
        this.arrived = idTravel.Line[0].Arrived;
      }
      return way == 1 ? this.departure : this.arrived;
    }
  }

  getPrice(idTravel){
    this.price = 0;
    if(idTravel) {
      // console.log("idTravel", idTravel);
      for(let i = 0; i < idTravel.Line.length; i++){
        const lineId = this.elem.nativeElement.querySelectorAll('mat-checkbox');
          // console.log("lineId", lineId);
        lineId.forEach(element => {
          // console.log('elmeentId', element.id);
          // console.log("---->", element.querySelector('input'));
          let checkbox = element.querySelector('input');
        });
        this.price += idTravel.Line[i].Price;
        }
      }
    return this.price
  }

  isEscale(idTravel){
    if(idTravel) {
      idTravel.Line.length > 1 ? this.displayEscale = true : this.displayEscale = false;
      return this.displayEscale;
    }
    }

  /**
   * Methode qui permet de recalculer le total des prix.
   * @param event
   * @param idTravel
   */
  firstClassEvent(event, idTravel) {
    this.firstClassState.push(event);
    this.flagFirstClass = true;

    this.travels.forEach(element => {
      if (element.Id == idTravel.Id) {
        //===================================================
        // On recalcul Total Sum avec les données des Lines.
        //===================================================
        element.TotalSum = 0;
        if(element.Line){
          for (let index = 0; index < element.Line.length; index++) {
            const line = element.Line[index];
            element.TotalSum += line.Price;
            console.log(line);
            for(let j = 0; j < line.Plane.Options.length; j++){
              const anOption = line.Plane.Options[j];
                console.log("----> anOption :",anOption);
              if (anOption.isCheck === true) {
                element.TotalSum += anOption.Price;
              }
            }
          }
        }

        //===================================================
        // Ajout des -15% lors des escales.
        //===================================================
        if (element.Line.length > 1) {
          idTravel.TotalSum = idTravel.TotalSum * 0.85;
        }
      }
    });
  }

  optionsEvent(event){
    console.log("optionsEvents :",event);
  }

  getCompanyName(name){
    let resultName = companyName.find(value => value.Name === name ? value.text : '');
    return resultName.text;
  }
}
