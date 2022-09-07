import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Observable, debounceTime, fromEvent, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})

export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = this.currencyService.currencies;
  
  currencyInputFrom: any;
  currencyInputTo: any;
  
  valueInputFrom: number = 0;
  valueInputTo: number = 0;

  constructor(private currencyService: CurrencyService) {}
 
  // onload function 
  ngOnInit(): void {
    this.currencyInputFrom = this.currencies[0];
    this.currencyInputTo = this.currencies[1];
  }
  
  // // get and push new currency 

  getNewCurrency():any {
    return this.currencyService.getCurrencyExchange(this.currencyInputFrom, this.currencyInputTo, this.valueInputFrom)
      .subscribe(res => {
        let data: any = res;
        this.valueInputTo = data.result;
      })
  }

  // input handler

  handleInput(e: any) {
    const subsctiption: Observable<Event> = fromEvent(e.target, 'input');
    subsctiption
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(() => {
      switch(e.target.id){
        case 'from' : { 
          this.currencyService.getCurrencyExchange(this.currencyInputFrom, this.currencyInputTo, this.valueInputFrom)
            .subscribe((res) => {
              let data: any = res;
              this.valueInputTo = data.result;
            })
          break;
        }
        case 'to' : {
          this.currencyService.getCurrencyExchange( this.currencyInputTo, this.currencyInputFrom, this.valueInputTo)
            .subscribe((res) => {
              let data: any = res;
              this.valueInputFrom = data.result;
            })
        } 
      }
    })
  }

  // swap currencies to convert

  handleSwap(e: any) {
    let tmp =  this.currencyInputFrom;
    this.currencyInputFrom =  this.currencyInputTo;
    this.currencyInputTo = tmp;
    this.getNewCurrency();
  }
}
