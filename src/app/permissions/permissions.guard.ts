import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.verifyToken()){
      return true;
    }else{
      return false;
    }
    
  }
  
  verifyToken() : boolean{
    var token = localStorage.getItem('token');
    if(token != null && token != ""){
      return true;
    }else{
      return false;
    }
  }
}
