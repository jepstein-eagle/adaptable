import React from 'react';

import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';

import AdaptableReact from '../../../src';
import '../../../src/index.scss';

import { DataGenerator } from '../../../../adaptable/Harness/DataGenerator';
import { AdaptableOptions } from '../../../../adaptable/src/types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);

const dataGen = new DataGenerator();
const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

const adaptableOptions: AdaptableOptions = {
  vendorGrid: gridOptions,
  primaryKey: 'tradeId',
  userName: 'demo user',
  adaptableId: 'basic demo',
};

export default () => (
  <AdaptableReact
    style={{ height: '100vh' }}
    gridOptions={gridOptions}
    adaptableOptions={adaptableOptions}
    render={({ grid, adaptable }) => (
      <>
        {grid}
        <div>stuff</div>
        {adaptable}
      </>
    )}
  />
);
