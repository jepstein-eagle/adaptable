import React from 'react';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotterReact from '../../../src';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';
import { ExamplesHelper } from '../../ExamplesHelper';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);
const examplesHelper = new ExamplesHelper();

export default () => (
  <AdaptableBlotterReact
    style={{ height: '100vh' }}
    gridOptions={{
      columnDefs: examplesHelper.getTradeSchema(),
      rowData: examplesHelper.getTrades(500),
      enableRangeSelection: true,
      floatingFilter: true,
      suppressMenuHide: true,
    }}
    blotterOptions={{
      primaryKey: 'tradeId',
      blotterId: 'BYOP demo',
      licenceKey: process.env.ENTERPRISE_LICENSE,
    }}
  />
);
