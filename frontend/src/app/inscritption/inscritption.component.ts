import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscritption',
  templateUrl: './inscritption.component.html',
  styleUrls: ['./inscritption.component.scss']
})
export class InscritptionComponent {

  readonly API_URL = 'http://localhost:3000';

  inscriptionForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [null, Validators.required],
    email: [null, Validators.required],
    hash: [null, Validators.required],
    hash2: [null, Validators.required]
  });

  successMessage: string;
  errorMessage: any;
  

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    this.http.post(this.API_URL + '/user', this.inscriptionForm.value)
      .subscribe(
        (res) => {
            this.successMessage = "Enregistrement réussit"
          },
        (err) => {
          console.log(err);
          //this.errorMessage(...err.error);
        }
      );    
  }
}
