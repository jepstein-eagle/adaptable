import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';

import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

function InitAdaptableDemo() {
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
    ],
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
  const adaptableApi = Adaptable.init(adaptableOptions);
  fetch('https://json-server.adaptabletools.com/orders?_limit=1000')
    .then(response => response.json())
    .then(data => {
      adaptableApi.gridApi.setGridData(data);
    });
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
