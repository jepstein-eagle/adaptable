import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions, Column } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTradePivoting(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Pivot Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  (adaptableOptions.layoutOptions = {
    //  autoSaveLayouts: false,
  }),
    (adaptableOptions.filterOptions = {
      useVendorFilterFormStyle: true,
      autoApplyFilter: false,
    });

  adaptableOptions.predefinedConfig = demoConfig;

  const adaptable = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  CustomSort: {
    CustomSorts: [
      {
        ColumnId: 'status',
        SortedValues: ['Pending', 'Completed', 'Rejected'],
      },
    ],
  },
  Layout: {
    Layouts: [
      {
        Name: 'Not Pivot Layout',
        Columns: ['deskId', 'country', 'currency', 'bid', 'ask', 'notional', 'counterparty'],
        GroupedColumns: ['currency'],
      },
      {
        ColumnSorts: [],
        Columns: [],
        GroupedColumns: ['country', 'currency'],
        PivotDetails: {
          PivotColumns: ['status'],
          AggregationColumns: ['notional', 'price'],
        },
        Name: 'Pivot Layout',
      },
      {
        Columns: ['price', 'bidOfferSpread', 'stars'],
        Name: 'second Layout',
      },
    ],
    //  CurrentLayout: 'Pivot Layout',
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

/*
ColumnGroupState: "[{"groupId":"FAKE_PATH_ag-Grid-AutoColumn}_0","open":null},{"groupId":"pivot0","open":false},{"groupId":"pivot4","open":false},{"groupId":"pivot2","open":false}]"
ColumnState: "[{"colId":"ag-Grid-AutoColumn","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"tradeId","hide":false,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"country","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":0},{"colId":"notional","hide":false,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"stars","hide":true,"aggFunc":"sum","width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"changeOnYear","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"tradeDate","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"bid","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"bloombergBid","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"ask","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"bloombergAsk","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"counterparty","hide":false,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"currency","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"status","hide":true,"aggFunc":null,"width":200,"pivotIndex":0,"pinned":null,"rowGroupIndex":null},{"colId":"bidOfferSpread","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"price","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"dv01","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"isLive","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"moodysRating","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"sandpRating","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"settlementDate","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"lastUpdatedBy","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"lastUpdated","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"percentChange","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"deskId","hide":true,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null}]"



0: {groupId: "FAKE_PATH_ag-Grid-AutoColumn}_0", open: null, Uuid: "2792175b-b4cf-4886-8cb5-e0549b50fdd1"}
1: {groupId: "pivot0", open: false, Uuid: "fb80ff86-f265-4766-ba89-35aee3ef6bdf"}
2: {groupId: "pivot4", open: false, Uuid: "50051c1e-0e88-4536-931e-4455d275c675"}
3: {groupId: "pivot2", open: false, Uuid: "f1eb5c94-d945-49bd-be96-d8992f39b37d"}
length: 4
*/
