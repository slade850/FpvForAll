import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscritptionComponent } from './inscritption/inscritption.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { SectionsComponent } from './sections/sections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuardService } from './service/route-guard.service';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HomeComponent } from './home/home.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { EditReplyComponent } from './edit-reply/edit-reply.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inscription', component: InscritptionComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'section/:name', component: SectionsComponent},
  {path: 'topic/detail/:id', component: DetailViewComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuardService]},
  {path: 'edit/topic/:id', component: EditTopicComponent, canActivate: [RouteGuardService]},
  {path: 'edit/reply/:id', component: EditReplyComponent, canActivate: [RouteGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
