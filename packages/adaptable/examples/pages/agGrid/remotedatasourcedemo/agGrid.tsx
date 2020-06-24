import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';

import '../../../../src/themes/dark.scss';

import { GridOptions, ColDef } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  SearchChangedEventArgs,
  AdaptableSearchState,
} from '../../../../src/types';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

async function InitAdaptableDemo() {
  // const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = {
    columnDefs: [
      {
        field: 'OrderId',
        type: 'abColDefNumber',
      },
      { field: 'CompanyName', type: 'abColDefString' },
      { field: 'ContactName', type: 'abColDefString' },
      { field: 'ItemCount', type: 'abColDefNumber' },
      { field: 'ShipVia', type: 'abColDefString' },
    ].map((c: ColDef) => {
      c.filter = true;
      return c;
    }),
    rowData: undefined,
    enableRangeSelection: true,
    floatingFilter: true,

    suppressColumnVirtualisation: true,
    suppressMenuHide: true,
    rowHeight: 30,
    sideBar: true,
    rowSelection: 'multiple',
    autoGroupColumnDef: {
      sortable: true,
    },
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {},
      abColDefCustom: {},
    },
  };

  //gridOptions.singleClickEdit = true;
  const adaptableOptions: AdaptableOptions = {
    adaptableId: 'Remote data source',
    vendorGrid: { ...gridOptions, modules: AllEnterpriseModules },
    primaryKey: 'OrderId',
    // dataSource: () => {},
    // dataSourceTriggerEvents: ['SortChange']
  };

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
  const adaptableApi = await Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on('SearchChanged', (args: SearchChangedEventArgs) => {
    const { data } = args;
    const searchState = data[0].id.adaptableSearchState;
    console.log(searchState);

    reload({
      quickSearch: searchState.quickSearch,
      columnFilters: searchState.columnFilters,
    });
  });

  const reload = (searchState: Partial<AdaptableSearchState>) => {
    const arg: any = {
      quickSearch: searchState.quickSearch,
    };
    if (searchState.columnFilters) {
      arg.columnFilters = JSON.stringify(searchState.columnFilters);
    }

    const toQuery = (arg: any): string =>
      Object.keys(arg)
        .map(key => {
          const value = arg[key];
          return value != null ? `at_${key}=${value}` : null;
        })
        .filter(Boolean)
        .join('&');

    fetch(`http://localhost:3001/api/orders?_limit=10&` + toQuery(arg))
      .then(response => response.json())
      .then(data => {
        adaptableApi.gridApi.setGridData(data);
      });
  };

  reload({});
}

let demoConfig: PredefinedConfig = {};

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
