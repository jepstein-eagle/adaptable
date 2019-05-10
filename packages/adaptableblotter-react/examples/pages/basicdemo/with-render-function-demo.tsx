import React from 'react';

import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';

import AdaptableBlotterReact from '../../../src';
import '../../../src/base.css';

import { DataGenerator } from '../../../../adaptableblotter/Harness/DataGenerator';
import { IAdaptableBlotterOptions } from '../../../../adaptableblotter/App_Scripts/types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import '../../../../adaptableblotter/App_Scripts/base.css';
import '../../../../adaptableblotter/App_Scripts/themes/light.css';

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);

const dataGen = new DataGenerator();
const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

const adaptableBlotterOptions: IAdaptableBlotterOptions = {
  vendorGrid: gridOptions,
  primaryKey: 'tradeId',
  userName: 'demo user',
  blotterId: 'basic demo',
  licenceKey: process.env.ENTERPRISE_LICENSE,
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
