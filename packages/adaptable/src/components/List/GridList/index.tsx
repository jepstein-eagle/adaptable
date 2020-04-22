import * as React from 'react';
import { ReactNode } from 'react';
import { DataSource, GridFactory } from '@adaptabletools/grid';

const baseClassName = 'ab-GridList';

export interface GridListProps {
  children: ReactNode[];
  rowHeight?: number;
}

type GridListItem = {
  item: ReactNode;
  id: number;
};

const Grid = GridFactory<GridListItem>();

const GridList = (props: GridListProps) => {
  const data = React.Children.map(props.children, (c, index) => {
    return {
      item: c,
      id: index,
    };
  });
  return (
    <DataSource<GridListItem> data={data} primaryKey="id" fields={['item', 'id']}>
      <Grid
        rowHeight={props.rowHeight || 30}
        domProps={{ className: baseClassName, style: { minHeight: '15rem' } }}
        columns={[{ field: 'item', header: null, flex: 1 }]}
      ></Grid>
    </DataSource>
  );
};
export default GridList;
