import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { Album } from "../app/models/album";

export class AlbumServiceStub {
  albumListSubject = new Subject<Album[]>();
  
  getUserAlbums(): Observable<Album[]> {
    return this.albumListSubject.asObservable();
  }
} 