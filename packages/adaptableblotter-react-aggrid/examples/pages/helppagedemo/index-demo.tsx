import React from 'react';
import { GridOptions } from 'ag-grid-community';
import AdaptableBlotterReact from '../../../src';
import { DataGenerator } from '../../../../adaptableblotter/Harness/DataGenerator';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AdaptableOptions } from '../../../../adaptableblotter/types';

/*
Very similar to the basic demo but with just light theme and with the GridOptions created on the page to make it easier to see
*/

const dataGen = new DataGenerator();
const gridOptions: GridOptions = {
  columnDefs: dataGen.getTradeSchema(),
  rowData: dataGen.getTrades(5000),
  enableRangeSelection: true,
  floatingFilter: true,
  columnTypes: {
    abColDefNumber: {},
    abColDefString: {},
    abColDefBoolean: {},
    abColDefDate: {},
    abColDefObject: {},
  },
};

const adaptableOptions: AdaptableOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  adaptableId: 'react demo',
};

export default () => (
  <AdaptableBlotterReact
    style={{ height: '100vh' }}
    gridOptions={gridOptions}
    adaptableOptions={adaptableOptions}
  />
);
