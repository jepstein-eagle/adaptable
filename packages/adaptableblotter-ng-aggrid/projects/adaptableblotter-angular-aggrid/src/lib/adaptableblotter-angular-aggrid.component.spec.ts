import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptableblotterAngularAggridComponent } from './adaptableblotter-angular-aggrid.component';

describe('AdaptableblotterAngularAggridComponent', () => {
  let component: AdaptableblotterAngularAggridComponent;
  let fixture: ComponentFixture<AdaptableblotterAngularAggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdaptableblotterAngularAggridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptableblotterAngularAggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
