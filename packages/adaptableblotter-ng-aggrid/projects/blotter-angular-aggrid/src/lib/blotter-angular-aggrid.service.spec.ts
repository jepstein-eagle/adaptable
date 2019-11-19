import { TestBed } from '@angular/core/testing';

import { BlotterAngularAggridService } from './blotter-angular-aggrid.service';

describe('BlotterAngularAggridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlotterAngularAggridService = TestBed.get(
      BlotterAngularAggridService
    );
    expect(service).toBeTruthy();
  });
});
