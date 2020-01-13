import * as React from 'react';
import { useState, useEffect, ReactNode, useMemo } from 'react';

import { AdaptableApp } from '@adaptabletools/adaptable/src/View/AdaptableView';
import Adaptable from '@adaptabletools/adaptable/src/agGrid';
import { AdaptableApi } from '@adaptabletools/adaptable/types';
import AbsoluteFlexContainer from './AbsoluteFlexContainer';
import {
  AdaptableOptions,
  SearchChangedEventArgs,
  ThemeChangedEventArgs,
  ColumnStateChangedEventArgs,
  AlertFiredEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
  ToolbarVisibilityChangedEventArgs,
  LiveReportUpdatedEventArgs,
} from '@adaptabletools/adaptable/types';
import { AuditLogEventArgs } from '@adaptabletools/adaptable/src/Api/Events/AuditEvents';
import { ToolbarButtonClickedEventArgs } from '@adaptabletools/adaptable/src/Api/Events/ToolbarButtonClicked';

import * as AgGrid from '@ag-grid-community/all-modules';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ReactComponent } from '@ag-grid-community/react/lib/reactComponent';
import {
  Module,
  FrameworkComponentWrapper,
  BaseComponentWrapper,
  WrapableInterface,
  AllCommunityModules,
  ModuleRegistry,
} from '@ag-grid-community/all-modules';

export * from '@adaptabletools/adaptable/types';

import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-react-aggrid" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

ModuleRegistry.registerModules(AllCommunityModules);

type TypeFactory =
  | string
  | typeof React.Component
  | (({ children }: { children: ReactNode }) => ReactNode);

type TypeChildren = ({ adaptable, grid }: { adaptable: ReactNode; grid: ReactNode }) => ReactNode;

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
    let gridOptions = this.props.gridOptions || {};
    if (AgGridColumn && (AgGridColumn as any).hasChildColumns(this.props)) {
      gridOptions.columnDefs = (AgGridColumn as any).mapChildColumnDefs(this.props);
    }

    this.gridOptions = (AgGrid as any).ComponentUtil.copyAttributesToGridOptions(
      gridOptions,
      this.props
    );

    const { adaptableFactory } = this.props as any;

    const adaptable = adaptableFactory(this);

    // don't need the return value
    // new AgGrid.Grid(this.eGridDiv, this.gridOptions, gridParams);

    this.api = adaptable.gridOptions.api;
    this.columnApi = adaptable.gridOptions.columnApi;
  }
}

class ReactFrameworkComponentWrapper extends BaseComponentWrapper<AgGrid.WrapableInterface>
  implements FrameworkComponentWrapper {
  private readonly agGridReact!: AgGridReact;

  constructor(agGridReact: AgGridReact) {
    super();
    this.agGridReact = agGridReact;
  }

  createWrapper(UserReactComponent: { new (): any }): WrapableInterface {
    return new ReactComponent(UserReactComponent, this.agGridReact as any);
  }
}

const createAdaptable = ({
  adaptableOptions,
  gridOptions,
  adaptableContainerId,
  gridContainerId,
  agGridReactWrapperInstance,
  modules,
}: {
  adaptableOptions: AdaptableOptions;
  gridOptions: AgGrid.GridOptions;
  adaptableContainerId: string;
  gridContainerId: string;
  agGridReactWrapperInstance: AgGridReactOverride;
  modules?: Module[];
}): Adaptable => {
  return new Adaptable(
    {
      ...adaptableOptions,
      containerOptions: {
        ...adaptableOptions.containerOptions,
        adaptableContainer: adaptableContainerId,
        vendorContainer: gridContainerId,
      },
      vendorGrid: gridOptions,
    },
    false,
    {
      instantiateGrid: (vendorContainer: HTMLElement, gridOptions) => {
        const gridParams = {
          providedBeanInstances: {
            agGridReact: agGridReactWrapperInstance,
            frameworkComponentWrapper: new ReactFrameworkComponentWrapper(
              agGridReactWrapperInstance
            ),
          },
          modules,
        };
        return new AgGrid.Grid(vendorContainer, gridOptions, gridParams);
      },
    },
    true
  );
};

