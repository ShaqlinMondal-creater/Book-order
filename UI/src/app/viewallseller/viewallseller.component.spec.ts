import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallsellerComponent } from './viewallseller.component';

describe('ViewallsellerComponent', () => {
  let component: ViewallsellerComponent;
  let fixture: ComponentFixture<ViewallsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallsellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewallsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
