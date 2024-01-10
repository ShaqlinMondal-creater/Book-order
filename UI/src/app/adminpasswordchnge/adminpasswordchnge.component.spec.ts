import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpasswordchngeComponent } from './adminpasswordchnge.component';

describe('AdminpasswordchngeComponent', () => {
  let component: AdminpasswordchngeComponent;
  let fixture: ComponentFixture<AdminpasswordchngeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpasswordchngeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpasswordchngeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
