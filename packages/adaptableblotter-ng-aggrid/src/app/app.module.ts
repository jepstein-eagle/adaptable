import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdaptableblotterAngularAggridComponent } from '../../projects/adaptableblotter-angular-aggrid/src/public-api';

@NgModule({
  declarations: [AppComponent, AdaptableblotterAngularAggridComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
