import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StocksComponent } from './stocks.component';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule } from '@angular/material';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let facadeService: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedUiChartModule,
        StoreModule.forRoot({})
      ],
      providers: [PriceQueryFacade],
      declarations: [StocksComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    facadeService = TestBed.get(PriceQueryFacade);
    component.ngOnInit();
  });

  it('should create stocks component', () => {
    expect(component).toBeTruthy();
    expect(facadeService instanceof PriceQueryFacade).toBeTruthy();
  });

  describe('fetchQuote()', () => {
    let priceQuerySpy;

    beforeEach(() => {
      priceQuerySpy = jest.spyOn(facadeService, 'fetchQuote');
    });

    it('should not call fetchQuote function when stockPickerForm is invalid', () => {
      component.fetchQuote();

      expect(component.stockPickerForm.valid).toBeFalsy();
      expect(priceQuerySpy).not.toBeCalled();
    });

    it('should call fetchQuote function when stockPickerForm is valid', () => {
      component.stockPickerForm.controls['symbol'].setValue('FB');
      component.stockPickerForm.controls['filterFromdate'].setValue(new Date('11/12/2019'));
      component.stockPickerForm.controls['filterTodate'].setValue(new Date('11/14/2019'));

      component.fetchQuote();

      expect(component.stockPickerForm.valid).toBeTruthy();
      expect(priceQuerySpy).toBeCalled();
    });

  });

  describe('StocksComponent()', () => {

    it('should return period as 1d when todate and fromdate difference is less than or equals to 1 day', () => {
      const todate = new Date('11/14/2019');
      const fromdate = new Date('11/14/2019');

      const result = component.calculateDateDiff(todate, fromdate);

      expect(result).toEqual('1d');
    });

    it('should return period as 5d when todate and fromdate difference is less than or equals to 5 days', () => {
      const todate = new Date('11/14/2019');
      const fromdate = new Date('11/12/2019');

      const result = component.calculateDateDiff(todate, fromdate);

      expect(result).toEqual('5d');
    });

    it('should return period as 1m when todate and fromdate difference is less than or equals to 30 days', () => {
      const todate = new Date('11/24/2019');
      const fromdate = new Date('11/09/2019');

      const result = component.calculateDateDiff(todate, fromdate);

      expect(result).toEqual('1m');
    });

    it('should return period as 6m when todate and fromdate difference is less than or equals to 180 days', () => {
      const todate = new Date('11/14/2019');
      const fromdate = new Date('10/09/2019');

      const result = component.calculateDateDiff(todate, fromdate);

      expect(result).toEqual('6m');
    });

    it('should return period as 1y when todate and fromdate difference is less than or equals to 365 days', () => {
      const todate = new Date('11/14/2019');
      const fromdate = new Date('11/14/2018');

      const result = component.calculateDateDiff(todate, fromdate);

      expect(result).toEqual('1y');
    });

    it('should return period as 2y when todate and fromdate difference is less than or equals to 730 days', () => {
      const todate = new Date('11/14/2019');
      const fromdate = new Date('03/09/2018');

      const result = component.calculateDateDiff(todate, fromdate);

      expect(result).toEqual('2y');
    });

    it('should return period as max when todate and fromdate difference is greater than 730 days', () => {
      const todate = new Date('11/14/2019');
      const fromdate = new Date('11/09/2015');

      const result = component.calculateDateDiff(todate, fromdate);

      expect(result).toEqual('max');
    });

  });

});
