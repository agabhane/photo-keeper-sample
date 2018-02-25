import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Photo } from "../models/photo";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operator/map";

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) {

  }

  getPhotos(albumId): Observable<Array<Photo>> {
    return this.http.get<Array<Photo>>('https://jsonplaceholder.typicode.com/photos', {
      params: {
        albumId: albumId
      }
    });
  }
}