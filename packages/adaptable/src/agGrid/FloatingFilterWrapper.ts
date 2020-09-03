import * as ReactDOM from 'react-dom';
import * as React from 'react';

import {
  IFloatingFilterComp,
  IFloatingFilterParams,
  FilterChangedEvent,
  IAfterGuiAttachedParams,
} from '@ag-grid-community/all-modules';
import { IColumnFilterContext } from '../Utilities/Interface/IColumnFilterContext';
import { Adaptable } from './Adaptable';

import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import { QuickFilterFormReact } from '../View/Components/FilterForm/QuickFilterForm';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

export const FloatingFilterWrapperFactory = (adaptable: Adaptable) =>
  <any>class FloatingFilterWrapper implements IFloatingFilterComp {
    onParentModelChanged(parentModel: any, filterChangedEvent?: FilterChangedEvent): void {
      // todo?
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
      // todo: consider theme
      this.filterContainer.parentElement.style.overflow = 'visible';
      this.filterContainer.parentElement.parentElement.style.padding = '0 2px';
    }

    private filterContainer: HTMLSpanElement;

    init(params: IFloatingFilterParams): void {
      const colId = params.column.getColId();
      this.filterContainer = document.createElement('div');
      this.filterContainer.id = `floatingFilter_${colId}_${adaptable.adaptableOptions.adaptableId}`;
      this.filterContainer.style.display = 'flex';
      this.filterContainer.style.minWidth = '0';
      this.filterContainer.style.alignItems = 'center';
      const column: AdaptableColumn = adaptable.api.columnApi.getColumnFromId(colId);

      const filterContext: IColumnFilterContext = {
        Column: column,
        Adaptable: adaptable,
        ShowCloseButton: false,
      };
      ReactDOM.render(
        React.createElement(ThemeProvider, { theme }, QuickFilterFormReact(filterContext)),
        this.filterContainer
      );
    }

    getGui(): HTMLElement {
      return this.filterContainer;
    }

    destroy(): void {
      ReactDOM.unmountComponentAtNode(this.filterContainer);
      this.filterContainer = null;
    }
  };
