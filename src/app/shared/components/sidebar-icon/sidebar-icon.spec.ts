import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarIcon } from './sidebar-icon';

describe('SidebarIcon', () => {
  let component: SidebarIcon;
  let fixture: ComponentFixture<SidebarIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
