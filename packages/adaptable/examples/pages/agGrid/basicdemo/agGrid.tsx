import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo New',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: {
      /*
      Dashboard: {
        Revision: 17,
        VisibleToolbars: ['QuickSearch', 'AdvancedSearch', 'Layout'],
        VisibleButtons: ['CellSummary'],
        ShowFunctionsDropdown: true,
        HomeToolbarTitle: 'Hello world',
      },
*/
      AdvancedSearch: {
        Revision: 4,
        AdvancedSearches: [],
      },
      QuickSearch: {
        Revision: 11,
        QuickSearchText: 'b',
      },
      Entitlements: {
        Revision: 3,
        DefaultAccessLevel: 'Hidden',
        FunctionEntitlements: [
          {
            FunctionName: 'Layout',
            AccessLevel: 'Full',
          },
          {
            FunctionName: 'Dashboard',
            AccessLevel: 'Full',
          },
        ],
      },
    },
  };

  api = Adaptable.init(adaptableOptions);
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
