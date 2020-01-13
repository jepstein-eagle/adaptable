import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(5000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'entitlements demo'
  );

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
  Entitlements: {
    FunctionEntitlements: [
      {
        FunctionName: 'ColumnCategory',
        AccessLevel: 'Hidden',
      },
      {
        FunctionName: 'ColumnChooser',
        AccessLevel: 'Hidden',
      },
      {
        FunctionName: 'Export',
        AccessLevel: 'Hidden',
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

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
