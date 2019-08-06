import React from 'react';

import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';

import AdaptableBlotterReact, { ThemeChangedEventArgs, SearchChangedEventArgs } from '../../../src';

import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';

import { AdaptableBlotterOptions } from '../../../../adaptableblotter/App_Scripts/types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import AdaptableBlotter from '../../../../adaptableblotter/App_Scripts/agGrid';

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);

const dataGen = new DataGenerator();
const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

const adaptableBlotterOptions: AdaptableBlotterOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  blotterId: 'basic demo',
};

function listenToSearchChange(searchChangedArgs: SearchChangedEventArgs) {
  console.log('search changed event received');
  console.log(searchChangedArgs.data[0].id);
}

export default () => {
  const onReady = (adaptableblotter: AdaptableBlotter) => {
    // you can subscribe to events like this
    // adaptableblotter.api.eventApi
    //   .onSearchChanged()
    //   .Subscribe((sender, searchChangedArgs) => listenToSearchChange(searchChangedArgs));
    // but better use the react way below
  };
  return (
    <AdaptableBlotterReact
      style={{ height: '100vh' }}
      gridOptions={gridOptions}
      blotterOptions={adaptableBlotterOptions}
      onReady={onReady}
      onSearchChanged={(sender, searchChangedArgs) => listenToSearchChange(searchChangedArgs)}
      onThemeChanged={(sender, arg: ThemeChangedEventArgs) => {
        console.log('theme:', arg.themeName);
      }}
    />
  );
};
