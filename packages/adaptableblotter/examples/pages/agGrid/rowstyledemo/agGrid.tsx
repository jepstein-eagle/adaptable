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
import { AdaptableOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'row style demo'
  );

  adaptableOptions.predefinedConfig = demoConfig;
  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  UserInterface: {
    RowStyles: [
      /*
      {
        Style: {
          ForeColor: 'yellow',
          BackColor: 'purple',
          FontWeight: 'Bold',
          // ClassName: 'allRowStyle',
        },
        RowType: 'All',
      },
      */
      {
        Style: {
          ForeColor: 'yellow',
          BackColor: 'orange',
          FontWeight: 'Bold',
          ClassName: 'evenRowStyle',
        },
        RowType: 'Even',
      },
      {
        Style: {
          ForeColor: 'cyan',
          BackColor: 'brown',
          FontStyle: 'Italic',
          ClassName: 'oddRowStyle',
        },
        RowType: 'Odd',
      },
    ],
  },
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
