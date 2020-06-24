import React, { useMemo } from 'react';
import AdaptableReactAggrid from '../../../src';
import { AgGridReact } from '@ag-grid-community/react';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';
import { ExamplesHelper } from '../../ExamplesHelper';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';
import LoggingHelper from '../../../../adaptable/src/Utilities/Helpers/LoggingHelper';

import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { ClientSideRowModelModule, GridOptions } from '@ag-grid-community/all-modules';

import charts from '../../../../plugins/charts/src';
import './index.css';

const examplesHelper = new ExamplesHelper();

const StatusCmp = (props: any) => (
  <div>
    <b>{props.value}!!!</b>
  </div>
);

export default () => {
  const gridOptions = useMemo((): GridOptions => {
    const options: GridOptions = {
      sideBar: true,
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
      rowData: examplesHelper.getTrades(500),
      enableRangeSelection: true,
      defaultColDef: { floatingFilter: true },
      suppressMenuHide: true,
    };

    return options;
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexFlow: 'column',
      }}
    >
      <AdaptableReactAggrid
        onAdaptableReady={({ adaptableApi: api, vendorGrid: gridOptions }) => {
          console.log('Adaptable ready', api, gridOptions);

          (global as any).api = api;
          (global as any).gridOptions = gridOptions;
          api.eventApi.on('SearchChanged', (...args: any[]) => {
            // LoggingHelper.LogAdaptableWarning('search changed', args);
          });

          api.eventApi.on('SelectionChanged', selargs => {
            // console.log(selargs);
          });

          setTimeout(() => {
            setInterval(() => {
              const index = Math.round(Math.random() * gridOptions.rowData.length);
              let data = gridOptions.rowData[index];
              if (data) {
                data = { ...data };
                data.price = Math.round(Math.random() * 100);
                data.amount = Math.round(Math.random() * 100);

                console.log(data);

                gridOptions.api.applyTransactionAsync({ update: [data] });
              }
            }, 100);
          }, 500);
        }}
        gridOptions={gridOptions}
        adaptableOptions={{
          primaryKey: 'tradeId',
          adaptableId: 'BYOP demos',

          plugins: [charts()],
          userInterfaceOptions: {
            showAdaptableToolPanel: true,
          },
        }}
      />
      <div className="ag-theme-alpine" style={{ flex: 1 }}>
        <AgGridReact
          gridOptions={gridOptions}
          modules={[SideBarModule, MenuModule, RangeSelectionModule, ClientSideRowModelModule]}
        />
      </div>
    </div>
  );
};
