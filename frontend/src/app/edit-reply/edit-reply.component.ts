import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.scss']
})
export class EditReplyComponent implements OnInit {

  detail: any;
  reply: any;
  replyForm = this.fb.group({
    content: String
  });
  constructor(private api: ApiService, private route: ActivatedRoute,private location: Location, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params
      .pipe(map(params => params['id']), tap(id => (this.detail = id)))
      .subscribe(res => this.navChange());
  }

  navChange(){
    this.api.readData(`/topic/edit/replys/${this.detail}`).
    subscribe(res => this.reply = res);
    this.replyForm.setValue({
      content: this.reply.content
    });
  }

  onSubmit(){
    this.api.pathData(`/topic/edit/replys/${this.detail}`, this.replyForm.value, "reply modifié", "une erreur est survenue");
    this.location.back();
}
}
