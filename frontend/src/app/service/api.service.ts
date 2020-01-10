import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

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

  postData(item, value){
    this.http.post(this.API_URL + item, value)
    .subscribe(
      (res) => {
        if (res) {
          return res;
        }
      },
      (err) => {
        console.log(err);
      }
    ); 
  }
}
