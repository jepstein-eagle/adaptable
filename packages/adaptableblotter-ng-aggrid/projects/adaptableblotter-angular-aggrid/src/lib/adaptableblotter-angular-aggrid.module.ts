import { NgModule } from '@angular/core';
import { AdaptableBlotterAngularAgGridComponent } from './adaptableblotter-angular-aggrid.component';
import { AgGridOverrideComponent } from './aggrid-angular-override.component';

export {
  AdaptableBlotterAngularAgGridComponent,
} from './adaptableblotter-angular-aggrid.component';

@NgModule({
  declarations: [
    AgGridOverrideComponent,
    AdaptableBlotterAngularAgGridComponent,
  ],
  imports: [],
  exports: [AdaptableBlotterAngularAgGridComponent],
  providers: [],
})
export class AdaptableBlotterAngularAgGridModule {}
