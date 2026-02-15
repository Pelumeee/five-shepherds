import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCard } from './inventory-card';

describe('InventoryCard', () => {
  let component: InventoryCard;
  let fixture: ComponentFixture<InventoryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
