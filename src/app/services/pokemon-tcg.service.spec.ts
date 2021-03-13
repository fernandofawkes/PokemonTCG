import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { PokemonTCGService } from './pokemon-tcg.service';

describe('PokemonTCGService', () => {
  let service: PokemonTCGService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [PokemonTCGService]
    });

    // Inject the http service and test controller for each test
    service = TestBed.inject(PokemonTCGService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  const mockResponse = [{name: 'Charizard'}, {name: 'Blastoise'}];
  
  describe('getCards', () => {
    it('should call api resource once and return data', () => {
      
      service.getCards().subscribe(res => {
        expect(res).toEqual(mockResponse);
      });
      const req = httpTestingController.expectOne('/cards?');

      req.flush(mockResponse);
    });

    it('should accept a query parameter', () => {
        const query = 'q=supertype:pokemon types:dragon';
        
        service.getCards(query).subscribe(res => {});

        const req = httpTestingController.expectOne('/cards?' + query);

        req.flush(mockResponse);

        expect(req.request.urlWithParams).toEqual('/cards?' + query);
    }); 
  });

  
  describe('getCard', () => {
    it('should call api resource once and return data', () => {
      const cardId = 'xyz-123';
      service.getCard(cardId).subscribe(res => {
        expect(res).toEqual(mockResponse);
      });
      const req = httpTestingController.expectOne(`/cards/${cardId}`);

      req.flush(mockResponse);
    });

    it('should error if id is missing', () => {
      
      service.getCard('').subscribe(
        data => fail('should\'t reach here'),
        (err) => { expect(err.message).toBe('no id parameter provided') }
      );
      
      httpTestingController.expectNone('/cards/');
    });
  });
});
