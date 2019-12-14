import * as React from 'react';
import { useState, useEffect, ReactNode, useMemo } from 'react';
import * as AgGrid from 'ag-grid-community';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { AdaptableBlotterApp } from '../../adaptableblotter/App_Scripts/View/AdaptableBlotterView';
import AdaptableBlotter from '../../adaptableblotter/App_Scripts/agGrid';
import { BlotterApi } from '../../adaptableblotter/types';
import AbsoluteFlexContainer from './AbsoluteFlexContainer';
import {
  AdaptableBlotterOptions,
  SearchChangedEventArgs,
  ThemeChangedEventArgs,
  ColumnStateChangedEventArgs,
  AlertFiredEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
  ToolbarVisibilityChangedEventArgs,
  ApplicationToolbarButtonClickedEventArgs,
  LiveReportUpdatedEventArgs,
} from '../../adaptableblotter/types';
import { AuditLogEventArgs } from '../../adaptableblotter/App_Scripts/Api/Events/AuditEvents';
export * from '../../adaptableblotter/types';

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

class AgGridReactOverride extends AgGridReact {
  public gridOptions: any;
  public api: any;
  public columnApi: any;
  public eGridDiv!: HTMLElement;

  componentDidMount() {
    const gridParams = {
      seedBeanInstances: {
        agGridReact: this,
      },
    };

    let gridOptions = this.props.gridOptions || {};
    if (AgGridColumn && (AgGridColumn as any).hasChildColumns(this.props)) {
      gridOptions.columnDefs = (AgGridColumn as any).mapChildColumnDefs(this.props);
    }

    this.gridOptions = (AgGrid as any).ComponentUtil.copyAttributesToGridOptions(
      gridOptions,
      this.props
    );

    const { blotterFactory } = this.props as any;

    const blotter = blotterFactory(this);

    // don't need the return value
    // new AgGrid.Grid(this.eGridDiv, this.gridOptions, gridParams);

    this.api = blotter.gridOptions.api;
    this.columnApi = blotter.gridOptions.columnApi;
  }
}

const createBlotter = ({
  blotterOptions,
  gridOptions,
  blotterContainerId,
  gridContainerId,
  agGridReactWrapperInstance,
}: {
  blotterOptions: AdaptableBlotterOptions;
  gridOptions: AgGrid.GridOptions;
  blotterContainerId: string;
  gridContainerId: string;
  agGridReactWrapperInstance: AgGridReactOverride;
}): AdaptableBlotter => {
  return new AdaptableBlotter(
    {
      ...blotterOptions,
      containerOptions: {
        ...blotterOptions.containerOptions,
        adaptableBlotterContainer: blotterContainerId,
        vendorContainer: gridContainerId,
      },
      vendorGrid: gridOptions,
    },
    false,
    {
      instantiateGrid: (vendorContainer: HTMLElement, gridOptions) => {
        const gridParams = {
          seedBeanInstances: {
            agGridReact: agGridReactWrapperInstance,
          },
        };
        return new AgGrid.Grid(vendorContainer, gridOptions, gridParams);
      },
    }
  );
};

