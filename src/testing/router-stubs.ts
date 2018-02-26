import { Component, Injectable } from '@angular/core';
import { NavigationExtras, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent {

}

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
}

@Injectable()
export class ActivatedRouteStub {
  private queryParamMap$ = new Subject();
  queryParamMap = this.queryParamMap$.asObservable();
  setQueryParamMap(map) {
    this.queryParamMap$.next({
      get: (key) => {
        return map[key];
      }
    });
  };

}