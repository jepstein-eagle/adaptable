import React, { useRef, useState, useEffect, ReactNode, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridOptions, GridApi, ColumnApi, GridReadyEvent } from 'ag-grid-community';

import { IAdaptableBlotterOptions } from '../../adaptableblotter/types';

import { AdaptableBlotterApp } from '../../adaptableblotter/App_Scripts/View/AdaptableBlotterView';
import AdaptableBlotter from '../../adaptableblotter/App_Scripts/agGrid';
import DefiniteHeight from './DefiniteHeight';
import {
  ISearchChangedEventArgs,
  IThemeChangedEventArgs,
  IStateChangedEventArgs,
  IColumnStateChangedEventArgs,
  IAlertFiredEventArgs,
} from '../../adaptableblotter/App_Scripts/Utilities/Interface/IStateEvents';

import useEventListener from './useEventListener';
import { IEventApi } from '../../adaptableblotter/App_Scripts/Api/Interface/IEventApi';

export {
  ISearchChangedEventArgs,
  IThemeChangedEventArgs,
  IStateChangedEventArgs,
  IColumnStateChangedEventArgs,
  IAlertFiredEventArgs,
};

type TypeAgGridApiParams = { api: GridApi; columnApi: ColumnApi; type: string };
type TypeFactory =
  | string
  | typeof React.Component
  | (({ children }: { children: ReactNode }) => ReactNode);
type TypeChildren = ({ blotter, grid }: { blotter: ReactNode; grid: ReactNode }) => ReactNode;

const join = (...args: any[]): string => args.filter(x => !!x).join(' ');

const getRandomInt = (max: number): number => Math.floor(Math.random() * Math.floor(max));

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
  onSearchChanged,
  onThemeChanged,
  onStateChanged,
  onColumnStateChanged,
  onAlertFired,
  ...props
}: {
  onReady?: (ab: AdaptableBlotter) => void;
  agGridTheme?: string;
  renderGrid?: (gridOptions: GridOptions) => typeof AgGridReact;
  blotterOptions: IAdaptableBlotterOptions;
  gridOptions: GridOptions;
  onSearchChanged?: (blotter: AdaptableBlotter, args: ISearchChangedEventArgs) => void;
  onThemeChanged?: (blotter: AdaptableBlotter, args: IThemeChangedEventArgs) => void;
  onStateChanged?: (blotter: AdaptableBlotter, args: IStateChangedEventArgs) => void;
  onColumnStateChanged?: (blotter: AdaptableBlotter, args: IColumnStateChangedEventArgs) => void;
  onAlertFired?: (blotter: AdaptableBlotter, args: IAlertFiredEventArgs) => void;
  tagName?: TypeFactory;
} & React.HTMLProps<HTMLElement> & { children?: TypeChildren; render?: TypeChildren }) => {
  const seedId = useMemo(() => `${getRandomInt(1000)}-${Date.now()}`, []);
  const blotterContainerId = `blotter-${seedId}`;
  const gridContainerId = `grid-${seedId}`;

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
        containerOptions: {
          ...blotterOptions.containerOptions,
          adaptableBlotterContainer: blotterContainerId,
          vendorContainer: gridContainerId,
        },
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
        id: gridContainerId,
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

  useEventListener(onSearchChanged, blotter, (eventApi: IEventApi) => eventApi.onSearchedChanged());
  useEventListener(onThemeChanged, blotter, (eventApi: IEventApi) => eventApi.onThemeChanged());
  useEventListener(onColumnStateChanged, blotter, (eventApi: IEventApi) =>
    eventApi.onColumnStateChanged()
  );
  useEventListener(onStateChanged, blotter, (eventApi: IEventApi) => eventApi.onStateChanged());
  useEventListener(onAlertFired, blotter, (eventApi: IEventApi) => eventApi.onAlertFired());

  return (
    <TagName
      {...props}
      id={blotterContainerId}
      className={join(props.className, 'ab__react-wrapper')}
    >
      {children}
    </TagName>
  );
};

export default AdaptableBlotterReact;
