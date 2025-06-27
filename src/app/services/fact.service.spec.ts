import { TestBed } from '@angular/core/testing';
import { FactService, Response } from './fact.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('FactService', () => {
  let service: FactService;
  let httpMock: HttpTestingController;
  const apiURL = 'https://catfact.ninja/fact';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FactService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a fact via GET', () => {
    const mockResponse: Response = { fact: 'Cats are great!', length: 16 };

    service.getFact().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should propagate an error response', () => {
    service.getFact().subscribe({
      next: () => fail('expected an error'),
      error: err => expect(err.status).toBe(500)
    });

    const req = httpMock.expectOne(apiURL);
    req.flush('Error 500', { status: 500, statusText: 'Server Error' });
  });
});
