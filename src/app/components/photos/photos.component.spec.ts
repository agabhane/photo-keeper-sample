import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { RouterStub, ActivatedRouteStub } from "../../../testing/router-stubs";
import { MatIconStub, MatCardStub, MatCardContentStub, MatCardFooterStub, MatSnackBarStub } from "../../../testing/material-stubs";
import { PhotoServiceStub } from "../../../testing/photo-service-stubs";

import { PhotosComponent } from './photos.component';
import { PhotoService } from "../../services/photo.service";
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

describe('AlbumListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhotosComponent,
        MatCardStub,
        MatCardContentStub,
        MatCardFooterStub,
        MatIconStub
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: PhotoService, useClass: PhotoServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    this.fixture = TestBed.createComponent(PhotosComponent);
    this.component = this.fixture.componentInstance;
    this.photoService = TestBed.get(PhotoService);
    this.router = TestBed.get(Router);
    this.activeRouter = TestBed.get(ActivatedRoute);
  });

  it('should create the component', async(() => {
    spyOn(this.activeRouter, 'queryParamMap');
    spyOn(this.component, 'getPhotos');
    this.fixture.detectChanges();
    expect(this.component).toBeDefined();
    expect(this.component.photos).toEqual([]);
    expect(this.component.currentAlbumIndex).toEqual(0);
    expect(this.component.albumIds).toEqual([]);
    expect(this.component.selectedAlbumCount).toEqual(0);
  }));

  it('should call getPhotos when queryParam resolved', async(() => {
    spyOn(this.component, 'getPhotos');
    this.fixture.detectChanges();
    this.fixture.whenStable().then(() => {
      this.fixture.detectChanges();
      expect(this.component.getPhotos).toHaveBeenCalled();
      expect(this.component.albumIds).toEqual(['11', '12'])
    });
    this.activeRouter.setQueryParamMap({
      albumId: "11,12"
    });

  }));

  it('should start timer when album id count is 2', async(() => {
    spyOn(this.component, 'getPhotos');
    spyOn(this.component, 'startTimer');
    this.fixture.detectChanges();
    this.fixture.whenStable().then(() => {
      this.fixture.detectChanges();
      expect(this.component.getPhotos).toHaveBeenCalled();
      expect(this.component.albumIds).toEqual(['11', '12']);
      expect(this.component.startTimer).toHaveBeenCalled();
    });
    this.activeRouter.setQueryParamMap({
      albumId: "11,12"
    });

  }));

  it('should not start timer when album id count is less than 2', async(() => {
    spyOn(this.component, 'getPhotos');
    spyOn(this.component, 'startTimer');
    this.fixture.detectChanges();
    this.fixture.whenStable().then(() => {
      this.fixture.detectChanges();
      expect(this.component.getPhotos).toHaveBeenCalled();
      expect(this.component.albumIds).toEqual(['11']);
      expect(this.component.startTimer).not.toHaveBeenCalled();
    });
    this.activeRouter.setQueryParamMap({
      albumId: "11"
    });

  }));

  it('should get photos when getPhotos called', async(() => {
    this.component.albumIds = ['1'];
    this.component.getPhotos();
    let photos = [{
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "http://placehold.it/600/92c952",
      "thumbnailUrl": "http://placehold.it/150/92c952"
    }];
    this.fixture.whenStable().then(() => {
      this.fixture.detectChanges();
      expect(this.component.photos[0]).toEqual(photos);
    });
    this.photoService.photosSubject.next(photos);
  }));
 
});
