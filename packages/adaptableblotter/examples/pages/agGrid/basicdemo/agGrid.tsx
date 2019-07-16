import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/base.scss';

import '../../../../App_Scripts/themes/dark.scss';
import '../../../../App_Scripts/themes/light.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  AlertFiredEventArgs,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ActionColumnEventArgs } from '../../../../App_Scripts/Api/Events/BlotterEvents';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  gridOptions.getRowStyle = function(params: any) {
    if (params.node.rowIndex % 2 === 0) {
      return { background: 'red' };
    } else {
      return { background: 'yellow' };
    }
  };
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'basic demo'
  );

  adaptableBlotterOptions.predefinedConfig = demoConfig;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
  adaptableblotter.applyLightTheme();

  adaptableblotter.api.eventApi
    .onActionColumnClicked()
    .Subscribe((sender, actionColumnEventArgs) =>
      listenToActionColumnClicked(actionColumnEventArgs)
    );
}

function listenToActionColumnClicked(actionColumnEventArgs: ActionColumnEventArgs) {
  console.log('alert fired event received');
  console.log(actionColumnEventArgs);
}

let demoConfig: PredefinedConfig = {
  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Hello',
        ButtonText: 'Edit',
      },
    ],
  },

  ColumnFilter: {
    ColumnFilters: [
      {
        Filter: {
          ColumnValueExpressions: [
            {
              ColumnDisplayValues: ['EUR', 'GBP'],
              ColumnId: 'currency',
            },
          ],
        },
        ColumnId: 'currency',
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
