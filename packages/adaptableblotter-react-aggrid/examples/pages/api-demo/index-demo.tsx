import React from 'react';

import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';

import AdaptableBlotterReact, {
  IThemeChangedEventArgs,
  ISearchChangedEventArgs,
} from '../../../src';

import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';

import { DataGenerator } from '../../../../adaptableblotter/Harness/DataGenerator';
import { IAdaptableBlotterOptions } from '../../../../adaptableblotter/App_Scripts/types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import AdaptableBlotter from '../../../../adaptableblotter/App_Scripts/agGrid';

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);

const dataGen = new DataGenerator();
const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

const adaptableBlotterOptions: IAdaptableBlotterOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  blotterId: 'basic demo',
  licenceKey: process.env.ENTERPRISE_LICENSE,
};

function listenToSearchChange(searchChangedArgs: ISearchChangedEventArgs) {
  console.log('search changed event received');
  console.log(searchChangedArgs.data[0].id);
}

export default () => {
  const onReady = (adaptableblotter: AdaptableBlotter) => {
    // you can subscribe to events like this
    // adaptableblotter.api.eventApi
    //   .onSearchedChanged()
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
      onThemeChanged={(sender, arg: IThemeChangedEventArgs) => {
        console.log('theme:', arg.themeName);
      }}
    />
  );
};
