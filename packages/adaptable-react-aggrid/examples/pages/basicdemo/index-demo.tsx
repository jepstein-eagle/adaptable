import React from 'react';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableReact from '../../../src';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';
import { ExamplesHelper } from '../../ExamplesHelper';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import LoggingHelper from '../../../../adaptable/src/Utilities/Helpers/LoggingHelper';

global.React = React;

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);
const examplesHelper = new ExamplesHelper();

const StatusCmp = props => (
  <div>
    <b>{props.value}!!!</b>
  </div>
);

export default () => (
  <AdaptableReact
    style={{ height: '100vh' }}
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
      columnDefs: examplesHelper.getTradeSchema().map(c => {
        if (c.field === 'status') {
          c.cellRendererFramework = StatusCmp;
        }

        return c;
      }),
      rowHeight: 50,
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
