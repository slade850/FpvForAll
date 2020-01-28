import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { InscritptionComponent } from './inscritption/inscritption.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ApiService } from './service/api.service';
import { SectionsComponent } from './sections/sections.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouteGuardService } from './service/route-guard.service';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HomeComponent } from './home/home.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { EditReplyComponent } from './edit-reply/edit-reply.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InscritptionComponent,
    ConnexionComponent,
    SectionsComponent,
    DashboardComponent,
    DetailViewComponent,
    HomeComponent,
    EditTopicComponent,
    EditReplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, ApiService, {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'}}, RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
