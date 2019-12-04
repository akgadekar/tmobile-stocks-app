import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { STOCK_CONST } from './stocks.constant';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  today = new Date();
  filterFromdate: string;
  filterTodate: string;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      filterFromdate: [null, Validators.required],
      filterTodate: [null, Validators.required],
    }, {
      validator: this.toDateValidator('filterFromdate', 'filterTodate')
    });
  }

  ngOnInit() { }

  /**
   * The date-pickers should not allow selection of dates after the current day.
   * "to" cannot be before "from" (selecting an invalid range should make both dates the same value)
   */
  toDateValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const fromDate = formGroup.controls[controlName];
      const toDate = formGroup.controls[matchingControlName];
      if (toDate.errors && toDate.errors.matDatepickerMin) {
        toDate.setValue(fromDate.value);
      }
    }
  }

  /**
   * This function is called on click of submit button
   */
  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, filterFromdate, filterTodate } = this.stockPickerForm.value;
      const period = this.calculateDateDiff(filterTodate, filterFromdate);
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  /**
   * This function calculate diff between from date and to date and returns period as : '1d/5d/1m/6m/1y/yty/2y/max 
  */
  calculateDateDiff(toDate: Date, fromDate: Date) {
    const toDateValue = toDate.valueOf();
    const fromDateValue = fromDate.valueOf();
    const days = (toDateValue !== fromDateValue) ? Math.round(Math.abs((toDateValue - fromDateValue) / 86400000)) : 1;
    let period;
    switch (true) {
      case (days <= 1):
        period = STOCK_CONST.PERIOD['1D'];
        break;
      case (days <= 5):
        period = STOCK_CONST.PERIOD['5D'];
        break;
      case (days <= 30):
        period = STOCK_CONST.PERIOD['1M'];
        break;
      case (days <= 180):
        period = STOCK_CONST.PERIOD['6M'];
        break;
      case (days <= 365):
        period = STOCK_CONST.PERIOD['1Y'];
        break;
      case (days <= 730):
        period = STOCK_CONST.PERIOD['2Y'];
        break;
      case (days > 730):
        period = STOCK_CONST.PERIOD['MAX'];
        break;
    }
    return period;

  }

}
