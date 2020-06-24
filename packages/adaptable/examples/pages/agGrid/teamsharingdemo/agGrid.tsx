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

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Team Sharing Demo',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
      useCustomMacLikeScrollbars: true,
    },
    teamSharingOptions: {
      enableTeamSharing: true,
      async getSharedEntities(adaptableId) {
        return new Promise(resolve => {
          const sharedEntities = JSON.parse(
            localStorage.getItem(`TEAM_SHARING:${adaptableId}`) || '[]'
          );
          resolve(sharedEntities);
        });
      },
      async setSharedEntities(adaptableId, sharedEntities) {
        return new Promise(resolve => {
          localStorage.setItem(`TEAM_SHARING:${adaptableId}`, JSON.stringify(sharedEntities));
          resolve();
        });
      },
    },
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: {
      Dashboard: {
        Tabs: [
          {
            Name: 'General',
            Toolbars: ['Layout'],
          },
        ],
        VisibleButtons: ['ConditionalStyle', 'TeamSharing'],
      },
      Entitlements: {
        Revision: 2,
        FunctionEntitlements: [
          {
            FunctionName: 'TeamSharing',
            AccessLevel: 'Full',
          },
        ],
      },
    },
  };

  api = await Adaptable.init(adaptableOptions);
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
