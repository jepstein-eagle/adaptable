import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions, Column } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  AdaptableApi,
  AdaptableReadyInfo,
  SearchChangedEventArgs,
  ToolbarButtonClickedInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import { TickingDataHelper } from '../../TickingDataHelper';
import { Layout } from '../../../../src/PredefinedConfig/LayoutState';
import { ToolbarButton } from '../../../../src/PredefinedConfig/Common/ToolbarButton';
import Mousetrap from 'mousetrap';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Hotkeys Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
  };

  api = Adaptable.init(adaptableOptions);

  // using mousetrap as dependency
  Mousetrap.bind('alt+shift+1', () => api.advancedSearchApi.showAdvancedSearchPopup());
  Mousetrap.bind('alt+shift+2', () => api.calculatedColumnApi.showCalculatedColumnPopup());
  Mousetrap.bind('alt+shift+3', () => api.layoutApi.showLayoutPopup());
  Mousetrap.bind('alt+shift+4', () => api.quickSearchApi.showQuickSearchPopup());

  // using no dependency
  document.addEventListener('keydown', event => {
    const { key, altKey, ctrlKey, shiftKey, metaKey } = event;

    // metaKey is command on Mac and windows key on PC
    if (key === 'L' && metaKey && shiftKey) {
      api.layoutApi.showLayoutPopup();
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
