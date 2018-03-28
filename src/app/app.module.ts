//Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Libraries
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Project files
import { environment } from '../environments/environment.service';
import { AppComponent } from './app.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageScoringComponent } from './page-scoring/page-scoring.component';
import { Route } from '@angular/compiler/src/core';


const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'game', component: GamepageComponent},
  { path: 'score', component: PageScoringComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    GamepageComponent,
    LoginPageComponent,
    PageScoringComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
