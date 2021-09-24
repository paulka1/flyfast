import { take } from 'rxjs/operators';
import { CurrenciesService } from "src/app/services/currencies.service";

export class BookingPrice {
    constructor(private currencyService: CurrenciesService, private price: number) {}

    private _getCurrency(): boolean {
        let isEuro: boolean = false;
        this.currencyService.isEuro$.subscribe(value => {
            if(value === true) {
                isEuro = true;
            }
        });

        return isEuro;
    }

    private _getRate(): Promise<unknown> {
        return this.currencyService.getCurrencyRate('USD').pipe(take(1))
        .toPromise();     
    }

    async setPrice() {
        const isEuro: boolean = this._getCurrency();
        let priceEUR: number;
        let priceUSD: number;
        await this._getRate().then((value) => {
            const rate = value['Rate'];
            if(isEuro) {
                priceEUR = this.price;
                priceUSD = this.price * rate;
    
            } else {
                priceUSD = this.price;
                priceEUR = this.price / rate;
            }
        })
        return [priceEUR, priceUSD];
    }
}