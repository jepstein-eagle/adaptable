import { NgModule } from '@angular/core';
import { AdaptableAngularAgGridComponent } from './adaptable-angular-aggrid.component';
import { AgGridOverrideComponent } from './aggrid-angular-override.component';

@NgModule({
  declarations: [AgGridOverrideComponent, AdaptableAngularAgGridComponent],
  imports: [],
  exports: [AdaptableAngularAgGridComponent],
  providers: [],
})
export class AdaptableAngularAgGridModule {}
