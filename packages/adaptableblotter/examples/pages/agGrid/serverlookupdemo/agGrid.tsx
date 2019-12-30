import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../App_Scripts/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  IAdaptable,
  AdaptableApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { IServerColumnValues } from '../../../../App_Scripts/adaptableOptions/QueryOptions';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(25);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Server Lookup Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.filterOptions = {
    autoApplyFilter: false,
  };

  adaptableOptions.queryOptions = {
    getColumnValues: (columnName: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(getValuesForColumn(columnName)), 500);
      });
    },
  };

  adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'ColumnFilter'],
  },
};

function getValuesForColumn(columnName: string): IServerColumnValues | undefined {
  let returnVals: string[] = [];

  if (columnName === 'country') {
    returnVals = ['Jonny'];
  } else if (columnName === 'currency') {
    returnVals = ['REadu'];
  } else if (columnName === 'counterparty') {
    returnVals = ['First', 'Second', 'Citi', 'UBS'];
  } else {
    return undefined; // not nice and we need to fix
  }
  return {
    DistinctCriteriaPairValue: 'DisplayValue',
    ColumnValues: returnVals,
  };
}

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
