import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  readonly API_URL = 'http://localhost:3000';
  hide = true;
  connexionForm = this.fb.group({
    username: null,
    password: null
  });
  
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signIn() {
    this.http.post(this.API_URL + '/auth/login', this.connexionForm.value)
      .subscribe(
        (res) => {
          if (res['access_token']) {
            sessionStorage.setItem('token', res['access_token']);
            this.router.navigate(['dashboard']);
          }
        },
        (err) => {
          this._snackBar.open("identifiant ou mot de passe invalide", 'ok', { panelClass: ['mat-error'] })
        }
      );    
  }

}
