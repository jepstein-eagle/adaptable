import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community';
import AdaptableBlotter from '../Hypergrid';
import {
  ActionColumn,
  ActionColumnTestFunction,
} from '../PredefinedConfig/DesignTimeState/ActionColumnState';
import { ActionColumnEventArgs } from '../Api/Events/BlotterEvents';
import actioncolumndemo from '../../examples/pages/agGrid/actioncolumndemo';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { ActionColumnFunction } from '../BlotterOptions/GeneralOptions';

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

      if (StringExtensions.IsNotNullOrEmpty(actionCol.TestFunctionName)) {
        let test: ActionColumnFunction = blotter.blotterOptions.generalOptions.userFunctions.actionColumnFunctions.find(
          acf => acf.name == actionCol.TestFunctionName
        );

        let satisfyFunction = test.myFunc;
        satisfyFunction();
      }

      this.eGui.innerHTML = actionCol.render
        ? actionCol.render(params, blotter)
        : '<span class="my-css-class"><button class="btn-simple">' +
          actionCol.ButtonText +
          '</button></span>';

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
