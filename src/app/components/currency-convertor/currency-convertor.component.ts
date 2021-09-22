import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { TravelsService } from 'src/app/services/travels.service';


interface Currency {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.scss']
})
export class CurrencyConvertorComponent implements OnInit {
   current;
  constructor(private currenciesService: CurrenciesService, private travelSerice: TravelsService) { }
  ngOnInit(): void {
    this.current = this.currencies[0].viewValue;
    this.travelSerice.travels$.subscribe( travels => {
      this.displayTravels = [...travels];
    });
    
  }
  currencies: Currency[] = [
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'USD', viewValue: 'USD'},
  ];

  selected = this.currencies[0].viewValue;
  displayTravels = []

  getCurrencyRate = () => {
    if(this.current !== this.selected) {
      this.currenciesService.convertCurrency(this.selected).subscribe(
        (resp)=>{
          let rate: number;
          if(this.selected == "EUR") {
            rate = 1;
          } else {
           rate = resp.Rate
          }
          this.currenciesService.travels$ = this.displayTravels;
          this.travelSerice.travels$ = of(this.currenciesService.currencyChangeEvent(rate))
          this.current = this.selected;

        }
      )}
  }
  changeCurrency = () => {
    if(this.current !== this.selected) {
      this.currenciesService.convertCurrency(this.selected).subscribe(
        (resp)=>{
          if(this.selected == "EUR") {
           this.travelSerice.getTravels();
           this.currenciesService.setToEuro();
          } else {
           const rate = resp.Rate
           this.currenciesService.travels$ = this.displayTravels;
           this.travelSerice.setFlights(this.currenciesService.currencyChangeEvent(rate));
           this.currenciesService.setToDollar();

          }
          this.current = this.selected;

        });


    }
  }
}

