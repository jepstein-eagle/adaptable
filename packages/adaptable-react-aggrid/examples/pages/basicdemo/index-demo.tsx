import React from 'react';
import AdaptableReactAggrid from '../../../src';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';
import { ExamplesHelper } from '../../ExamplesHelper';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import LoggingHelper from '../../../../adaptable/src/Utilities/Helpers/LoggingHelper';

import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';

import charts from '../../../../plugins/charts/src';
import './index.css';

const examplesHelper = new ExamplesHelper();

const StatusCmp = (props: any) => (
  <div>
    <b>{props.value}!!!</b>
  </div>
);

export default () => (
  <AdaptableReactAggrid
    style={{ height: '100vh' }}
    modules={[SideBarModule, MenuModule, RangeSelectionModule]}
    onAdaptableReady={(api, gridOptions) => {
      console.log('Adaptable ready', api, gridOptions);

      api.eventApi.on('SearchChanged', (...args: any[]) => {
        LoggingHelper.LogAdaptableWarning('search changed', args);
      });

      api.eventApi.on('SelectionChanged', selargs => {
        console.log(selargs);
      });
    }}
    gridOptions={{
      columnTypes: {
        abColDefNumber: {},
        abColDefString: {},
        abColDefBoolean: {},
        abColDefDate: {},
        abColDefNumberArray: {},
        abColDefObject: {},
        abColDefCustom: {},
      },
      columnDefs: examplesHelper.getTradeSchema().map(c => {
        if (c.field === 'status') {
          c.cellRendererFramework = StatusCmp;
        }

        return c;
      }),
      rowHeight: 33,
      rowData: examplesHelper.getTrades(500),
      enableRangeSelection: true,
      floatingFilter: true,
      suppressMenuHide: true,
    }}
    adaptableOptions={{
      primaryKey: 'tradeId',
      adaptableId: 'BYOP demos',
      plugins: [charts()],
    }}
  />
);
