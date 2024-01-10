import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerpassqordchngComponent } from './sellerpassqordchng.component';

describe('SellerpassqordchngComponent', () => {
  let component: SellerpassqordchngComponent;
  let fixture: ComponentFixture<SellerpassqordchngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerpassqordchngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerpassqordchngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
