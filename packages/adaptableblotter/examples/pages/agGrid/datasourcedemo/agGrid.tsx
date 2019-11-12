import React, { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';

import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  SearchChangedEventArgs,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { BlotterSearchState } from '../../../../App_Scripts/Api/Events/SearchChanged/BlotterSearchState';
import { SearchChangedInfo } from '../../../../App_Scripts/Api/Events/SearchChanged/SearchChangedInfo';

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  // const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(null);

  //gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'Data Source demo'
  );
  /*
  adaptableBlotterOptions.eventOptions = {
    onSearchChanged: searchChangedArgs => {
      listenToSearchChange(adaptableblotter, examplesHelper, searchChangedArgs);
    },
    onAlertFired: () => {},
  };*/

  adaptableBlotterOptions.auditOptions = {
    auditCellEdits: {
      auditAsAlert: true,
    },
    auditTickingDataChanges: {
      auditToConsole: true,
    },
  };
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi
    .onSearchChanged()
    .Subscribe((sender, searchChangedArgs) =>
      listenToSearchChange(adaptableblotter, examplesHelper, searchChangedArgs)
    );
}

function listenToSearchChange(
  blotter: AdaptableBlotter,
  examplesHelper: ExamplesHelper,
  searchChangedArgs: SearchChangedEventArgs
) {
  console.log(searchChangedArgs);
  let searchChangedInfo: SearchChangedInfo = searchChangedArgs.data[0].id;
  if (searchChangedInfo.searchChangedTrigger == 'DataSource') {
    let searchState: BlotterSearchState = searchChangedArgs.data[0].id.blotterSearchState;
    if (searchState.dataSource != null) {
      switch (searchState.dataSource.Name) {
        case 'Euro':
          let euroTrades = examplesHelper.getEuroTrades(500);
          blotter.api.gridApi.setGridData(euroTrades);
          break;

        case 'Dollar':
          let dollarTrades = examplesHelper.getDollarTrades(500);
          blotter.api.gridApi.setGridData(dollarTrades);
          break;

        case 'GBP':
          let sterlingTrades = examplesHelper.getGBPTrades(500);
          blotter.api.gridApi.setGridData(sterlingTrades);
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
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
