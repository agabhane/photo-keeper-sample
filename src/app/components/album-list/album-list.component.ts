import { Component, OnInit } from '@angular/core';
import { Album } from "../../models/album";
import { AlbumService } from "../../services/album.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import 'rxjs/add/operator/switchMap';
import { Observable, ObservableInput } from 'rxjs/Observable';

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.less']
})
export class AlbumListComponent implements OnInit {
  albums: Array<Album>;
  selectedAlbumCount: number = 0;
  constructor(private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.getAlbums(params.get('userId'));
    });
  }
  
  getAlbums(userId) {
    this.albumService.getUserAlbums(userId).subscribe((albums) => {
      this.albums = albums;
    })
  }

  selectAlbum(album: Album) {
    if (!album.selected) {
      if (this.selectedAlbumCount < 2) {
        album.selected = !album.selected;
        this.selectedAlbumCount++;
      } else {
        this.snackBar.open('Maximum two albums can be selected.', null, {
          duration: 1000
        });
      }
    } else {
      album.selected = !album.selected;
      this.selectedAlbumCount--;
    }
  }

  gotoPhotos() {
    let selectedAlbums = [];
    selectedAlbums = this.albums.filter((album)=>{
      return album.selected;
    });
    selectedAlbums = selectedAlbums.map((album)=>{
      return album.id;
    });
    this.router.navigate(['/photos'], {
      queryParams: {
        albumId: selectedAlbums.join(',')
      }
    });
  }
}