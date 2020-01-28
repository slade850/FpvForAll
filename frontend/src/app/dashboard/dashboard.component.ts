import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedFile: File;
  formData = new FormData();
  changeAvatar: boolean = false;
  user: any;
  messages: any;
  uploadForm: FormGroup;
  msgForm = this.fb.group({
    sendTo: null,
    subject: null,
    content: null
  });
  constructor(private api: ApiService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    //Recup Profil
    this.api.readProfil().
    subscribe(result => this.user = result);
    //Recup Message
    this.api.readData('/user/Message').
    subscribe(res => this.messages = res);

    this.uploadForm = this.fb.group({
      image: ['']
    });
  }

  onSubmit(){
      console.log(this.msgForm.value)
      this.api.postData('/user/Message', this.msgForm.value, "message envoyé", "une erreur c'est produite");
      this.api.readData('/user/Message').
      subscribe(res => this.messages = res);
  }

  deletMessage(id){
      this.api.deletData(`/user/Message/${id}`, "message supprimer", "une erreur c'est produite");
      this.ngOnInit();
  }

  avatarChange(){
    this.changeAvatar === false ? this.changeAvatar = true : this.changeAvatar = false;
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
      this.formData.append('image', this.uploadForm.get('image').value);
    }
  }

  onUpload() {
      this.api.postData('/user/image', this.formData, "image modifié", "une erreur c'est produite");
      this.ngOnInit();
  }
}
