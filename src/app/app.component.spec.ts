import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutletStubComponent } from "../testing/router-stubs";

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

const appRoutes: Routes = [
  { path: 'users'}
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    this.fixture = TestBed.createComponent(AppComponent);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(this.component).toBeDefined();
    expect(this.component.title).toEqual('Photo Keeper');
    let de = this.fixture.debugElement.query(By.css('header .wrapper'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Photo Keeper');
  });
});
