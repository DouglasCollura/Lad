import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMarketComponent } from './admin-market.component';

describe('AdminMarketComponent', () => {
  let component: AdminMarketComponent;
  let fixture: ComponentFixture<AdminMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
