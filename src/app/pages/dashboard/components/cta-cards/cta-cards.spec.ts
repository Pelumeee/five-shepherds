import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaCards } from './cta-cards';

describe('CtaCards', () => {
  let component: CtaCards;
  let fixture: ComponentFixture<CtaCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
