import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  AdaptableApi,
  ToolbarVisibilityChangedInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import ReactDOM from 'react-dom';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Dashboard Tabs Demo',
    userInterfaceOptions: {},
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: {
      Dashboard: {
        Revision: 10,
        CanFloat: true,
        CustomToolbars: [
          {
            Name: 'Deal Info (Default)',
            Title: 'Deal Info',
          },
          {
            Name: 'Deal Info (Detailed)',
            Title: 'Deal Info',
          },
        ],
        ShowFunctionsDropdown: true,
        Tabs: [
          {
            Name: 'Search',
            Toolbars: [
              'QuickSearch',
              'DataSource',
              'Query',
              'Deal Info (Detailed)',
              'Deal Info (Default)',
            ], //shouldnt see last one cos of entitlements
          },
        ],
        CustomButtons: [
          {
            Name: 'btnToolbar1',
            Caption: 'First Toolbar btn',
            ButtonStyle: {
              Variant: 'text',
              Tone: 'success',
            },
          },
          {
            Name: 'btnToolbar2',
            Caption: 'Second Toolbar btn',
            ButtonStyle: {
              Variant: 'raised',
              Tone: 'accent',
            },
          },
        ],
      },

      Entitlements: {
        Revision: 2,
        DefaultAccessLevel: 'Full',
        FunctionEntitlements: [
          {
            FunctionName: 'Query',
            AccessLevel: 'Hidden',
          },
        ],
      },
    },
  };

  api = await Adaptable.init(adaptableOptions);

  api.eventApi.on('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs => {
    let toolbarVisibilityChangedInfo: ToolbarVisibilityChangedInfo =
      toolbarVisibilityChangedEventArgs.data[0].id;
    console.log('toolbarVisibilityChangedInfo');
    console.log(toolbarVisibilityChangedInfo);
    if (toolbarVisibilityChangedInfo.visibility === 'Visible') {
      let contentsDiv = api.dashboardApi.getCustomToolbarContentsDiv(
        toolbarVisibilityChangedEventArgs.data[0].id.toolbar
      );
      if (toolbarVisibilityChangedInfo.toolbar === 'Deal Info (Default)') {
        if (contentsDiv) {
          let toolbarContents: any = (
            <div style={{ display: 'flex' }}>
              <span>I'm deal info default</span>
            </div>
          );
          ReactDOM.render(toolbarContents, contentsDiv);
        }
      } else if (toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Deal Info (Detailed)') {
        let toolbarContents: any = (
          <div style={{ display: 'flex' }}>
            <span>I'm deal info Detailed</span>
          </div>
        );
        ReactDOM.render(toolbarContents, contentsDiv);
      }
    } else {
      console.log('Couldnt find div to render custom content');
    }
  });
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
