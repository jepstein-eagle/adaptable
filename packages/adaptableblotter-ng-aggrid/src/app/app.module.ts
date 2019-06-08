import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdaptableBlotterAngularAggridComponent } from '../../projects/adaptableblotter-angular-aggrid/src/public-api';

@NgModule({
  declarations: [AppComponent, AdaptableBlotterAngularAggridComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
