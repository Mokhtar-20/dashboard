import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _route: Router){}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(!this._authService.ifLoggedIn()){
          return true
        }else{
          this._route.navigate(['/manage'])
          return false;
        }
    }
    
  }