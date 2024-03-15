import { TestBed } from '@angular/core/testing';

import { MyApiClientInterceptor } from './my-api-client.interceptor';

describe('MyApiClientInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyApiClientInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MyApiClientInterceptor = TestBed.inject(MyApiClientInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
