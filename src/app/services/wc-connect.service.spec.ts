import { TestBed } from '@angular/core/testing';

import { WcConnectService } from './wc-connect.service';

describe('WcConnectService', () => {
  let service: WcConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WcConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
