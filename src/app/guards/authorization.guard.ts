/*
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthorizationGuard {
  constructor(private authService:AuthService,private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult>
  {
    if(this.authService.isAuthenticated){
      let requiredRoles = route.data["roles"];
      let userRole : string = this.authService.role;
      for (let role of userRole) {
        if (requiredRoles.includes(role)) {
          return true;
        }
      }
      return false;
    }
    else{
      this.router.navigateByUrl("/login")
      return false
    }
  }

}

*/
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' // Assurez-vous que le garde est fourni au niveau de l'application
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated) {
      const requiredRoles = route.data["role"];
      const userRole = this.authService.role;
      if (Array.isArray(requiredRoles) && requiredRoles.includes(userRole)) {
        return true;
      } else {
        this.router.navigateByUrl("/access-denied");
        return false;
      }
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
