import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham-dark.css';
import { ModuleRegistry, AllModules } from '@ag-grid-enterprise/all-modules';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';
import AdaptableReactAgGrid, { AdaptableApi } from '../../../src';
import { ExamplesHelper } from '../../ExamplesHelper';

ModuleRegistry.registerModules(AllModules);

const COLUMN_TYPES = {
  NUMBER: 'abColDefNumber',
  STRING: 'abColDefString',
  BOOL: 'abColDefBoolean',
  DATE: 'abColDefDate',
  OBJECT: 'abColDefObject',
  NUMBER_ARRAY: 'abColDefNumberArray',
};
let ID = 1;

interface GridProps {}
const examplesHelper = new ExamplesHelper();
const columnDefs = examplesHelper.getTradeSchema().filter(c => {
  if (c.field === 'tradeId' || c.field === 'notional') {
    return true;
  }
  return false;
});

let unmounted: any = {};

export default function Grid({}: GridProps) {
  const [id] = useState(`${ID++}`);
  const [mounted, setMounted] = useState(true);

  const rowData = useMemo(
    () =>
      examplesHelper.getTrades(20).map(x => {
        return {
          ...x,
          tradeId: x.tradeId + Number(id) * 100000,
        };
      }),
    [id]
  );

  const gridOptions = {
    floatingFilter: true,
    reactNext: true,
    enableRangeSelection: true,
    suppressMultiRangeSelection: true,
    deltaRowDataMode: true,
    rowDeselection: true,
    columnDefs,
    columnTypes: {
      [COLUMN_TYPES.NUMBER]: {},
      [COLUMN_TYPES.STRING]: {},
      [COLUMN_TYPES.BOOL]: {},
      [COLUMN_TYPES.DATE]: {},
      [COLUMN_TYPES.OBJECT]: {},
      [COLUMN_TYPES.NUMBER_ARRAY]: {},
    },
    defaultColDef: {
      width: 200,
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      enableRowGroup: true,
      enableValue: true,
      enablePivot: true,
    },
    rowData,
    getRowNodeId: (order: any) => order.tradeId,
  };

  const adaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'pilot',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
      adaptableToolPanelTitle: 'Grid Management',
    },
    layoutOptions: {
      includeVendorStateInLayouts: true,
      autoSaveLayouts: true,
    },
    filterOptions: {
      indicateFilteredColumns: true,
      useAdaptableFilterForm: true,
      useAdaptableQuickFilter: true,
    },
    queryOptions: {
      maxColumnValueItemsDisplayed: 200,
    },
    predefinedConfig: {
      Theme: {
        CurrentTheme: 'dark',
        SystemThemes: [{ Name: 'dark', Description: 'Dark Theme' }],
      },
    },
  };

  const handleAdaptableReady = useCallback(
    ({ adaptableApi, vendorGrid }: { adaptableApi: AdaptableApi; vendorGrid: any }) => {
      const api = vendorGrid.api;
      api.__id = id;
      setInterval(() => {
        // console.log(vendorGrid?.api === adaptableApi.gridApi.)
        // adaptableApi.gridApi.updateGridData([order]);
        // tickingDataHelper.useTickingDataagGrid(vendorGrid, adaptableApi, 2000, 20, true);
        // tslint:disable-next-line:no-unused-expression
        const data = { ...rowData[1] };

        data.notional = Math.random();

        api!.updateRowData({
          ['update']: [data],
        });
      }, 1000);
    },
    []
  );

  useEffect(() => {
    return () => {
      console.log(`GRID ${id} is destroyed!!!!`);
      unmounted[id] = true;
    };
  }, []);

  return (
    <div
      className="ag-theme-balham-dark"
      style={{
        height: '800px',
        width: '800px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>Grid: {id}</h2>
      <AdaptableReactAgGrid
        style={{ height: '100vh' }}
        agGridTheme="dark"
        modules={AllModules}
        gridOptions={gridOptions}
        adaptableOptions={{ ...adaptableOptions, adaptableId: id }}
        onAdaptableReady={handleAdaptableReady}
      />
    </div>
  );
}
