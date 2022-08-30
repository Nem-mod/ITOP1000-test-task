import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  USD: number = 0;
  EUR: number = 0;
  response: any;
  loaded: boolean = false;
  constructor(private http: HttpClient) {

  }
  value: number = 40;
  
  ngOnInit(): void {
    this.http.get('https://api.currencyfreaks.com/latest?apikey=c7d12d979e444957a32d8d01cc2c8484')
    .subscribe((res) => {
      this.response = res; 
      this.USD = Number(this.response.rates.UAH);
      this.EUR= this.USD * Number(this.response.rates.EUR);
      this.loaded = true;
    })
    
  }

  search(){
    
  }


}
