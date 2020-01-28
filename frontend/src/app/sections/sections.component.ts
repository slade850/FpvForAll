import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  section: string;
  topics: any;
  opened: boolean;
  postForm = this.fb.group({
    title: null,
    content: null
  });

  constructor(private api: ApiService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.opened = false;
    this.route.params
      .pipe(map(params => params['name']), tap(name => (this.section = name)))
      .subscribe(res => this.navChange());
      };

  navChange(){
    this.api.readData(`/${this.section}/topics`).
    subscribe(res => this.topics = res);
  }

  open(){
    this.opened === false ? this.opened = true : this.opened = false;
  }

  onSubmit(){
    this.api.postData(`/${this.section}/topics`, this.postForm.value, "message envoyé", "vous devez vous connecter");
    this.navChange();
}
}
