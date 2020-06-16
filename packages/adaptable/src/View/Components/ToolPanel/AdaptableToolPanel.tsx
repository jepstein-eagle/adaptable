import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import { kebabCase } from 'lodash';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';
import * as SystemRedux from '../../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import { IToolPanelComp, IToolPanelParams } from '@ag-grid-community/all-modules';
import { render } from 'react-dom';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { Flex, Box } from 'rebass';
import { IAdaptable } from '../../../types';
import { Entitlement, AccessLevel } from '../../../PredefinedConfig/EntitlementState';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';
import AdaptableHelper from '../../../Utilities/Helpers/AdaptableHelper';
import { AdaptableToolPanelFactory } from '../../AdaptableViewFactory';
import LoggingHelper from '../../../Utilities/Helpers/LoggingHelper';
import { Icon } from '../../../components/icons';
import Checkbox from '../../../components/CheckBox';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';
import DropdownButton from '../../../components/DropdownButton';
import { AdaptableToolPanelContext } from '../../../Utilities/Interface/AdaptableToolPanelContext';
import {
  AdaptableToolPanels,
  AdaptableToolPanel,
  AdaptableFunctionButtons,
} from '../../../PredefinedConfig/Common/Types';
import SimpleButton from '../../../components/SimpleButton';
import { ButtonConfigure } from '../Buttons/ButtonConfigure';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';

import AdaptableContext from '../../AdaptableContext';

const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

interface AdaptableToolPanelProps {
  Adaptable: IAdaptable;
  TeamSharingActivated?: boolean;
  VisibleToolsPanels: AdaptableToolPanels;
  AvailableToolPanels: AdaptableToolPanels;
  VisibleButtons: AdaptableFunctionButtons;
  ShowFunctionsDropdown: boolean;
  ShowColumnsDropdown: boolean;
  ShowToolPanelsDropdown: boolean;
  MainMenuItems: AdaptableMenuItem[];
  Columns: AdaptableColumn[];
  // wondering if this shoudl take some base props like others?  though i know we dont like that...
  onClick: (action: Redux.Action) => Redux.Action;
  onNewColumnListOrder: (
    VisibleColumnList: AdaptableColumn[]
  ) => SystemRedux.SetNewColumnListOrderAction;
  onSetToolPanelVisibility: (
    toolPanels: AdaptableToolPanels
  ) => ToolPanelRedux.ToolPanelSetToolPanelsAction;
}

