import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptableblotterAgGridComponent } from './adaptableblotter-aggrid.component';

describe('AdaptableblotterAgGridComponent', () => {
  let component: AdaptableblotterAgGridComponent;
  let fixture: ComponentFixture<AdaptableblotterAgGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptableblotterAgGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptableblotterAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
