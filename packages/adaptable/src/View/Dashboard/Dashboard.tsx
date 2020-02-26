import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import {
  DashboardState,
  CustomToolbar,
  DashboardTab,
  DashboardFloatingPosition,
} from '../../PredefinedConfig/DashboardState';
import { GridState } from '../../PredefinedConfig/GridState';
import {
  AdaptableDashboardFactory,
  AdaptableDashboardPermanentToolbarFactory,
} from '../AdaptableViewFactory';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { Visibility, MessageType } from '../../PredefinedConfig/Common/Enums';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';
import SimpleButton from '../../components/SimpleButton';
import { Box, Flex } from 'rebass';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import {
  Dashboard as DashboardUI,
  DashboardTab as DashboardTabUI,
} from '../../components/Dashboard';
import { kebabCase } from 'lodash';
import UIHelper from '../UIHelper';
import { SystemStatusState } from '../../PredefinedConfig/SystemStatusState';
import { AdaptableMenuItem } from '../../types';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { Icon } from '../../components/icons';
import DropdownButton from '../../components/DropdownButton';

interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
  DashboardState: DashboardState;
  GridState: GridState;
  StatusType: SystemStatusState['StatusType'];
  dispatch: (action: Redux.Action) => Redux.Action;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
  onSetActiveTab: (ActiveTab: number | null) => DashboardRedux.DashboardSetActiveTabAction;
  onSetIsCollapsed: (IsCollapsed: boolean) => DashboardRedux.DashboardSetIsCollapsedAction;
  onSetIsFloating: (IsFloating: boolean) => DashboardRedux.DashboardSetIsFloatingAction;
  onSetFloatingPosition: (
    FloatingPosition: DashboardFloatingPosition
  ) => DashboardRedux.DashboardSetFloatingPositionAction;
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
  renderTab(tab: DashboardTab): React.ReactNode {
    let visibleDashboardControls = tab.Toolbars.filter(
      vt =>
        // will this break for custom toolbars????
        !this.props.Adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(
          vt as AdaptableFunctionName
        )
    );

    let visibleDashboardElements = visibleDashboardControls.map(control => {
      let customToolbar: CustomToolbar = this.props.DashboardState.CustomToolbars.find(
        ct => ct.Name == control
      );
      if (customToolbar) {
        let accessLevel: AccessLevel = this.props.Adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
          StrategyConstants.DashboardStrategyId
        );

        if (accessLevel != 'Hidden') {
          let customToolbarControl = AdaptableDashboardFactory.get(
            StrategyConstants.DashboardStrategyId
          );
          if (customToolbarControl) {
            let customDshboardElememt = React.createElement(customToolbarControl, {
              Adaptable: this.props.Adaptable,
              Columns: this.props.Columns,
              UserFilters: this.props.UserFilters,
              SystemFilters: this.props.SystemFilters,
              ColorPalette: this.props.ColorPalette,
              ColumnSorts: this.props.ColumnSorts,
              AccessLevel: accessLevel,
              CustomToolbar: customToolbar,
            });
            return (
              <Box
                key={customToolbar.Name}
                marginTop={1}
                marginRight={1}
                className={`ab-Dashboard__container ab-Dashboard__container--customToolbar`}
              >
                {customDshboardElememt}
              </Box>
            );
          } else {
            LoggingHelper.LogAdaptableError(
              'Cannot find CustomToolbar entitled: ' + customToolbar.Name
            );
          }
        }
      } else {
        let shippedToolbar = control as AdaptableFunctionName;
        let accessLevel: AccessLevel = this.props.Adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
          shippedToolbar
        );

        if (accessLevel != 'Hidden') {
          let dashboardControl = AdaptableDashboardFactory.get(shippedToolbar);
          if (dashboardControl) {
            let dashboardElememt = React.createElement(dashboardControl, {
              Adaptable: this.props.Adaptable,
              Columns: this.props.Columns,
              UserFilters: this.props.UserFilters,
              SystemFilters: this.props.SystemFilters,
              ColorPalette: this.props.ColorPalette,
              ColumnSorts: this.props.ColumnSorts,
              AccessLevel: accessLevel,
            });
            return (
              <Box
                key={control}
                className={`ab-Dashboard__container ab-Dashboard__container--${control}`}
              >
                {dashboardElememt}
              </Box>
            );
          } else {
            LoggingHelper.LogAdaptableError('Cannot find Dashboard Control for ' + control);
          }
        }
      }
    });

    return visibleDashboardElements;
  }
  renderShortcuts() {
    let shortcutsArray: string[] = this.props.DashboardState.VisibleButtons;
    let shortcuts: any = null;

    if (shortcutsArray) {
      shortcuts = shortcutsArray.map(x => {
        let menuItem = this.props.GridState.MainMenuItems.find(
          y => y.IsVisible && y.FunctionName == x
        );
        if (menuItem) {
          return (
            <SimpleButton
              key={menuItem.Label}
              variant="text"
              className={`ab-DashboardToolbar__Home__${kebabCase(menuItem.Label)}`}
              icon={menuItem.Icon}
              tooltip={menuItem.Label}
              disabled={this.props.AccessLevel == 'ReadOnly'}
              onClick={() => this.props.dispatch(menuItem!.ReduxAction)}
              AccessLevel={'Full'}
              style={
                menuItem.FunctionName === 'SystemStatus'
                  ? UIHelper.getStyleForMessageType(this.props.StatusType as MessageType)
                  : { color: 'white', fill: 'currentColor' }
              }
            />
          );
        }
      });
    }

    return shortcuts;
  }
  renderFunctionsDropdown() {
    let strategyKeys: string[] = [...this.props.Adaptable.strategies.keys()];
    let allowedMenuItems: AdaptableMenuItem[] = this.props.GridState.MainMenuItems.filter(
      x => x.IsVisible && ArrayExtensions.NotContainsItem(strategyKeys, x)
    );
    // function menu items
    let menuItems = allowedMenuItems.map(menuItem => {
      return {
        disabled: this.props.AccessLevel == 'ReadOnly',
        onClick: () => this.props.dispatch(menuItem.ReduxAction),
        icon: <Icon name={menuItem.Icon} />,
        label: menuItem.Label,
      };
    });

    return (
      <DropdownButton
        variant="text"
        color=""
        items={menuItems}
        tooltip="Adaptable Functions"
        className="ab-DashboardToolbar__Home__functions"
        key={'dropdown-functions'}
        id={'dropdown-functions'}
        style={{ color: 'white', fill: 'currentColor' }}
      >
        <Icon name={'home'} />
      </DropdownButton>
    );
  }
  render() {
    let instanceName = this.props.Adaptable.api.internalApi.setToolbarTitle();
    return (
      <DashboardUI
        title={instanceName}
        activeTab={this.props.DashboardState.ActiveTab}
        onActiveTabChange={ActiveTab => {
          this.props.onSetActiveTab(ActiveTab as number | null);
        }}
        collapsed={this.props.DashboardState.IsCollapsed}
        onCollapsedChange={IsCollapsed => {
          this.props.onSetIsCollapsed(IsCollapsed as boolean);
        }}
        floating={this.props.DashboardState.IsFloating}
        onFloatingChange={IsFloating => {
          this.props.onSetIsFloating(IsFloating as boolean);
        }}
        position={this.props.DashboardState.FloatingPosition}
        onPositionChange={FloatingPositionCallback => {
          if (typeof FloatingPositionCallback === 'function') {
            const FloatingPosition = FloatingPositionCallback(
              this.props.DashboardState.FloatingPosition
            );
            this.props.onSetFloatingPosition(FloatingPosition);
          } else {
            this.props.onSetFloatingPosition(FloatingPositionCallback);
          }
        }}
        left={this.renderFunctionsDropdown()}
        right={this.renderShortcuts()}
      >
        {this.props.DashboardState.VisibleTabs.map((tab, index) => (
          <DashboardTabUI key={index} title={tab.Name}>
            {this.renderTab(tab)}
          </DashboardTabUI>
        ))}
      </DashboardUI>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    DashboardState: state.Dashboard,
    GridState: state.Grid,
    StatusType: state.SystemStatus.StatusType,
    // need to get these props so we can 'feed' the toolbars...
    Columns: state.Grid.Columns,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    NamedFilters: state.NamedFilter.NamedFilters,
    ColorPalette: state.UserInterface.ColorPalette,
    ColumnSorts: state.Grid.ColumnSorts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    dispatch: (action: Redux.Action) => dispatch(action),
    onSetActiveTab: (ActiveTab: number | null) =>
      dispatch(DashboardRedux.DashboardSetActiveTab(ActiveTab)),
    onSetIsCollapsed: (IsCollapsed: boolean) =>
      dispatch(DashboardRedux.DashboardSetIsCollapsed(IsCollapsed)),
    onSetIsFloating: (IsFloating: boolean) =>
      dispatch(DashboardRedux.DashboardSetIsFloating(IsFloating)),
    onSetFloatingPosition: (FloatingPosition: DashboardFloatingPosition) =>
      dispatch(DashboardRedux.DashboardSetFloatingPosition(FloatingPosition)),
    onSetDashboardVisibility: (visibility: Visibility) =>
      dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
  };
}

export let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
