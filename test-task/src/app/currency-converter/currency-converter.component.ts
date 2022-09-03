import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Currencies from '../currencies';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})

export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = Currencies;
  loaded: boolean = false;
  currencyInputFrom: any;
  currencyInputTo: any;
  valueInputFrom: number = 0;
  valueInputTo: number = 0;

  constructor(private http: HttpClient) {}
 
  // onload function 
  ngOnInit(): void {
    this.currencyInputFrom = this.currencies[0];
    this.currencyInputTo = this.currencies[1];
    this.loaded = true;
  }
  
  // get and push new currency 

  getNewCurrencyFromTo(from: string, to: string, amount: number):any {
    // get requets to api.exchangerate

    this.http
      .get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`,)
      .subscribe(res => {
        let data: any = res;
        if(this.valueInputTo !== null && this.valueInputFrom !== null)
        {
          this.valueInputFrom = this.valueInputFrom;
          this.valueInputTo = data.result;
          console.log(this.valueInputFrom, this.valueInputTo)
        }
      })
  }
  // select handler

  handleSelect(e: any){
    this.getNewCurrencyFromTo(this.currencyInputFrom, this.currencyInputTo, this.valueInputFrom )
  }
  
  // input handler

  handleInput(e: any) {
    if(this.valueInputFrom === null || this.valueInputTo === null ) {
      this.valueInputFrom = 0;
      this.valueInputTo = 0;
    }
    // if(this.valueInputFrom)
    // this.getNewCurrencyFromTo(this.currencyInputFrom, this.currencyInputTo, this.valueInputFrom )
  }

  // swap currencies to convert

  handleSwap(e: any) {
    let tmp =  this.currencyInputFrom;
    this.currencyInputFrom =  this.currencyInputTo;
    this.currencyInputTo = tmp;
    this.getNewCurrencyFromTo(this.currencyInputFrom, this.currencyInputTo, this.valueInputFrom )
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
