//Native import
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Personnal Import
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import * as $ from 'jquery';

//angularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { environment } from '../environments/environment.service';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
