import { Component, OnInit } from '@angular/core';
import { Photo } from "../../models/photo";
import { PhotoService } from "../../services/photo.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable, ObservableInput } from 'rxjs/Observable';

const time: number = 20000;

@Component({
  selector: 'photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.less']
})
export class PhotosComponent implements OnInit {
  photos: Array<Photo[]> = [];
  currentAlbumIndex: number = 0;
  albumIds = [];
  selectedAlbumCount: number = 0;
  constructor(private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        this.albumIds = params.get('albumId').split(',');
        this.getPhotos();

        if (this.albumIds.length > 1) {
          setInterval(() => {
            this.currentAlbumIndex = +!this.currentAlbumIndex;
          }, time);
        }

      });
  }

  getPhotos() {
    this.albumIds.forEach((albumId, index) => {
      this.photoService.getPhotos(albumId)
        .subscribe((photos) => {
          this.photos[index] = photos;
        });
    });
  }

}