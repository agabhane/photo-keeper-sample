import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operator/map";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>('https://jsonplaceholder.typicode.com/users');
  }
}