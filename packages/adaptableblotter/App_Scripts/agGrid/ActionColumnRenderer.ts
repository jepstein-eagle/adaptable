import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community';

import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { ActionColumn, ActionColumnRenderParams } from '../PredefinedConfig/ActionColumnState';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { ActionColumnFunction } from '../BlotterOptions/AdvancedOptions';
import { ActionColumnClickedEventArgs, ActionColumnClickedInfo } from '../Api/Events/BlotterEvents';
import AdaptableBlotter from '../../agGrid';
import { ACTION_COLUMN_CLICKED_EVENT } from '../Utilities/Constants/GeneralConstants';
import BlotterHelper from '../Utilities/Helpers/BlotterHelper';
import Helper from '../Utilities/Helpers/Helper';
export class ActionColumnRenderer implements ICellRendererComp {
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

      let actionColumnRenderParams: ActionColumnRenderParams = {
        column: actionCol,
        rowData: params.data,
        rowNode: params.node,
      };

      // if there is a shouldRender function then run it and if returns false then do nothing
      let shouldRenderPredicate: any = actionCol.ShouldRenderPredicate;
      if (shouldRenderPredicate) {
        if (!shouldRenderPredicate(actionColumnRenderParams)) {
          this.eGui.innerHTML = '';
          return;
        }
      }

      // bit complicated for the moment until we get rid of deprecated options rendering
      // first we try to get the render func from the object; if that doesnt work we get from Advanced Options
      let renderFunc: any = actionCol.RenderFunction;

      if (Helper.objectNotExists(renderFunc)) {
        if (StringExtensions.IsNotNullOrEmpty(actionCol.RenderFunctionName)) {
          if (
            ArrayExtensions.IsNotNullOrEmpty(
              blotter.blotterOptions.advancedOptions!.userFunctions!.actionColumnFunctions!
            )
          ) {
            let actionColumnFunction: ActionColumnFunction = blotter.blotterOptions.advancedOptions!.userFunctions!.actionColumnFunctions!.find(
              acf => acf.name == actionCol!.RenderFunctionName
            );
            renderFunc = actionColumnFunction.func;
          }
        }
      }

      // If we have a render Func then we use that, otherwise we use the name of the Button Text
      if (renderFunc) {
        this.eGui.innerHTML = renderFunc(actionColumnRenderParams);
      } else {
        this.eGui.innerHTML =
          '<span class="my-css-class"><button class="btn-simple">' +
          actionCol.ButtonText +
          '</button></span>';
      }

      // add event listener to button
      this.eventListener = function() {
        let actionColumnClickedInfo: ActionColumnClickedInfo = {
          actionColumn: actionCol as ActionColumn,
          primaryKeyValue: blotter.getPrimaryKeyValueFromRowNode(params.node),
          rowData: params.data,
        };
        const actionColumnClickedEventArgs: ActionColumnClickedEventArgs = BlotterHelper.createFDC3Message(
          'Action Column Clicked Args',
          actionColumnClickedInfo
        );

        // now depprecated and shortly to be removed...
        blotter.api.eventApi._onActionColumnClicked.Dispatch(blotter, actionColumnClickedEventArgs);
        // new way (and soon only way)
        blotter.api.eventApi.emit('ActionColumnClicked', actionColumnClickedEventArgs);
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
