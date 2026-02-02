import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOffer } from './counter-offer';

describe('CounterOffer', () => {
  let component: CounterOffer;
  let fixture: ComponentFixture<CounterOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterOffer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
