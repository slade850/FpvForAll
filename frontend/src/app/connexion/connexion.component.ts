import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { config } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  hide = true;
  connexionForm = this.fb.group({
    username: null,
    password: null
  });
  
  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signIn() {
    this.api.logIn(this.connexionForm.value);   
  }

}
