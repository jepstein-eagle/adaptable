import * as React from 'react';

import { GridFactory, DataSource } from '@adaptabletools/grid';
import '@adaptabletools/grid/index.css';
import './index.css';

type Order = {
  OrderId: number;
  CompanyName: string;
  ContactName: string;
  ShipVia: string;
  ItemCount: number;
};

const DataGrid = GridFactory<Order>();

const dataSource = () => {
  if (process.browser) {
    return fetch(
      'https://json-server.adaptabletools.com/orders?_limit=100&ShipVia_like=Federal'
    ).then(response => response.json());
  }

  return [];
};
export default () => {
  return (
    <DataSource<Order>
      primaryKey="OrderId"
      data={dataSource}
      fields={['OrderId', 'ItemCount', 'ContactName', 'CompanyName', 'ShipVia']}
    >
      <DataGrid
        domProps={{ style: { height: '90vh' } }}
        columns={[
          {
            field: 'OrderId',
            flex: 1,
          },
          {
            field: 'ItemCount',
            type: 'number',
            flex: 1,
          },
          {
            field: 'CompanyName',
            flex: 1,
          },
          {
            field: 'ContactName',
            flex: 1,
          },

          {
            field: 'ShipVia',
            flex: 1,
          },
        ]}
      ></DataGrid>
    </DataSource>
  );
};