const AdaptableBlotterReact = ({
  blotterOptions,
  gridOptions,
  tagName,
  agGridTheme,
  render,
  onActionColumnClicked,
  onAlertFired,
  onApplicationToolbarButtonClicked,
  onColumnStateChanged,
  onLiveReportUpdated,
  onSearchChanged,
  onSelectionChanged,
  onThemeChanged,
  onToolbarVisibilityChanged,
  onAuditStateChanged,
  onAuditCellEdited,
  onAuditFunctionApplied,

  onBlotterReady,
  ...props
}: {
  agGridTheme?: string;
  blotterOptions: AdaptableBlotterOptions;
  gridOptions: AgGrid.GridOptions;

  onBlotterReady?: (api: BlotterApi) => void;
  onToolbarVisibilityChanged?: (
    toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs
  ) => void;
  onSearchChanged?: (searchChangedEventArgs: SearchChangedEventArgs) => void;
  onApplicationToolbarButtonClicked?: (
    applicationToolbarButtonClickedEventArgs: ApplicationToolbarButtonClickedEventArgs
  ) => void;
  onThemeChanged?: (themeChangedEventArgs: ThemeChangedEventArgs) => void;
  onColumnStateChanged?: (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => void;
  onAlertFired?: (alertFiredEventArgs: AlertFiredEventArgs) => void;
  onActionColumnClicked?: (actionColumnClickedEventArgs: ActionColumnClickedEventArgs) => void;
  onSelectionChanged?: (selectionChangedEventArgs: SelectionChangedEventArgs) => void;
  onLiveReportUpdated?: (liveReportUpdatedEventArgs: LiveReportUpdatedEventArgs) => void;

  onAuditStateChanged?: (auditStateChangedArgs: AuditLogEventArgs) => void;
  onAuditCellEdited?: (auditCellEditedArgs: AuditLogEventArgs) => void;
  onAuditFunctionApplied?: (auditFunctionAppliedArgs: AuditLogEventArgs) => void;

  tagName?: TypeFactory;
} & React.HTMLProps<HTMLElement> & { children?: TypeChildren; render?: TypeChildren }) => {
  const seedId = useMemo(() => `${getRandomInt(1000)}-${Date.now()}`, []);
  const blotterContainerId = `blotter-${seedId}`;
  const gridContainerId = `grid-${seedId}`;

  const [mounted, setMounted] = useState<boolean>(false);

  const blotterFactory = useMemo(() => {
    return (agGridReactWrapperInstance: AgGridReactOverride) => {
      const blotter = createBlotter({
        gridOptions,
        blotterOptions,
        gridContainerId,
        blotterContainerId,
        agGridReactWrapperInstance,
      });
      if (onBlotterReady) {
        blotter.api.eventApi.on('BlotterReady', () => {
          onBlotterReady(blotter.api);
        });
      }

      if (onToolbarVisibilityChanged) {
        blotter.api.eventApi.on('ToolbarVisibilityChanged', onToolbarVisibilityChanged);
      }
      if (onSearchChanged) {
        blotter.api.eventApi.on('SearchChanged', onSearchChanged);
      }
      if (onApplicationToolbarButtonClicked) {
        blotter.api.eventApi.on(
          'ApplicationToolbarButtonClicked',
          onApplicationToolbarButtonClicked
        );
      }
      if (onThemeChanged) {
        blotter.api.eventApi.on('ThemeChanged', onThemeChanged);
      }
      if (onColumnStateChanged) {
        blotter.api.eventApi.on('ColumnStateChanged', onColumnStateChanged);
      }
      if (onAlertFired) {
        blotter.api.eventApi.on('AlertFired', onAlertFired);
      }
      if (onActionColumnClicked) {
        blotter.api.eventApi.on('ActionColumnClicked', onActionColumnClicked);
      }
      if (onSelectionChanged) {
        blotter.api.eventApi.on('SelectionChanged', onSelectionChanged);
      }
      if (onAuditStateChanged) {
        blotter.api.auditEventApi.on('AuditStateChanged', onAuditStateChanged);
      }
      if (onAuditCellEdited) {
        blotter.api.auditEventApi.on('AuditCellEdited', onAuditCellEdited);
      }
      if (onAuditFunctionApplied) {
        blotter.api.auditEventApi.on('AuditFunctionApplied', onAuditFunctionApplied);
      }
      setBlotter(blotter);
      return blotter;
    };
  }, []);

  let [blotter, setBlotter] = useState<AdaptableBlotter | null>(null);

  const TagName = tagName || 'div';
  agGridTheme = agGridTheme || 'balham';

  const blotterNode = blotter ? (
    <AdaptableBlotterApp key="blotter" AdaptableBlotter={blotter} />
  ) : null;

  const overrideProps = {
    ...gridOptions,
    blotterFactory: blotterFactory,
  };

  const gridWrapperNode = (
    <AbsoluteFlexContainer
      key="agGridWrapper"
      style={{ flex: 1 }}
      className={getAgGridWrapperClassName(agGridTheme)}
      childProps={{
        id: gridContainerId,
      }}
    >
      {mounted ? <AgGridReactOverride {...overrideProps} /> : null}
    </AbsoluteFlexContainer>
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  let children: ReactNode | ReactNode[] = [blotterNode, gridWrapperNode];

  const renderFn = render || props.children;

  if (typeof renderFn === 'function') {
    children = renderFn({
      blotter: blotterNode,
      grid: gridWrapperNode,
    });
  }
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
