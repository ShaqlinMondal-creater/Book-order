import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallorderComponent } from './viewallorder.component';

describe('ViewallorderComponent', () => {
  let component: ViewallorderComponent;
  let fixture: ComponentFixture<ViewallorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewallorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
