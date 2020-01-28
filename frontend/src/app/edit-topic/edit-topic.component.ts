import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {

  detail: any;
  topic: any;
  postForm = this.fb.group({
    title: String,
    content: String
  });
  constructor(private api: ApiService, private route: ActivatedRoute,private location: Location, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params
      .pipe(map(params => params['id']), tap(id => (this.detail = id)))
      .subscribe(res => this.navChange());
  }

  navChange(){
    this.api.readData(`/detail/topics/${this.detail}`).
    subscribe(res => this.topic = res);
    this.postForm.setValue({
      title: this.topic.title,
      content: this.topic.content
    });
  }

  onSubmit(){
    this.api.pathData(`/detail/topics/${this.detail}`, this.postForm.value, "topic modifié", "une erreur est survenue");
    this.location.back();
}
}
