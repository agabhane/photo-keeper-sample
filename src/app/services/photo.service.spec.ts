import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PhotoService } from "./photo.service";
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

describe('PhotoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let photoService: PhotoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PhotoService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    photoService = TestBed.get(PhotoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return expected photos', () => {
    let expectedPhotos = [{
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "http://placehold.it/600/92c952",
      "thumbnailUrl": "http://placehold.it/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "http://placehold.it/600/771796",
      "thumbnailUrl": "http://placehold.it/150/771796"
    }];
    photoService.getPhotos(1).subscribe((photos) => {
      expect(photos).toEqual(expectedPhotos);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/photos?albumId=1');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedPhotos);
  });

  it('should return no photos when request fails', () => {
    photoService.getPhotos(1).subscribe((photos) => {
      expect(photos).toBeUndefined();
    }, (error) => {
      expect(error).toBeDefined();
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/photos?albumId=1');
    req.flush('404', { status: 404, statusText: 'Not Found' });
  });

});