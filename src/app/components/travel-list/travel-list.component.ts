import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit, OnChanges {

  constructor(private elem: ElementRef) { }

  ngOnInit(): void {
    console.log("travels", this.travels);
  }

  @Input() travels;

  departure: string;
  arrived:string;
  price:number;

  flagFirstClass:boolean;

  ngOnChanges(){
    console.log("travel", this.travels);
  }

  getLine(idTravel, way){
    if(idTravel){
        if(idTravel.Line.length > 1){
          let flag = 0;
          for(let i = 0; i < idTravel.Line.length; i++){
            if(flag == 0){
              this.departure = idTravel.Line[0].Departure;
              this.arrived = idTravel.Line[i+1].Arrived;
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

  // getPrice(idTravel){
  //   this.price = 0;
  //   if(idTravel) {
  //     // console.log("idTravel", idTravel);
  //     for(let i = 0; i < idTravel.Line.length; i++){
  //       const lineId = this.elem.nativeElement.querySelectorAll('mat-checkbox');
  //       if (lineId.length > 0) {
  //         console.log("lineId", lineId);
  //         lineId.forEach(element => {
  //           // console.log('elmeentId', element.id);
  //           // console.log("---->", element.querySelector('input'));
  //           let checkbox = element.querySelector('input');
  //           console.log("checkbox", checkbox);
  //           if(checkbox && checkbox.checked){
  //             this.price += idTravel.Line[i].Price * 2;
  //           } else {
  //             this.price += idTravel.Line[i].Price;
  //           }
  //           //console.log("checkbox", checkbox.checked);
  //         });
  //       } else {
  //         this.price += idTravel.Line[i].Price;
  //       }
  //       // this.price += idTravel.Line[i].Price;
  //
  //     }
  //   }
  //   return this.price
  // }

  firstClassEvent(event, idTravel){
    this.flagFirstClass = true;
    let test = 'APrice '+idTravel.Id;

    // let element = document.getElementById(test) as HTMLElement;
    // let element = document.getElementById(test);
    const elements = this.elem.nativeElement.querySelectorAll('a');
    elements.forEach(element=>{
      if(element.id.trim() == test.trim()){

        if(event.event.checked === true){
          const lineId = this.elem.nativeElement.querySelectorAll('mat-checkbox');
          console.log("lineID ",lineId);
          console.log('idtravel.line', idTravel.Line);
          console.log('event', event);
          lineId.forEach(ele => {
            console.log("ele", ele);
             if(ele.id - 1 === event.index){

             }
          });
          element.innerText = this.getPrice(idTravel) * 2;
        } else {
          element.innerText = this.getPrice(idTravel);
        }
      }
    });
  }
}
