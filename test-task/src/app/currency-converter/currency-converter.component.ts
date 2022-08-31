import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})

export class CurrencyConverterComponent implements OnInit {
  
  currencyMainOptions: String[] = [ "USD", "UAH" ];
  currencyAdditionOptions: String[] = [ "EUR", "CHF", "CZK", "CNY" ];
  scale: number = 0;
  loaded: boolean = false;
  currencyInputFrom: string = "USD";
  currencyInputTo: string = "UAH";
  valueInputFrom: number | null = null;
  valueInputTo: number | null = null;

  constructor(private http: HttpClient) {}
 
  // onload function 
  ngOnInit(): void {
    this.getNewCurrencyFromTo('USD', 'UAH', 1);
    this.getNewCurrencyFromTo('EUR', 'UAH', 1);
    this.loaded = true;
  }
  
  // get and push new currency 

  getNewCurrencyFromTo(from: string, to: string, amount: number):any {
    try {
      // get requets to api.apilayer.com

      this.http
        .get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`,)
        .subscribe(res => {
          let result: any = res;
          this.scale = result.result;
          if(this.valueInputTo !== null && this.valueInputFrom !== null)
          {
            this.valueInputFrom = this.valueInputFrom;
            this.valueInputTo =this.valueInputFrom * this.scale;
          }
          
        })
    } catch (error) {
      console.log(error);
    }
  }
  
  // select handler

  handleSelect(e: any) {
    switch(e.target.id){
      case 'from' : { 
        this.currencyInputFrom = e.target.value;
        break;
      }
      case 'to' : {
        this.currencyInputTo = e.target.value;
      }
    }
    this.getNewCurrencyFromTo(this.currencyInputFrom, this.currencyInputTo, 1 )
  }

  // input handler

  handleInput(e: any) {
    try {
      switch(e.target.id){
        case 'from' : { 
          this.valueInputFrom = e.target.value;
          this.valueInputTo = e.target.value * this.scale;
          break;
        }
        case 'to' : {
          this.valueInputTo = e.target.value;
          this.valueInputFrom = e.target.value / this.scale;
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // swap currencies to convert

  handleSwap(e: any) {
    let tmp =  this.currencyInputFrom;
    this.currencyInputFrom =  this.currencyInputTo;
    this.currencyInputTo = tmp;
    this.getNewCurrencyFromTo(this.currencyInputFrom, this.currencyInputTo, 1 )
  }

  // set amount of digit after dot

  fixNumber(num: any){
    if(typeof num === 'number'){
      const result = num.toFixed(2)
      return result;
    }
    return num;
  }
}