const AdaptableReact = ({
  adaptableOptions,
  gridOptions,
  modules,
  tagName,
  agGridTheme,
  render,
  onActionColumnClicked,
  onAlertFired,
  onToolbarButtonClicked,
  onColumnStateChanged,
  onLiveReportUpdated,
  onSearchChanged,
  onSelectionChanged,
  onThemeChanged,
  onToolbarVisibilityChanged,
  onAuditStateChanged,
  onAuditCellEdited,
  onAuditFunctionApplied,

  onAdaptableReady,
  ...props
}: {
  agGridTheme?: string;
  adaptableOptions: AdaptableOptions;
  gridOptions: AgGrid.GridOptions;

  modules?: Module[];

  onAdaptableReady?: (api: AdaptableApi) => void;
  onToolbarVisibilityChanged?: (
    toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs
  ) => void;
  onSearchChanged?: (searchChangedEventArgs: SearchChangedEventArgs) => void;
  onToolbarButtonClicked?: (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => void;
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
  const adaptableContainerId = `adaptable-${seedId}`;
  const gridContainerId = `grid-${seedId}`;

  const [mounted, setMounted] = useState<boolean>(false);

  const adaptableFactory = useMemo(() => {
    return (agGridReactWrapperInstance: AgGridReactOverride) => {
      const adaptable = createAdaptable({
        gridOptions,
        adaptableOptions,
        gridContainerId,
        adaptableContainerId,
        agGridReactWrapperInstance,
        modules,
      });
      if (onAdaptableReady) {
        adaptable.api.eventApi.on('AdaptableReady', () => {
          onAdaptableReady(adaptable.api);
        });
      }

      if (onToolbarVisibilityChanged) {
        adaptable.api.eventApi.on('ToolbarVisibilityChanged', onToolbarVisibilityChanged);
      }
      if (onSearchChanged) {
        adaptable.api.eventApi.on('SearchChanged', onSearchChanged);
      }
      if (onToolbarButtonClicked) {
        adaptable.api.eventApi.on('ToolbarButtonClicked', onToolbarButtonClicked);
      }
      if (onThemeChanged) {
        adaptable.api.eventApi.on('ThemeChanged', onThemeChanged);
      }
      if (onColumnStateChanged) {
        adaptable.api.eventApi.on('ColumnStateChanged', onColumnStateChanged);
      }
      if (onAlertFired) {
        adaptable.api.eventApi.on('AlertFired', onAlertFired);
      }
      if (onActionColumnClicked) {
        adaptable.api.eventApi.on('ActionColumnClicked', onActionColumnClicked);
      }
      if (onSelectionChanged) {
        adaptable.api.eventApi.on('SelectionChanged', onSelectionChanged);
      }
      if (onAuditStateChanged) {
        adaptable.api.auditEventApi.on('AuditStateChanged', onAuditStateChanged);
      }
      if (onAuditCellEdited) {
        adaptable.api.auditEventApi.on('AuditCellEdited', onAuditCellEdited);
      }
      if (onAuditFunctionApplied) {
        adaptable.api.auditEventApi.on('AuditFunctionApplied', onAuditFunctionApplied);
      }
      setAdaptable(adaptable);
      return adaptable;
    };
  }, []);

  let [adaptable, setAdaptable] = useState<Adaptable | null>(null);

  const TagName = tagName || 'div';
  agGridTheme = agGridTheme || 'balham';

  const adaptableNode = adaptable ? <AdaptableApp key="adaptable" Adaptable={adaptable} /> : null;

  const overrideProps = {
    ...gridOptions,
    adaptableFactory: adaptableFactory,
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

  let children: ReactNode | ReactNode[] = [adaptableNode, gridWrapperNode];

  const renderFn = render || props.children;

  if (typeof renderFn === 'function') {
    children = renderFn({
      adaptable: adaptableNode,
      grid: gridWrapperNode,
    });
  }
  return (
    <TagName
      {...props}
      id={adaptableContainerId}
      className={join(props.className, 'ab__react-wrapper')}
    >
      {children}
    </TagName>
  );
};

export default AdaptableReact;
