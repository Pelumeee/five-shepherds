import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardsIcon } from './summary-cards-icon';

describe('SummaryCardsIcon', () => {
  let component: SummaryCardsIcon;
  let fixture: ComponentFixture<SummaryCardsIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardsIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCardsIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
