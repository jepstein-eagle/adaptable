import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';

import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  SearchChangedEventArgs,
  AdaptableApi,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AdaptableSearchState } from '../../../../src/Api/Events/SearchChanged/AdaptableSearchState';
import { SearchChangedInfo } from '../../../../src/Api/Events/SearchChanged/SearchChangedInfo';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  // const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(null);

  //gridOptions.singleClickEdit = true;
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'Data Source demo'
  );
  /*
  adaptableOptions.eventOptions = {
    onSearchChanged: searchChangedArgs => {
      listenToSearchChange(adaptable, examplesHelper, searchChangedArgs);
    },
    onAlertFired: () => {},
  };*/

  adaptableOptions.auditOptions = {
    auditCellEdits: {
      auditAsAlert: true,
    },
    auditTickingDataUpdates: {
      auditToConsole: true,
    },
  };
  adaptableOptions.predefinedConfig = demoConfig;
  const adaptableApi = Adaptable.init(adaptableOptions);
}

function listenToSearchChange(
  adaptableApi: AdaptableApi,
  examplesHelper: ExamplesHelper,
  searchChangedArgs: SearchChangedEventArgs
) {
  console.log(searchChangedArgs);
  let searchChangedInfo: SearchChangedInfo = searchChangedArgs.data[0].id;
  if (searchChangedInfo.searchChangedTrigger == 'DataSource') {
    let searchState: AdaptableSearchState = searchChangedArgs.data[0].id.AdaptableSearchState;
    if (searchState.dataSource != null) {
      switch (searchState.dataSource.Name) {
        case 'Euro':
          let euroTrades = examplesHelper.getEuroTrades(500);
          adaptableApi.gridApi.setGridData(euroTrades);
          break;

        case 'Dollar':
          let dollarTrades = examplesHelper.getDollarTrades(500);
          adaptableApi.gridApi.setGridData(dollarTrades);
          break;

        case 'GBP':
          let sterlingTrades = examplesHelper.getGBPTrades(500);
          adaptableApi.gridApi.setGridData(sterlingTrades);
          break;
      }
    }
  }
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['DataSource'],
  },
  DataSource: {
    DataSources: [
      {
        Name: 'Euro',
        Description: 'Euro Trades',
      },
      {
        Name: 'Dollar',
        Description: 'Dollar Trades',
      },
      {
        Name: 'GBP',
        Description: 'Sterling Trades',
        DataSourceParams: [
          {
            Name: 'Hello',
            DataType: 'String',
          },
          {
            Name: 'Age',
            DataType: 'Number',
          },
        ],
      },
    ],
  },
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};

/*
 DataSourceParams: [
          {
            Name: 'First Param',
            DataType: 'Number',
          },
        ],
        */
