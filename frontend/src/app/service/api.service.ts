import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  checkAuth(){
    this.http.get(this.API_URL + '/auth')
    .subscribe(
      (res) => {
        if (res === true) {
          return true;
        }
      },
      (err) => {
        sessionStorage.removeItem('token')
        console.log(err);
      }
    );    
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
        this._snackBar.open(popError, null, {panelClass: ['mat-warn']})
      }
    ); 
  }
}