const AdaptableToolPanelComponent = (props: AdaptableToolPanelProps) => {
  const functionsGlyph: any = <Icon name={'home'} />;
  const colsGlyph: any = <Icon name={'list'} />;
  const toolPanelsGlyph: any = <Icon name={'align-justify'} />;

  // shortcuts
  let shortcutsArray: string[] = props.VisibleButtons;

  let shortcuts: any = shortcutsArray
    ? shortcutsArray.map(x => {
        let menuItem = props.MainMenuItems.find(y => y.IsVisible && y.FunctionName == x);
        if (menuItem) {
          return (
            <SimpleButton
              key={menuItem.Label}
              icon={menuItem.Icon}
              variant="text"
              className={`ab-ToolPanel__Home__${kebabCase(menuItem.Label)}`}
              tooltip={menuItem.Label}
              //  disabled={props.AccessLevel == 'ReadOnly' }
              onClick={() => props.onClick(menuItem.ReduxAction)}
              AccessLevel={'Full'}
            />
          );
        }
      })
    : null;

  const clonedShortcuts = Object.assign([], shortcuts);
  let grouped_shortcuts: any[] = clonedShortcuts
    .map(() => clonedShortcuts.splice(0, 7))
    .filter((a: any) => a);

  let grouped_shortcut_rows = grouped_shortcuts.map(gs => {
    return (
      <Flex flexDirection="row" justifyContent="left" padding={1} style={{ width: '100%' }}>
        {gs}
      </Flex>
    );
  });

  // Build the Tool Panels
  let visibleToolPanels = props.VisibleToolsPanels.filter(
    vt => !props.Adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(vt)
  );
  let visibleToolPanelControls = visibleToolPanels.map((control, idx) => {
    let accessLevel: AccessLevel = props.Adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
      control
    );

    if (accessLevel != 'Hidden') {
      let toolPanel = AdaptableToolPanelFactory.get(control);
      if (toolPanel) {
        let toolPanelElememt = React.createElement(toolPanel, {
          AccessLevel: accessLevel,
          Api: props.Adaptable.api,
        });
        return (
          <Box
            key={control}
            marginTop={1}
            marginRight={1}
            className={`ab-ToolPanel__container ab-ToolPanel__container--${control}`}
          >
            {toolPanelElememt}
          </Box>
        );
      } else {
        LoggingHelper.LogAdaptableError('Cannot find ToolPanel Control for ' + control);
      }
    }
  });

  let strategyKeys: string[] = props.Adaptable.strategies
    ? [...props.Adaptable.strategies.keys()]
    : [];
  let allowedMenuItems = props.MainMenuItems.filter(
    x => x.IsVisible && ArrayExtensions.NotContainsItem(strategyKeys, x)
  );

  // function menu items
  let menuItems = allowedMenuItems.map(menuItem => {
    return {
      //  disabled: props.AccessLevel == 'ReadOnly' ,
      onClick: () => props.onClick(menuItem.ReduxAction),
      icon: <Icon name={menuItem.Icon} />,
      label: menuItem.Label,
    };
  });

  let functionsDropdown = (
    <DropdownButton
      variant="text"
      items={menuItems}
      tooltip="Adaptable Functions"
      className="ab-ToolPanel__functions"
      key={'dropdown-functions'}
      id={'dropdown-functions'}
    >
      {functionsGlyph}
    </DropdownButton>
  );

  // column items
  let colItems: any = [
    {
      clickable: false,
      label: (
        <div key="colTitle">
          {' '}
          &nbsp;&nbsp;<b>{'Columns'}</b>
        </div>
      ),
    },
  ];

  const onSetColumnVisibility = (name: string) => {
    let changedColumn: AdaptableColumn = props.Adaptable.api.gridApi.getColumnFromId(name);

    let columns: AdaptableColumn[] = [].concat(props.Columns);
    changedColumn = Object.assign({}, changedColumn, {
      Visible: !changedColumn.Visible,
    });
    let index = columns.findIndex(x => x.ColumnId == name);
    columns[index] = changedColumn;
    props.onNewColumnListOrder(columns.filter(c => c.Visible));
  };

  const onSetToolPanelVisibility = (name: string, checked: boolean) => {
    const strategy = props.AvailableToolPanels.find(at => at == name);
    const visibleToolPanels = [].concat(props.VisibleToolsPanels);
    if (checked) {
      visibleToolPanels.push(strategy);
    } else {
      let index: number = visibleToolPanels.findIndex(vt => vt == strategy);
      visibleToolPanels.splice(index, 1);
    }
    props.onSetToolPanelVisibility(visibleToolPanels);
  };

  props.Columns.forEach((col: AdaptableColumn, index) => {
    colItems.push({
      id: col.ColumnId,
      onClick: (e: React.SyntheticEvent) => {
        onSetColumnVisibility(col.ColumnId);
      },
      label: (
        <Checkbox
          as="div"
          className="ab-dd-checkbox"
          variant="agGrid"
          my={0}
          value={col.ColumnId}
          key={col.ColumnId}
          checked={col.Visible}
          onMouseDown={preventDefault}
        >
          {col.FriendlyName}
        </Checkbox>
      ),
    });
  });

  // toolpanel items
  let toolpanelItems: any = [];
  let allowedMenuNames: string[] = allowedMenuItems.map(vm => {
    return vm.FunctionName;
  });
  toolpanelItems.push({
    clickable: false,
    label: (
      <div key="toolPanelTitle">
        {' '}
        &nbsp;&nbsp;<b>{'Tool Panels'}</b>
      </div>
    ),
  });
  props.AvailableToolPanels.forEach((toolPanel: AdaptableToolPanel, index) => {
    if (ArrayExtensions.ContainsItem(allowedMenuNames, toolPanel)) {
      let isVisible: boolean = ArrayExtensions.ContainsItem(props.VisibleToolsPanels, toolPanel);
      let functionName = StrategyConstants.getFriendlyNameForStrategyId(toolPanel);
      toolpanelItems.push({
        id: toolPanel,
        onClick: (e: React.SyntheticEvent) => {
          onSetToolPanelVisibility(toolPanel, !isVisible);
        },
        label: (
          <Checkbox
            className="ab-dd-checkbox"
            variant="agGrid"
            my={0}
            as="div"
            value={toolPanel}
            key={toolPanel}
            checked={isVisible}
            onMouseDown={preventDefault}
          >
            {functionName}
          </Checkbox>
        ),
      });
    }
  });

  // columns dropdown
  let columnsDropDown = (
    <DropdownButton
      listMinWidth={150}
      variant="text"
      collapseOnItemClick={false}
      items={colItems}
      columns={['label']}
      className="ab-Toolpanel__columns"
      key={'dropdown-cols'}
      id={'dropdown-cols'}
      tooltip="Select Columns"
    >
      {colsGlyph}
    </DropdownButton>
  );

  let toolPanelsDropDown = (
    <DropdownButton
      variant="text"
      collapseOnItemClick={false}
      key={'dropdown-toolpanels'}
      id={'dropdown-toolpanels'}
      className="ab-ToolPanel__toolbars"
      columns={['label']}
      items={toolpanelItems}
      tooltip="Manage Tool Panels"
    >
      {toolPanelsGlyph}
    </DropdownButton>
  );
  let configureButton = (
    <ButtonConfigure
      iconSize={16}
      marginLeft={2}
      className="ab-ToolPanel__configure-button"
      tooltip={'Configure ToolPanels'}
      onClick={() => {
        props.Adaptable.api.toolPanelApi.showToolPanelPopup();
      }}
    />
  );

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      padding={2}
      style={{
        width: '100%',
        ['--ab-cmp-ToolPanelpanel_body__background' as any]: 'var(--ab-color-primary)',
      }}
    >
      <Flex flexDirection="row" justifyContent="left" padding={1} style={{ width: '100%' }}>
        {props.ShowFunctionsDropdown && functionsDropdown}
        {props.ShowToolPanelsDropdown && toolPanelsDropDown}
        {props.ShowColumnsDropdown && columnsDropDown}
        {configureButton}
      </Flex>
      {ArrayExtensions.IsNotNullOrEmpty(shortcuts) ? <div>{grouped_shortcut_rows}</div> : null}
      {visibleToolPanelControls}
    </Flex>
  );
};

