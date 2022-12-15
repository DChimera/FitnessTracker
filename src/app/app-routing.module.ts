import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponentComponent } from "./components/about-component/about-component.component";
import { ActivityJournalComponent } from "./components/activity-journal/activity-journal.component";
import { FoodJournalComponent } from "./components/food-journal/food-journal.component";
import { HomepageComponentComponent } from "./components/homepage-component/homepage-component.component";
import { LoginComponentComponent } from "./components/login-component/login-component.component";
import { AdduserComponent } from "./components/adduser/adduser.component";
import {CameraComponent} from "./components/camera/camera.component";



const routes: Routes = [
  {path:'', component: LoginComponentComponent},
  {path:'login', component: LoginComponentComponent},
  {path:'login/adduser', component: AdduserComponent},
  {path:'about', component: AboutComponentComponent},
  {path:'activity', component: ActivityJournalComponent},
  {path:'home', component: HomepageComponentComponent},
  {path:'food', component: FoodJournalComponent},
  {path:'camera', component: CameraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
