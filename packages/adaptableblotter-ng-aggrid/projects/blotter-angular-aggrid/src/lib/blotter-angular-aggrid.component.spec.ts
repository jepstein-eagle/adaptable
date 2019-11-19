import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlotterAngularAggridComponent } from './blotter-angular-aggrid.component';

describe('BlotterAngularAggridComponent', () => {
  let component: BlotterAngularAggridComponent;
  let fixture: ComponentFixture<BlotterAngularAggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlotterAngularAggridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlotterAngularAggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
