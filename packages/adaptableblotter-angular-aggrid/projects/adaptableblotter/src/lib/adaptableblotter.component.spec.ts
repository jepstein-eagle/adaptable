import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptableBlotterComponent } from './adaptableblotter.component';

describe('AdaptableBlotterComponent', () => {
  let component: AdaptableBlotterComponent;
  let fixture: ComponentFixture<AdaptableBlotterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdaptableBlotterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptableBlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
