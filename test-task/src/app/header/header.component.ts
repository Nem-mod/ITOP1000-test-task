import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Currency } from '../currency-interface/currency-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  // array of currencies which display on header
  currencies: Currency[] = []; 

  // currency load flag false (not loaded) | true (loaded)
  loaded: boolean = false;

  constructor(private http: HttpClient) {}
 
  // onload function 
  ngOnInit(): void {
    this.getNewCurrencyFromTo('USD', 'UAH', 1);
    this.getNewCurrencyFromTo('EUR', 'UAH', 1);
    this.loaded = true;
  }
  
  // get and push new currency 

  getNewCurrencyFromTo(from: string, to: string, amount: number):any {
    // get requets to api.exchangerate
    
    this.http
      .get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
      .subscribe(res => {
        let result: any = res;
        const currency: Currency = {
          name: result.query.to,
          base: result.query.from,
          value: result.result
        }
        // push new currency data
        this.currencies.push(currency);
      })
  }
}