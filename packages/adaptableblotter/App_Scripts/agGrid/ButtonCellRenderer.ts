import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community';

import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { ActionColumn } from '../PredefinedConfig/DesignTimeState/ActionColumnState';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { ActionColumnFunction } from '../BlotterOptions/AdvancedOptions';
import { ActionColumnEventArgs } from '../Api/Events/BlotterEvents';
import AdaptableBlotter from '../../agGrid';

export class ButtonCellRenderer implements ICellRendererComp {
  private eGui: any;
  private eventListener: any;

  // gets called once before the renderer is used
  init(params: ICellRendererParams): void {
    const blotter = (params.api as any).__blotter as AdaptableBlotter;

    let actionCol: ActionColumn | undefined = blotter.api.actionColumnApi
      .getAllActionColumn()
      .find(ac => ac.ColumnId == params.colDef.colId);

    if (actionCol) {
      // create the cell
      this.eGui = document.createElement('div');
      this.eGui.style.display = 'inline-block';

      let renderFunc: ActionColumnFunction | undefined;
      if (StringExtensions.IsNotNullOrEmpty(actionCol.RenderFunctionName)) {
        if (
          ArrayExtensions.IsNotNullOrEmpty(
            blotter.blotterOptions.advancedOptions!.userFunctions!.actionColumnFunctions!
          )
        ) {
          renderFunc = blotter.blotterOptions.advancedOptions!.userFunctions!.actionColumnFunctions!.find(
            acf => acf.name == actionCol!.RenderFunctionName
          );
        }
      }

      if (renderFunc) {
        let satisfyFunction = renderFunc.func;
        this.eGui.innerHTML = satisfyFunction(params, blotter);
      } else {
        this.eGui.innerHTML =
          '<span class="my-css-class"><button class="btn-simple">' +
          actionCol.ButtonText +
          '</button></span>';
      }

      // add event listener to button
      this.eventListener = function() {
        let eventArgs: ActionColumnEventArgs = {
          actionColumn: actionCol as ActionColumn,
          primaryKeyValue: blotter.getPrimaryKeyValueFromRecord(params.node),
          rowData: params.data,
        };
        blotter.api.eventApi._onActionColumnClicked.Dispatch(blotter, eventArgs);
      };
      this.eGui.addEventListener('click', this.eventListener);
    }
  }
  // gets called once when grid ready to insert the element
  getGui(): HTMLElement {
    return this.eGui;
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: any): boolean {
    // return true to tell the grid we refreshed successfully
    return true;
  }

  // gets called when the cell is removed from the grid
  destroy(): void {
    // do cleanup, remove event listener from button
    if (this.eGui) {
      this.eGui.removeEventListener('click', this.eventListener);
    }
  }
}
