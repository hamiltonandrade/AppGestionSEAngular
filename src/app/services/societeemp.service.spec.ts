import { TestBed } from '@angular/core/testing';

import { SocieteempService } from './societeemp.service';

describe('SocieteempService', () => {
  let service: SocieteempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocieteempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
