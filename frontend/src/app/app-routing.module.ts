import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscritptionComponent } from './inscritption/inscritption.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { SectionsComponent } from './sections/sections.component';


const routes: Routes = [
  {path: 'inscription', component: InscritptionComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'section/:name', component: SectionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
