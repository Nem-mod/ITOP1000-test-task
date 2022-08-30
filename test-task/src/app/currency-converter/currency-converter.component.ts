import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

interface Currency {
  value: number;
  designation: string;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})

export class CurrencyConverterComponent implements OnInit {
  currencies: Currency[] = [
    {value: 38, designation: 'USD'},
    {value: 40, designation: 'EUR'},
  ];

  valueInputFrom: number = 0;
  valueInputTo: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  handleInput(e: any) {
    this.valueInputFrom = e.target.value;
    this.valueInputTo = e.target.value * 3 / 40;
  }
}
