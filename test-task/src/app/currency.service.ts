import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

interface currency {
  from: string,
  to: string,
  amount: number,
  result: number
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencies: string[] = [
    "USD",
    "UAH",
    "EUR",
    "CHF",
    "CZK",
    "CNY",
    "BYN"
]
  constructor(private http: HttpClient) { }
  
  getCurrencyExchange(from: string, to: string, amount: number):Observable<any>{
    return this.http
      .get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
      .pipe(
        map(response => {
          const data:any = response;
          const currency: currency = {
            from: data.query.from,
            to: data.query.to,
            amount: data.query.amount,
            result: Number(data.result.toFixed(3))
          }
          return currency;
        }),
      );
  }
}
