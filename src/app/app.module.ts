import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PageScoringComponent } from './page-scoring/page-scoring.component';


@NgModule({
  declarations: [
    AppComponent,
    PageScoringComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
