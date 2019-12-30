import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community';
import { ActionColumn, ActionColumnRenderParams } from '../PredefinedConfig/ActionColumnState';
import Adaptable from '../../agGrid';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import {
  ActionColumnClickedEventArgs,
  ActionColumnClickedInfo,
} from '../Api/Events/ActionColumnClicked';
export class ActionColumnRenderer implements ICellRendererComp {
  private eGui: any;
  private eventListener: any;

  // gets called once before the renderer is used
  init(params: ICellRendererParams): void {
    const adaptable = (params.api as any).__adaptable as Adaptable;

    let actionCol:
      | ActionColumn
      | undefined = adaptable.api.actionColumnApi
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

      // If we have a render Func then we use that, otherwise we use the name of the Button Text
      let renderFunc: any = actionCol.RenderFunction;
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
          primaryKeyValue: adaptable.getPrimaryKeyValueFromRowNode(params.node),
          rowData: params.data,
        };
        const actionColumnClickedEventArgs: ActionColumnClickedEventArgs = AdaptableHelper.createFDC3Message(
          'Action Column Clicked Args',
          actionColumnClickedInfo
        );

        adaptable.api.eventApi.emit('ActionColumnClicked', actionColumnClickedEventArgs);
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
