import { Component, OnInit } from '@angular/core';
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

  constructor(private currenciesService: CurrenciesService, private travelSerice: TravelsService) { }
  ngOnInit(): void {

  }
  currencies: Currency[] = [
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'USD', viewValue: 'USD'},
  ];

  selected = this.currencies[0].viewValue;
  current = this.currencies[0].viewValue;
  displayTravels = []

  changeCurrency = () => {
    this.travelSerice.travels$.subscribe((item) => {  
      this.displayTravels = item
      console.log("before", item)
    });

    if(this.current !== this.selected) {
      this.currenciesService.convertCurrency(this.selected).subscribe(
        (resp)=>{
          console.log(resp)
          this.currenciesService.travels$ = this.displayTravels;
          this.travelSerice.travels$ = this.currenciesService.currencyChangeEvent(resp.Rate)

        });
      this.selected = this.current;
    }
  }
}

