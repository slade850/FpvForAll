import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  user: string = "";
  adm: boolean = false;
  detail: any;
  topic: any;
  replys: any;
  opened: boolean;
  replyForm = this.fb.group({
    content: null
  });
  constructor(private api: ApiService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.opened = false;
    this.route.params
      .pipe(map(params => params['id']), tap(id => (this.detail = id)))
      .subscribe(res => this.navChange());
  }

  navChange(){
    if(sessionStorage.getItem('token')){
      this.api.readProfil().subscribe((res) => {
        this.user = res.username;
        this.adm = res.admin;
      });
    } else {
      this.user = "";
      this.adm = false;
    }
    this.api.readData(`/detail/topics/${this.detail}`).
    subscribe(res => this.topic = res);
    this.api.readData(`/topic/${this.detail}/replys`).
    subscribe(res => this.replys = res);
  }

  open(){
    this.opened === false ? this.opened = true : this.opened = false;
  }

  deletItem(id){
      this.api.deletData(`/topic/${this.detail}/replys/${id}`, "reply suprimer", "une erreur est survenue");
      this.navChange();
    }

  onSubmit(){
    this.api.postData(`/topic/${this.detail}/replys`, this.replyForm.value, "message envoyé", "vous devez vous connecter");
    this.navChange();
}
}
