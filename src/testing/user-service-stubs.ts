import { Observable } from "rxjs/Observable";
import { UserService } from "../app/services/user.service";
import { User } from "../app/models/user";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Subject";

export class UserServiceStub {
  userListSubject = new Subject<User[]>();
  
  getUsers(): Observable<User[]> {
    return this.userListSubject.asObservable();
  }
} 