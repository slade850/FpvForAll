import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  sections: any;
  connected: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private api: ApiService, private router: Router) {}

  ngOnInit(){
    this.api.readData('/sections/').
    subscribe(res => this.sections = res);
    if(sessionStorage.getItem('token')){
      this.connected = true;
    };

    this.api.watchStorage().subscribe((data) => {
      if(sessionStorage.getItem('token')){
        this.connected = true;
      } else {
        this.connected = false;
      }
      })
    };

    deconnect(){
      this.api.removeItem('token');
      this.router.navigate(['']);
    }

}
