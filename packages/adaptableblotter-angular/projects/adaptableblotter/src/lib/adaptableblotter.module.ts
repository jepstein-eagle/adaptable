import { NgModule } from '@angular/core';
import { AdaptableBlotterComponent } from './adaptableblotter.component';
import { AdaptableblotterAgGridComponent } from './adaptableblotter-aggrid.component';

@NgModule({
  imports: [],
  declarations: [AdaptableBlotterComponent, AdaptableblotterAgGridComponent],
  exports: [AdaptableBlotterComponent]
})
export class AdaptableBlotterModule { }
