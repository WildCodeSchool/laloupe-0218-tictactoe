import { AuthService } from './auth.service';
// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
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
import { MatchMakingComponent } from './match-making/match-making.component';
import { Route } from '@angular/compiler/src/core';
import { CrewComponent } from './crew/crew.component';




const appRoutes: Routes = [

  { path: 'game/:id', component: GamepageComponent},
  { path: 'score', component: PageScoringComponent},
<<<<<<< HEAD
  { path: 'login', component: LoginPageComponent},
  { path: '', component: LoginPageComponent},
  { path: 'crew', component: CrewComponent},
=======
  { path: 'login' , component: LoginPageComponent},
  { path: 'matchmaking', component: MatchMakingComponent },
  { path: '' , component: LoginPageComponent},
>>>>>>> LMatchMaking

];

@NgModule({
  declarations: [
    AppComponent,
    GamepageComponent,
    LoginPageComponent,
    PageScoringComponent,
<<<<<<< HEAD
    CrewComponent
=======
    MatchMakingComponent
>>>>>>> LMatchMaking
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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
