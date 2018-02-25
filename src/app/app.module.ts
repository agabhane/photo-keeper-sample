import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { UserListComponent } from "./components/user-list/user-list.component";
import { AlbumListComponent } from "./components/album-list/album-list.component";
import { PhotosComponent } from "./components/photos/photos.component";

import { UserService } from "./services/user.service";
import { AlbumService } from "./services/album.service";
import { PhotoService } from "./services/photo.service";

const appRoutes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'albums', component: AlbumListComponent },
  { path: 'photos', component: PhotosComponent},
  { path: '', pathMatch: 'full', redirectTo: '/users' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AlbumListComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  entryComponents: [
    UserListComponent,
    AlbumListComponent,
    PhotosComponent
  ],
  providers: [
    UserService,
    HttpClient,
    AlbumService,
    PhotoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
