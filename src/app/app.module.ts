//Native import
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Personnal Import
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import * as $ from 'jquery';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
