import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFlightsComponent } from './delete-flights.component';

describe('DeleteFlightsComponent', () => {
  let component: DeleteFlightsComponent;
  let fixture: ComponentFixture<DeleteFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
