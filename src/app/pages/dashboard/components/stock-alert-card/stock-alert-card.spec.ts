import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAlertCard } from './stock-alert-card';

describe('StockAlertCard', () => {
  let component: StockAlertCard;
  let fixture: ComponentFixture<StockAlertCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAlertCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAlertCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
