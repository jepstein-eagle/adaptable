import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  AccessLevel,
  AdaptableFunctionName,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Entitlements Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.filterOptions = {
    // useAdaptableFilterForm: false,
  };

  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };
  adaptableOptions.predefinedConfig = demoConfig;
  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: [
      'SmartEdit',
      'Export',
      'SystemStatus',
      'BulkUpdate',
      'QuickSearch',
      'AdvancedSearch',
    ],
    VisibleButtons: [
      'SmartEdit',
      'Export',
      'SystemStatus',
      'BulkUpdate',
      'QuickSearch',
      'AdvancedSearch',
    ],
  },
  Entitlements: {
    DefaultAccessLevel: 'Full',
    /*
    EntitlementLookUpFunction: (
      functionName: AdaptableFunctionName,
      userName: string,
      adaptableId: string
    ) => {
      switch (functionName) {
        // We want a readonly grid so lets hide all editing functions
        case 'BulkUpdate':
        case 'CellValidation':
        case 'PlusMinus':
        case 'SmartEdit':
        case 'Shortcut':
          return 'ReadOnly';
        case 'AdvancedSearch':
        case 'ColumnFilter':
        case 'UserFilter':
        case 'DataSource':
        case 'QuickSearch':
          return getMockPermissionServerResult(functionName, userName, adaptableId);
      }
    },
*/
    FunctionEntitlements: [
      {
        FunctionName: 'ColumnCategory',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'ColumnChooser',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'Export',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'ColumnFilter',
        AccessLevel: 'ReadOnly',
      },
      {
        FunctionName: 'Layout',
        AccessLevel: 'ReadOnly',
      },
      {
        FunctionName: 'CustomSort',
        AccessLevel: 'Hidden',
      },
    ],
  },
  Export: {
    Reports: [
      {
        ColumnIds: [],
        Expression: {
          ColumnValueExpressions: [],
          FilterExpressions: [],
          RangeExpressions: [],
        },
        Name: 'Test',
        ReportColumnScope: 'AllColumns',
        ReportRowScope: 'AllRows',
      },
    ],
    CurrentReport: 'Test',
  },
};

function getMockPermissionServerResult(
  functionName: AdaptableFunctionName,
  userName: string,
  adaptableId: string
): AccessLevel {
  return 'Full';
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
