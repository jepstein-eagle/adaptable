import React from 'react';
import AdaptableReact from '../../../src';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';
import { ExamplesHelper } from '../../ExamplesHelper';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import LoggingHelper from '../../../../adaptable/src/Utilities/Helpers/LoggingHelper';

import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import './index.css';
global.React = React;

const examplesHelper = new ExamplesHelper();

const StatusCmp = props => (
  <div>
    <b>{props.value}!!!</b>
  </div>
);

export default () => (
  <AdaptableReact
    style={{ height: '100vh' }}
    modules={[SideBarModule, MenuModule, RangeSelectionModule]}
    onSearchChanged={(...args: any[]) => {
      LoggingHelper.LogAdaptableWarning('search changed', args);
    }}
    onAdaptableReady={api => {
      console.log('Adaptable ready', api);
    }}
    onSelectionChanged={selargs => {
      console.log(selargs);
    }}
    gridOptions={{
      columnTypes: {
        abColDefNumber: {},
        abColDefString: {},
        abColDefBoolean: {},
        abColDefDate: {},
        abColDefNumberArray: {},
        abColDefObject: {},
        abColDefCustom: {},
      },
      columnDefs: examplesHelper.getTradeSchema().map(c => {
        if (c.field === 'status') {
          c.cellRendererFramework = StatusCmp;
        }

        return c;
      }),
      rowHeight: 33,
      rowData: examplesHelper.getTrades(500),
      enableRangeSelection: true,
      floatingFilter: true,
      suppressMenuHide: true,
    }}
    adaptableOptions={{
      primaryKey: 'tradeId',
      adaptableId: 'BYOP demos',
    }}
  />
);
