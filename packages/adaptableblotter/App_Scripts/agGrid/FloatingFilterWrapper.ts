import * as ReactDOM from 'react-dom';
import {
  IFloatingFilterComp,
  IFloatingFilterParams,
  FilterChangedEvent,
  IAfterGuiAttachedParams,
} from 'ag-grid-community';
import { IColumnFilterContext } from '../Utilities/Interface/IColumnFilterContext';
import { AdaptableBlotter } from './AdaptableBlotter';

import { QuickFilterFormReact } from '../View/Components/FilterForm/QuickFilterForm';
import { IColumn } from '../Utilities/Interface/IColumn';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';

export const FloatingFilterWrapperFactory = (blotter: AdaptableBlotter) =>
  <any>class FloatingFilterWrapper implements IFloatingFilterComp {
    onParentModelChanged(parentModel: any, filterChangedEvent?: FilterChangedEvent): void {
      // todo?
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
      // todo?
    }

    private filterContainer: HTMLSpanElement;

    init(params: IFloatingFilterParams): void {
      const colId = params.column.getColId();
      this.filterContainer = document.createElement('div');
      this.filterContainer.id = `floatingFilter_${colId}_${blotter.blotterOptions.blotterId}`;
      this.filterContainer.style.display = 'flex';
      const column: IColumn = ColumnHelper.getColumnFromId(colId, blotter.api.gridApi.getColumns());

      const width: number = params.column.getActualWidth() - 40;

      const filterContext: IColumnFilterContext = {
        Column: column,
        Blotter: blotter,
        ColumnWidth: width,
        ShowCloseButton: false,
      };
      ReactDOM.render(QuickFilterFormReact(filterContext), this.filterContainer);
    }

    getGui(): HTMLElement {
      return this.filterContainer;
    }

    destroy(): void {
      ReactDOM.unmountComponentAtNode(this.filterContainer);
      this.filterContainer = null;
    }
  };
