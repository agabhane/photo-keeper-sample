import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { RouterStub, ActivatedRouteStub } from "../../../testing/router-stubs";
import { MatIconStub, MatCardStub, MatCardContentStub, MatCardFooterStub, MatSnackBarStub } from "../../../testing/material-stubs";
import { AlbumServiceStub } from "../../../testing/album-service-stubs";

import { AlbumListComponent } from './album-list.component';
import { AlbumService } from "../../services/album.service";
import { By } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs/Subject';

describe('AlbumListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlbumListComponent,
        MatCardStub,
        MatCardContentStub,
        MatCardFooterStub,
        MatIconStub
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AlbumService, useClass: AlbumServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    this.fixture = TestBed.createComponent(AlbumListComponent);
    this.component = this.fixture.componentInstance;
    this.AlbumService = TestBed.get(AlbumService);
    this.router = TestBed.get(Router);
    this.MatSnackBar = TestBed.get(MatSnackBar);
    this.activeRouter = TestBed.get(ActivatedRoute);
  });

  it('should create the component', async(() => {
    spyOn(this.activeRouter, 'queryParamMap');
    spyOn(this.component, 'getAlbums');
    this.fixture.detectChanges();
    expect(this.component).toBeDefined();
    expect(this.component.selectedAlbumCount).toEqual(0);

  }));

  it('should call getAlbums when queryParam resolved', async(() => {
    spyOn(this.component, 'getAlbums');
    this.fixture.detectChanges();
    this.fixture.whenStable().then(() => {
      this.fixture.detectChanges();
      expect(this.component.getAlbums).toHaveBeenCalledWith(11);
    });
    this.activeRouter.setQueryParamMap({
      userId: 11
    });

  }));

  it('should get album list when getAlbums called', async(() => {
    this.component.getAlbums();
    let albums = [{
      "userId": 3,
      "id": 21,
      "title": "repudiandae voluptatem optio est consequatur rem in temporibus et"
    }];
    this.fixture.whenStable().then(() => {
      this.fixture.detectChanges();
      expect(this.component.albums).toEqual(albums);
    });
    this.AlbumService.albumListSubject.next(albums);
  }));

  describe('selectAlbum', () => {
    it('should select album when selected album count in less than 2', () => {
      this.component.selectedAlbumCount = 0;
      let album = {
        id: 1,
        title: 'some album title',
        selected: false
      }
      this.component.selectAlbum(album);
      expect(this.component.selectedAlbumCount).toEqual(1);
      expect(album.selected).toBeTruthy();
    });

    it('should show toast message when selected album count in greated than 2', () => {
      this.component.selectedAlbumCount = 2;
      let album = {
        id: 1,
        title: 'some album title',
        selected: false
      };
      spyOn(this.MatSnackBar, 'open');
      this.component.selectAlbum(album);
      expect(this.component.selectedAlbumCount).toEqual(2);
      expect(album.selected).toBeFalsy();
      expect(this.MatSnackBar.open).toHaveBeenCalledWith('Maximum two albums can be selected.', null, {
        duration: 1000
      });

    });

    it('should deselect album when already selected', () => {
      this.component.selectedAlbumCount = 2;
      let album = {
        id: 1,
        title: 'some album title',
        selected: true
      };
      this.component.selectAlbum(album);
      expect(this.component.selectedAlbumCount).toEqual(1);
      expect(album.selected).toBeFalsy();

    });

  });

  it('should goto photos page', () => {
    this.component.albums = [{
      "userId": 3,
      "id": 21,
      "title": "repudiandae voluptatem optio est consequatur rem in temporibus et",
      "selected": true
    },
    {
      "userId": 3,
      "id": 22,
      "title": "et rem non provident vel ut",
      "selected": true
    },
    {
      "userId": 3,
      "id": 23,
      "title": "incidunt quisquam hic adipisci sequi",
      "selected": false
    }];
    spyOn(this.router, 'navigate');
    this.component.gotoPhotos();
    expect(this.router.navigate).toHaveBeenCalledWith(['/photos'], {
      queryParams: {
        albumId: '21,22'
      }
    });
  });
});
