import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  

  constructor(private api: ApiService, private router: Router) { }
  
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(res => {
      this.api.checkAuth().subscribe(
          (active ) => {
              if (active) {
                  res(true);
              } else {
                  this.router.navigate(['connexion']);
                  this.api.removeItem('token');
                  res(false);
              }
          },
          (error) => {
              this.router.navigate(['connexion']);
              this.api.removeItem('token');
              res(false);
          }
      );
  });
}
}
