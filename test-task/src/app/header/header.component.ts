import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  // array of currencies which display on header
  currencies: any[] = [];

  // currency load flag false (not loaded) | true (loaded)
  loaded: boolean = false;

  constructor(private currencyService: CurrencyService) {}
 
  // onload function 
  ngOnInit(): void {
    this.getNewCurrencyFromTo('USD', 'UAH', 1);
    this.getNewCurrencyFromTo('EUR', 'UAH', 1);
    this.loaded = true;
  }
  
  // get and push new currency 

  getNewCurrencyFromTo(from: string, to: string, amount: number):any {
    // get requets to api.exchangerate
    this.currencyService.getCurrencyExchange(from, to, amount)
    .subscribe(res => {
      const data = res;
      const currency = {
          name: data.to,
          base: data.from,
          value: data.result
      }
      this.currencies.push(currency);
    })
  }
}