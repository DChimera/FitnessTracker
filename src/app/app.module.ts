import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { HomepageComponentComponent } from './components/homepage-component/homepage-component.component';
import { AboutComponentComponent } from './components/about-component/about-component.component';
import { FoodJournalComponent } from './components/food-journal/food-journal.component';
import { ActivityJournalComponent } from './components/activity-journal/activity-journal.component';
import { RoutingComponentComponent } from './components/routing-component/routing-component.component';
import { FoodComponent } from './components/food/food.component';
import { FormsModule } from "@angular/forms";
import { AdduserComponent } from './components/adduser/adduser.component';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomepageComponentComponent,
    AboutComponentComponent,
    FoodJournalComponent,
    ActivityJournalComponent,
    RoutingComponentComponent,
    FoodComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
