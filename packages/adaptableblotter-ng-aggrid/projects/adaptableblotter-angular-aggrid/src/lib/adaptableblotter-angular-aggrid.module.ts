// https://stackblitz.com/edit/angular-ag-grid-angular?file=app%2Fmy-grid-application%2Fmy-grid-application.component.ts
// https://stackblitz.com/edit/angular-ag-grid-custom?file=src%2Fgrid%2Fgrid.module.ts

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
