import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  readonly API_URL = 'http://localhost:3000';

  connexionForm = this.fb.group({
    username: null,
    password: null
  });
  
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.http.post(this.API_URL + '/auth/login', this.connexionForm.value)
      .subscribe(
        (res) => {
          if (res['access_token']) {
            sessionStorage.setItem('token', res['access_token']);
            this.router.navigate(['section/Debuter']);
          }
        },
        (err) => {
          console.log(err);
        }
      );    
  }

}
