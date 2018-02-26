import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { Photo } from "../app/models/photo";

export class PhotoServiceStub {
  photosSubject = new Subject<Photo[]>();
  
  getPhotos(): Observable<Photo[]> {
    return this.photosSubject.asObservable();
  }
} 