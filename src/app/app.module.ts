// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Libraries
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Project files
import { environment } from '../environments/environment.service';
import { AppComponent } from './app.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageScoringComponent } from './page-scoring/page-scoring.component';
import { Route } from '@angular/compiler/src/core';
import { MatchmakingComponent } from './matchmaking/matchmaking.component';




const appRoutes: Routes = [

  { path: 'game', component: GamepageComponent},
  { path: 'score', component: PageScoringComponent},
  { path: 'login' , component: LoginPageComponent},
  { path: 'match' , component: MatchmakingComponent},
  { path: '' , component: LoginPageComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    GamepageComponent,
    LoginPageComponent,
    PageScoringComponent,
    MatchmakingComponent,

  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
