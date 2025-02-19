 import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }
  login(body: any) {
    // email = dummy@dashboard.com
    // password = dashboard123
    if(body.email == 'dummy@dashboard.com' && body.password == 'dashboard123') {
      localStorage.setItem('userStep', 'loggedIn');
      this._router.navigate(['/manage'])
      return true;
    } else {
      return false;
    }
  }

  ifLoggedIn():boolean{
    return Boolean(localStorage.getItem('userStep'));
  }

  // remove user from local storage to log user out
  logout() {
    localStorage.clear();
    this._router.navigate(['/'])
  }
}
