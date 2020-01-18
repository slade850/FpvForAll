import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  messages: any;
  msgForm = this.fb.group({
    sendTo: null,
    subject: null,
    content: null
  });
  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    //Recup Profil
    this.api.readProfil().
    subscribe(result => this.user = result);
    //Recup Message
    this.api.readData('/user/Message').
    subscribe(res => this.messages = res);
  }

  onSubmit(){
      console.log(this.msgForm.value)
      this.api.postData('/user/Message', this.msgForm.value, "message envoyé", "une erreur c'est produite");
  }
}
