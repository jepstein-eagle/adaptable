import React from 'react';

import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';

import AdaptableBlotterReact from '../../../src';
import '../../../src/index.scss';

import { AdaptableBlotterOptions } from '../../../../adaptableblotter/App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);
const examplesHelper = new ExamplesHelper();

const tradeData: any = examplesHelper.getTrades(500);
const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

const adaptableBlotterOptions: AdaptableBlotterOptions = {
  vendorGrid: gridOptions,
  primaryKey: 'tradeId',
  userName: 'demo user',
  blotterId: 'basic demo',
};

export default () => (
  <AdaptableBlotterReact
    style={{ height: '100vh' }}
    gridOptions={gridOptions}
    blotterOptions={adaptableBlotterOptions}
    render={({ grid, blotter }) => (
      <>
        {grid}
        <div>stuff</div>
        {blotter}
      </>
    )}
  />
);
