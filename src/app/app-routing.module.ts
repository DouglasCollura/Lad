import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './admin/main/main.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path:"",
    component:LandingComponent
  },
  {
    path:"land",
    component:LandingComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"admin/main",
    component:MainComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
