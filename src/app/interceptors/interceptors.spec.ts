import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiDomainInterceptor } from './api-domain.interceptor';
import { ApiVersionInterceptor } from './api-version.interceptor';
import { ApiKeyInterceptor } from './api-key.interceptor';

describe(`HTTP interceptors`, () => {

  let httpTestingController: HttpTestingController;
  let client: HttpClient;
  const [testApiDomain, testApiVersion, testApiKey] = ['http://someapidomain/${version}' , 'v3.1.0', 'MY_API_KEY'];

  describe('ApiDomainInterceptor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [   
          { provide: 'API_DOMAIN', useValue: testApiDomain},
          { provide: HTTP_INTERCEPTORS, useClass: ApiDomainInterceptor, multi: true}
        ],
      });
      
      httpTestingController = TestBed.inject(HttpTestingController);
      client = TestBed.inject(HttpClient);
    });

    it('should preppend api domain to relative url requests', () => {
      
      client.get('/some/resource').subscribe(res => {});
  
      const {request} = httpTestingController.expectOne(() => true);
  
      expect(request.url).toContain(testApiDomain);
    });
  
    it('should make no changes to direct requests', () => {
  
      client.get('https://another-external-api/some/resource').subscribe(res => {});
  
      const {request} = httpTestingController.expectOne(() => true);
  
      expect(request.url).not.toContain(testApiDomain);
    });
  });

  describe('ApiVersionInterceptor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [   
          { provide: 'API_VERSION', useValue: testApiVersion},
          { provide: HTTP_INTERCEPTORS, useClass: ApiVersionInterceptor, multi: true}
        ],
      });
      
      httpTestingController = TestBed.inject(HttpTestingController);
      client = TestBed.inject(HttpClient);
    });

    it('should interpolate version to url', () => {
      
      client.get(`${testApiDomain}/some/resource`).subscribe(res => {});

      const {request} = httpTestingController.expectOne(() => true);

      expect(request.url).toContain(testApiVersion);
    });
  });

  describe('ApiKeyInterceptor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [   
          { provide: 'API_KEY', useValue: testApiKey},
          { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true}
        ],
      });
      
      httpTestingController = TestBed.inject(HttpTestingController);
      client = TestBed.inject(HttpClient);
    });

    it('should include api key header', () => {
      
      client.get('/').subscribe(res => {});

      const {request} = httpTestingController.expectOne(() => true);

      expect(request.headers.get('X-Api-Key')).toEqual(testApiKey);
    });
  });
});