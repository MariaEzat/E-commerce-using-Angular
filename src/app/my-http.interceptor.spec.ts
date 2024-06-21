import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { myHttpInterceptor } from './my-http.interceptor';

describe('MyHttpInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: myHttpInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a token to the headers if token is present in localStorage', () => {
    localStorage.setItem('eToken', 'test-token');

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('token')).toBeTrue();
    expect(req.request.headers.get('token')).toBe('test-token');

    localStorage.removeItem('eToken');
  });

  it('should not add a token to the headers if token is not present in localStorage', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('token')).toBeFalse();
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(HTTP_INTERCEPTORS).find(interceptor => interceptor instanceof myHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
