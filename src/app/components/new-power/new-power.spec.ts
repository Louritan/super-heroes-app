import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPower } from './new-power';

describe('NewPower', () => {
  let component: NewPower;
  let fixture: ComponentFixture<NewPower>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPower);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
