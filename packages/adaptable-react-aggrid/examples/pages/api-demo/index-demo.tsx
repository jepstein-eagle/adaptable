import React from 'react';

import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';

import AdaptableReact, { ThemeChangedEventArgs, SearchChangedEventArgs } from '../../../src';

import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';

import { AdaptableOptions } from '../../../../adaptable/App_Scripts/types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import Adaptable from '../../../../adaptable/App_Scripts/agGrid';

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);

const dataGen = new DataGenerator();
const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

const adaptableOptions: AdaptableOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  adaptableId: 'basic demo',
};

function listenToSearchChange(searchChangedArgs: SearchChangedEventArgs) {
  console.log('search changed event received');
  console.log(searchChangedArgs.data[0].id);
}

export default () => {
  const onReady = (adaptable: Adaptable) => {
    // do stuff
  };
  return (
    <AdaptableReact
      style={{ height: '100vh' }}
      gridOptions={gridOptions}
      adaptableOptions={adaptableOptions}
      onReady={onReady}
      onSearchChanged={(searchChangedArgs: SearchChangedEventArgs) =>
        listenToSearchChange(searchChangedArgs)
      }
      onThemeChanged={(arg: ThemeChangedEventArgs) => {
        console.log('theme:', arg.themeName);
      }}
    />
  );
};
