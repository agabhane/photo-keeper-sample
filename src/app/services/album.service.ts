import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Album } from "../models/album";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operator/map";

@Injectable()
export class AlbumService {
  constructor(private http: HttpClient) {

  }

  getUserAlbums(userId): Observable<Array<Album>> {
    return this.http.get<Array<Album>>('https://jsonplaceholder.typicode.com/albums', {
      params: {
        userId: userId
      }
    });
  }
}