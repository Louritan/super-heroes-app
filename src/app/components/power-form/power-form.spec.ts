import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerForm } from './power-form';

describe('PowerForm', () => {
  let component: PowerForm;
  let fixture: ComponentFixture<PowerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
