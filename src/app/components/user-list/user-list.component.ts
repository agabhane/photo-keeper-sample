import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../../services/user.service";
import { User } from '../../models/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  userList = [];
  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers()
      .subscribe((users: Array<User>) => {
        this.userList = users;
      });
  }

  gotoAlbums(id) {
    this.router.navigate(['/albums'], {
      queryParams: {
        userId: id
      }
    });
  }
}