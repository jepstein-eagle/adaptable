import {
  IFilterComp,
  IDoesFilterPassParams,
  IFilterParams,
  Column,
} from '@ag-grid-community/all-modules';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { IColumnFilterContext } from '../Utilities/Interface/IColumnFilterContext';
import { Adaptable } from './Adaptable';
import { FilterFormReact } from '../View/Components/FilterForm/FilterForm';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';

export let FilterWrapperFactory = (adaptable: Adaptable) => {
  return <any>class FilterWrapper implements IFilterComp {
    private params: IFilterParams;
    private filterContainer: HTMLDivElement;
    private column: Column;
    init(params: IFilterParams): void {
      this.params = params;
      this.column = params.column;
      this.filterContainer = document.createElement('div');
      this.filterContainer.id =
        'filter_' + this.params.column.getColId() + '_' + adaptable.adaptableOptions.adaptableId;
    }
    isFilterActive() {
      //make the small filter icon to appear when there is a filter
      return (
        adaptable.api.columnFilterApi
          .getAllColumnFilter()
          .findIndex(x => x.ColumnId == this.params.column.getColId()) > -1
      );
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
      //we do not filter here.... we filter using the doesExternalFilterPass. Not sure there is a difference....
      return true;
    }

    getModel(): any {
      //
    }
    setModel(model: any): void {
      //
    }
    getGui(): HTMLElement {
      return this.filterContainer;
    }

    afterGuiAttached?(params?: { hidePopup?: Function }): void {
      //we always unmount first so the autofocus from the form works... in other grids we unmount when hidden
      ReactDOM.unmountComponentAtNode(this.filterContainer);
      let column: AdaptableColumn = ColumnHelper.getColumnFromId(
        this.column.getColId(),
        adaptable.api.gridApi.getColumns()
      );
      let filterContext: IColumnFilterContext = {
        Column: column,
        Adaptable: adaptable,
        ShowCloseButton: params != null && params.hidePopup != null,
      };
      adaptable.hideFilterFormPopup = params ? params.hidePopup : null;

      ReactDOM.render(
        React.createElement(ThemeProvider, { theme }, FilterFormReact(filterContext)),
        this.filterContainer
      );
    }

    destroy(): void {
      ReactDOM.unmountComponentAtNode(this.filterContainer);
      this.filterContainer = null;
    }
  };
};
