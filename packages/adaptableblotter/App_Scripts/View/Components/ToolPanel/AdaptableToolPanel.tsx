import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import { IToolPanelComp, IToolPanelParams } from 'ag-grid-community';
import { render } from 'react-dom';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { Text, Flex, Box } from 'rebass';
import { IAdaptableBlotter } from '../../../types';
import { Entitlement } from '../../../PredefinedConfig/EntitlementState';
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
import { AdaptableToolPanels } from '../../../PredefinedConfig/Common/Types';

const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

interface AdaptableToolPanelProps {
  Blotter: IAdaptableBlotter;
  TeamSharingActivated?: boolean;
  VisibleToolsPanels: string[];
  AvailableToolPanels: string[];
  FunctionEntitlements: Entitlement[];
  MainMenuItems: AdaptableMenuItem[];
  // wondering if this shoudl take some base props like others?  though i know we dont like that...
  onClick: (action: Redux.Action) => Redux.Action;
  onSetToolPanelVisibility: (
    toolPanels: AdaptableToolPanels
  ) => ToolPanelRedux.ToolPanelSetToolPanelsAction;
}

export interface AdaptableToolPanelState {}

class AdaptableToolPanelComponent extends React.Component<
  AdaptableToolPanelProps,
  AdaptableToolPanelState
> {
  constructor(props: AdaptableToolPanelProps) {
    super(props);
    this.state = {};
  }

  render(): any {
    const functionsGlyph: any = <Icon name={'home'} />;
    const toolPanelsGlyph: any = <Icon name={'align-justify'} />;

    // Build the Tool Panels
    let hiddenEntitlements: Entitlement[] = this.props.FunctionEntitlements.filter(
      e => e.AccessLevel == 'Hidden'
    );
    let visibleToolPanels = this.props.VisibleToolsPanels.filter(vt =>
      ArrayExtensions.NotContainsItem(hiddenEntitlements, vt)
    );
    let visibleToolPanelControls = visibleToolPanels.map((control, idx) => {
      let accessLevel: AccessLevel = AdaptableHelper.getEntitlementAccessLevelForStrategy(
        this.props.FunctionEntitlements,
        control
      );
      if (accessLevel != AccessLevel.Hidden) {
        let toolPanel = AdaptableToolPanelFactory.get(control);
        if (toolPanel) {
          let dashboardElememt = React.createElement(toolPanel, {
            AccessLevel: accessLevel,
            BlotterApi: this.props.Blotter.api,
            Blotter: this.props.Blotter,
            Columns: this.props.Blotter.api.gridApi.getColumns(),
          });
          return (
            <Box
              key={control}
              marginTop={1}
              marginRight={1}
              className={`ab-Dashboard__container ab-Dashboard__container--${control}`}
            >
              {dashboardElememt}
            </Box>
          );
        } else {
          LoggingHelper.LogAdaptableError('Cannot find ToolPanel Control for ' + control);
        }
      }
    });

    let strategyKeys: string[] = [...this.props.Blotter.strategies.keys()];
    let allowedMenuItems = this.props.MainMenuItems.filter(
      x => x.IsVisible && ArrayExtensions.NotContainsItem(strategyKeys, x)
    );

    // function menu items
    let menuItems = allowedMenuItems.map(menuItem => {
      return {
        //  disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
        onClick: () => this.props.onClick(menuItem.ReduxAction),
        icon: <Icon name={menuItem.Icon} />,
        label: menuItem.Label,
      };
    });
    let functionsDropdown = (
      <DropdownButton
        variant="text"
        items={menuItems}
        tooltip="Grid Functions"
        className="ab-DashboardToolbar__Home__functions"
        key={'dropdown-functions'}
        id={'dropdown-functions'}
      >
        {functionsGlyph}
      </DropdownButton>
    );

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
    this.props.AvailableToolPanels.forEach((toolPanel: string, index) => {
      if (ArrayExtensions.ContainsItem(allowedMenuNames, toolPanel)) {
        let isVisible: boolean = ArrayExtensions.ContainsItem(
          this.props.VisibleToolsPanels,
          toolPanel
        );
        let functionName = StrategyConstants.getNameForStrategyId(toolPanel);
        toolpanelItems.push({
          id: toolPanel,
          onClick: (e: React.SyntheticEvent) => {
            this.onSetToolPanelVisibility(toolPanel, !isVisible);
          },
          label: (
            <Checkbox
              className="ab-dd-checkbox"
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

    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        padding={2}
        style={{
          width: '100%',
          ['--ab-cmp-dashboardpanel_body__background' as any]: 'var(--ab-color-primary)',
        }}
      >
        <Flex flexDirection="row" justifyContent="left" padding={2} style={{ width: '100%' }}>
          {functionsDropdown}
          {toolPanelsDropDown}
        </Flex>
        {visibleToolPanelControls}
      </Flex>
    );
  }

  onSetToolPanelVisibility(name: string, checked: boolean) {
    const strategy = this.props.AvailableToolPanels.find(at => at == name);
    const visibleToolPanels = [].concat(this.props.VisibleToolsPanels);
    if (checked) {
      visibleToolPanels.push(strategy);
    } else {
      let index: number = visibleToolPanels.findIndex(vt => vt == strategy);
      visibleToolPanels.splice(index, 1);
    }
    this.props.onSetToolPanelVisibility(visibleToolPanels);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    VisibleToolsPanels: state.ToolPanel.VisibleToolPanels,
    AvailableToolPanels: state.ToolPanel.AvailableToolPanels,
    FunctionEntitlements: state.Entitlements.FunctionEntitlements,
    MainMenuItems: state.Grid.MainMenuItems,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onClick: (action: Redux.Action) => dispatch(action),
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
      this.gui.id = 'adaptable-blotter-tool-panel_' + this.ctx.Blotter.blotterOptions.blotterId;
      render(
        <Provider store={this.ctx.Blotter.AdaptableStore.TheStore}>
          <ThemeProvider theme={theme}>
            <ConnectedAdaptableToolPanel Blotter={this.ctx.Blotter} TeamSharingActivated={false} />
          </ThemeProvider>
        </Provider>,
        this.gui
      );

      if (params && params.api) {
        params.api.addEventListener('modelUpdated', () => {
          //    console.log('Model updated', newModel);
        });
      }
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
