import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../App_Scripts/agGrid';
import { AdaptableOptions } from '../../../../App_Scripts/types';

import config from './config';

import jsonData from './dataset.json';
import { PredefinedConfig } from '../../../../types';

LicenseManager.setLicenseKey(process.env.AG_GRID_LICENSE!);

const getBasicNorthwindColumnSchema = (): any[] => {
  var schema = [];
  schema.push({
    headerName: 'Order Id',
    field: 'OrderId',
    editable: true,
    cellClass: 'number-cell',
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Cust. Ref',
    field: 'CustomerReference',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Company',
    field: 'CompanyName',
    editable: true,
    filter: true,
    sortable: true,
    enableRowGroup: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Contact',
    field: 'ContactName',
    filter: true,
    sortable: true,
    enableRowGroup: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Employee',
    field: 'Employee',
    filter: 'text',
    editable: true,
    sortable: true,
    enableRowGroup: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Order Date',
    field: 'OrderDate',
    editable: true,
    cellEditorParams: { useFormatter: true },
    filter: true,
    sortable: true,
    type: 'abColDefDate',
  });
  schema.push({
    headerName: 'Rqd Date',
    field: 'RequiredDate',
    editable: true,
    cellEditorParams: { useFormatter: true },
    filter: true,
    sortable: true,
    type: 'abColDefDate',
  });
  schema.push({
    headerName: 'Invoiced',
    field: 'InvoicedCost',
    cellClass: 'number-cell',

    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Order Cost',
    field: 'OrderCost',
    cellClass: 'number-cell',

    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Package Cost',
    field: 'PackageCost',
    cellClass: 'number-cell',

    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Item Cost',
    field: 'ItemCost',
    cellClass: 'number-cell',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Item Count',
    field: 'ItemCount',
    cellClass: 'number-cell',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Change Last Order',
    field: 'ChangeLastOrder',
    cellClass: 'number-cell',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Ship Via',
    field: 'ShipVia',
    filter: 'text',
    editable: true,
    sortable: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Freight',
    field: 'Freight',
    cellClass: 'number-cell',

    editable: true,
    sortable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Ship Name',
    field: 'ShipName',
    columnGroupShow: 'open',
    editable: true,
    sortable: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Ship Address',
    field: 'ShipAddress',
    editable: true,
    sortable: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Ship City',
    field: 'ShipCity',
    sortable: true,
    type: 'abColDefString',
  });
  // schema.push({ headerName: "Ship Postal Code", field: "ShipPostalCode", sortable: true, type: 'abColDefString', });
  schema.push({
    headerName: 'Ship Region',
    field: 'ShipRegion',
    filter: 'text',
    editable: true,
    sortable: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Ship Country',
    field: 'ShipCountry',
    filter: 'text',
    editable: true,
    sortable: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Shipped Date',
    field: 'ShippedDate',
    editable: true,
    cellEditorParams: { useFormatter: true },

    filter: true,
    sortable: true,
    type: 'abColDefDate',
  });
  return schema;
};

function InitAdaptableBlotter() {
  const gridOptions: GridOptions = {
    columnDefs: getBasicNorthwindColumnSchema(),
    rowData: jsonData,
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
    suppressMenuHide: true,
    sideBar: undefined,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefObject: {},
    },
  };
  const adaptableOptions: AdaptableOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'config blotter demo',
    predefinedConfig: config as PredefinedConfig,
  };

  const adaptableApi = Adaptable.init(adaptableOptions);
  setTimeout(() => {
    if (adaptableApi.layoutApi.getCurrentLayoutName() === 'Ab_Default_Layout') {
      gridOptions.columnApi!.autoSizeAllColumns();
    }
  });
}

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
