import { TestBed } from '@angular/core/testing';

import { HairdressingSalonService } from './hairdressing-salon.service';

describe('HairdressingSalonService', () => {
  let service: HairdressingSalonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HairdressingSalonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
