import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  readonly API_URL = 'http://localhost:3000';

  private storageSub = new Subject<String>();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  checkAuth(){
    return this.http.get<any>(this.API_URL + '/auth')
  }

  readData(item) {
    return this.http.get<any []>(this.API_URL + item)
  }

  readProfil() {
    return this.http.get<any>(this.API_URL + '/auth/profile')
  }

  postData(item, value, popSuccess, popError){
    this.http.post(this.API_URL + item, value)
    .subscribe(
      (res) => {
        this._snackBar.open(popSuccess);
        return res;
      },
      (err) => {
        this._snackBar.open(popError);
      }
    ); 
  }

  pathData(item, value, popSuccess, popError){
    this.http.patch(this.API_URL + item, value)
    .subscribe(
      (res) => {
        this._snackBar.open(popSuccess);
        return res;
      },
      (err) => {
        this._snackBar.open(popError);
      }
    ); 
  }

  deletData(item, popSuccess, popError){
    this.http.delete(this.API_URL + item)
    .subscribe(
      (res) => {
        this._snackBar.open(popSuccess);
        return res;
      },
      (err) => {
        this._snackBar.open(popError);
      }
    ); 
  }

  logIn(logVal){
    this.http.post(this.API_URL + '/auth/login', logVal)
      .subscribe(
        (res) => {
          if (res['access_token']) {
            this.setItem('token', res['access_token']);
            this.router.navigate(['dashboard']);
          }
        },
        (err) => {
          this._snackBar.open("identifiant ou mot de passe invalide", 'ok', { panelClass: ['mat-warn'] })
        }
      ); 
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    sessionStorage.setItem(key, data);
    this.storageSub.next('changed');
  }

  removeItem(key) {
    sessionStorage.removeItem(key);
    this.storageSub.next('changed');
  }
}
