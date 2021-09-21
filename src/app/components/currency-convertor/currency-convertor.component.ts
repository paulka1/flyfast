import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from 'src/app/services/currencies.service';


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

  constructor(private currenciesService: CurrenciesService) { }
  ngOnInit(): void {
  }
  currencies: Currency[] = [
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'USD', viewValue: 'USD'},
  ];

  selected = this.currencies[0].viewValue;
  current = this.currencies[0].viewValue;

  changeCurrency = () => {
    if(this.current !== this.selected) {
      this.currenciesService.convertCurrency(this.selected).subscribe((resp)=> console.log(resp));
      this.selected = this.current;

    }
  }
}

