import { TestBed } from '@angular/core/testing';

import { Urlnterceptor } from './urlnterceptor.interceptor';

describe('UrlnterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Urlnterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Urlnterceptor = TestBed.inject(Urlnterceptor);
    expect(interceptor).toBeTruthy();
  });
});
