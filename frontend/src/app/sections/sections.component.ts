import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  section: string;

  topics: any;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .pipe(map(params => params['name']), tap(name => (this.section = name)))
      .subscribe(res => this.navChange());
    
  }

  navChange(){
    this.api.readData(`/${this.section}/topics`).
    subscribe(res => this.topics = res);
  }
}
