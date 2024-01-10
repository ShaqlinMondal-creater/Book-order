import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersviewbysellerComponent } from './ordersviewbyseller.component';

describe('OrdersviewbysellerComponent', () => {
  let component: OrdersviewbysellerComponent;
  let fixture: ComponentFixture<OrdersviewbysellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersviewbysellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersviewbysellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