function mapStateToProps(state: AdaptableState) {
  return {
    VisibleToolsPanels: state.ToolPanel.VisibleToolPanels,
    AvailableToolPanels: state.ToolPanel.AvailableToolPanels,
    VisibleButtons: state.ToolPanel.VisibleButtons,
    ShowFunctionsDropdown: state.ToolPanel.ShowFunctionsDropdown,
    ShowColumnsDropdown: state.ToolPanel.ShowColumnsDropdown,
    ShowToolPanelsDropdown: state.ToolPanel.ShowToolPanelsDropdown,
    MainMenuItems: state.Grid.MainMenuItems,
    Columns: state.Grid.Columns,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onClick: (action: Redux.Action) => dispatch(action),
    onNewColumnListOrder: (VisibleColumnList: AdaptableColumn[]) =>
      dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
    onSetToolPanelVisibility: (toolPanels: AdaptableToolPanels) =>
      dispatch(ToolPanelRedux.ToolPanelSetToolPanels(toolPanels)),
  };
}

export const ConnectedAdaptableToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdaptableToolPanelComponent);

export const AdaptableToolPanelBuilder = (ctx: AdaptableToolPanelContext) =>
  class AdaptableToolPanel implements IToolPanelComp {
    public gui: HTMLElement;
    public ctx: AdaptableToolPanelContext;

    public constructor() {
      this.ctx = ctx;
    }

    public init(params?: IToolPanelParams): void {
      this.gui = document.createElement('div');
      this.gui.id = 'adaptable-tool-panel_' + this.ctx.Adaptable.adaptableOptions.adaptableId;
      this.gui.style.width = '100%';
      this.gui.style.overflow = 'auto';
      render(
        <Provider store={this.ctx.Adaptable.AdaptableStore.TheStore}>
          <ThemeProvider theme={theme}>
            <AdaptableContext.Provider value={this.ctx.Adaptable}>
              <ConnectedAdaptableToolPanel
                Adaptable={this.ctx.Adaptable}
                TeamSharingActivated={false}
              />
            </AdaptableContext.Provider>
          </ThemeProvider>
        </Provider>,
        this.gui
      );
    }

    public getGui(): HTMLElement {
      if (!this.gui) {
        this.init();
      }
      return this.gui;
    }

    public refresh(): void {
      // no refresh logic needed
    }
  };
