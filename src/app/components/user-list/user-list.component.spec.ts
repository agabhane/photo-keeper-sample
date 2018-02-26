import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterStub } from "../../../testing/router-stubs";
import { MatIconStub, MatListItemStub, MatListStub } from "../../../testing/material-stubs";
import { UserServiceStub } from "../../../testing/user-service-stubs";

import { UserListComponent } from './user-list.component';
import { UserService } from "../../services/user.service";
import { By } from '@angular/platform-browser';

const appRoutes: Routes = [
  { path: 'users' }
];

describe('UserListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserListComponent,
        MatIconStub,
        MatListItemStub,
        MatListStub
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: UserService, useClass: UserServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    this.fixture = TestBed.createComponent(UserListComponent);
    this.component = this.fixture.componentInstance;
    this.userService = TestBed.get(UserService);
    this.router = TestBed.get(Router);
  });

  it('should create the userlist component and initialize', () => {
    this.fixture.detectChanges();
    expect(this.component).toBeDefined();
    expect(this.component.userList).toEqual([]);
  });

  it('should call getUserList when component initialized', () => {
    spyOn(this.component, 'getUserList');
    this.fixture.detectChanges();
    expect(this.component.getUserList).toHaveBeenCalled();
  });

  it('should get user list when getUserList called', async(() => {
    this.component.getUserList();
    let userList = [{
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }];
    this.fixture.whenStable().then(() => {
      this.fixture.detectChanges();
      expect(this.component.userList).toEqual(userList);
    });
    this.userService.userListSubject.next(userList);
  }));

  it('should route to albums page when gotoAlbums called', () => {
    spyOn(this.router, 'navigate');
    this.component.gotoAlbums(11);
    expect(this.router.navigate).toHaveBeenCalledWith(['/albums'], {
      queryParams: {
        userId: 11
      }
    });
  });
});
