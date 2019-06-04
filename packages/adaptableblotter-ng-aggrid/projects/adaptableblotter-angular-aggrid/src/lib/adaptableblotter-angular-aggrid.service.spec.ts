import { TestBed } from '@angular/core/testing';

import { AdaptableblotterAngularAggridService } from './adaptableblotter-angular-aggrid.service';

describe('AdaptableblotterAngularAggridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdaptableblotterAngularAggridService = TestBed.get(
      AdaptableblotterAngularAggridService
    );
    expect(service).toBeTruthy();
  });
});
