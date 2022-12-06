import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomepageComponentComponent } from './homepage-component/homepage-component.component';
import { AboutComponentComponent } from './about-component/about-component.component';
import { FoodJournalComponent } from './food-journal/food-journal.component';
import { ActivityJournalComponent } from './activity-journal/activity-journal.component';
import { RoutingComponentComponent } from './routing-component/routing-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomepageComponentComponent,
    AboutComponentComponent,
    FoodJournalComponent,
    ActivityJournalComponent,
    RoutingComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
