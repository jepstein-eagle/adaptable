import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridOptions, GridApi, ColumnApi, GridReadyEvent } from 'ag-grid-community';

import { IAdaptableBlotterOptions } from '../../adaptableblotter/types';

import { AdaptableBlotterApp } from '../../adaptableblotter/App_Scripts/View/AdaptableBlotterView';
import AdaptableBlotter from '../../adaptableblotter/App_Scripts/agGrid';
import DefiniteHeight from './DefiniteHeight';

type TypeAgGridApiParams = { api: GridApi; columnApi: ColumnApi; type: string };
type TypeFactory =
  | string
  | typeof React.Component
  | (({ children }: { children: ReactNode }) => ReactNode);
type TypeChildren = ({ blotter, grid }: { blotter: ReactNode; grid: ReactNode }) => ReactNode;

const join = (...args: any[]): string => args.filter(x => !!x).join(' ');

const getAgGridWrapperClassName = (agGridTheme: string) => {
  const themeClassName =
    agGridTheme.indexOf('ag-theme') === 0 ? agGridTheme : `ag-theme-${agGridTheme}`;

  return `ab__aggrid-wrapper ab--flex-fill ${themeClassName}`;
};

const AdaptableBlotterReact = ({
  blotterOptions,
  gridOptions,
  tagName,
  agGridTheme,
  renderGrid,
  render,
  onReady,
  ...props
}: {
  onReady?: (ab: AdaptableBlotter) => void;
  agGridTheme?: string;
  renderGrid?: (gridOptions: GridOptions) => typeof AgGridReact;
  blotterOptions: IAdaptableBlotterOptions;
  gridOptions: GridOptions;
  tagName?: TypeFactory;
} & React.HTMLProps<HTMLElement> & { children?: TypeChildren; render?: TypeChildren }) => {
  const [blotter, setBlotter] = useState<AdaptableBlotter | null>(null);
  const TagName = tagName || 'div';
  agGridTheme = agGridTheme || 'balham';

  const agGridApiRef = useRef<{ agGridApi: GridApi | null; agGridColumnApi: ColumnApi | null }>({
    agGridApi: null,
    agGridColumnApi: null,
  });

  const onGridReady = (params: TypeAgGridApiParams) => {
    agGridApiRef.current = { agGridApi: params.api, agGridColumnApi: params.columnApi };

    const blotterInstance = new AdaptableBlotter(
      {
        ...blotterOptions,
        vendorGrid: { ...gridOptions, api: params.api, columnApi: params.columnApi },
      },
      false
    );

    setBlotter(blotterInstance);

    if (onReady) {
      onReady(blotterInstance);
    }

    if (gridOptions.onGridReady) {
      gridOptions.onGridReady(params);
    }
  };

  const agGridOptions = { ...gridOptions, onGridReady };
  const agGrid = renderGrid ? renderGrid(agGridOptions) : <AgGridReact {...agGridOptions} />;

  const blotterNode = blotter ? (
    <AdaptableBlotterApp key="blotter" AdaptableBlotter={blotter} />
  ) : null;

  const gridWrapperNode = (
    <DefiniteHeight
      key="agGridWrapper"
      style={{ flex: 1 }}
      childProps={{
        className: getAgGridWrapperClassName(agGridTheme),
        style: { visibility: blotter ? 'visible' : 'hidden' },
      }}
    >
      {agGrid}
    </DefiniteHeight>
  );

  let children: ReactNode | ReactNode[] = [blotterNode, gridWrapperNode];

  const renderFn = render || props.children;

  if (typeof renderFn === 'function') {
    children = renderFn({
      blotter: blotterNode,
      grid: gridWrapperNode,
    });
  }

  return (
    <TagName {...props} className={join(props.className, 'ab__react-wrapper')}>
      {children}
    </TagName>
  );
};

export default AdaptableBlotterReact;
