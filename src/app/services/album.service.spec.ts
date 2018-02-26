import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AlbumService } from "./album.service";
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

describe('AlbumService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let albumService: AlbumService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AlbumService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    albumService = TestBed.get(AlbumService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return expected albums', () => {
    let expAlbums = [{
      "userId": 3,
      "id": 21,
      "title": "repudiandae voluptatem optio est consequatur rem in temporibus et"
    },
    {
      "userId": 3,
      "id": 22,
      "title": "et rem non provident vel ut"
    }];
    albumService.getUserAlbums(1).subscribe((albums) => {
      expect(albums).toEqual(expAlbums);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/albums?userId=1');
    expect(req.request.method).toEqual('GET');
    req.flush(expAlbums);
  });

  it('should return no users when request fails', () => {
    albumService.getUserAlbums(1).subscribe((albums) => {
      expect(albums).toBeUndefined();
    }, (error)=>{
      expect(error).toBeDefined();
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/albums?userId=1');
    req.flush('404', {status: 404, statusText: 'Not Found'});
  });

});