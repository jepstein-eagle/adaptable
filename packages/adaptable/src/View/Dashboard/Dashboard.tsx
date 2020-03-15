import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import * as _ from 'lodash';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import {
  DashboardState,
  CustomToolbar,
  DashboardTab,
  AdaptableCoordinate,
} from '../../PredefinedConfig/DashboardState';
import { GridState } from '../../PredefinedConfig/GridState';
import { AdaptableDashboardFactory } from '../AdaptableViewFactory';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
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
import { AdaptableFormControlTextClear } from '../Components/Forms/AdaptableFormControlTextClear';

interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
  DashboardState: DashboardState;
  GridState: GridState;
  StatusType: SystemStatusState['StatusType'];
  QuickSearchText: string;
  dispatch: (action: Redux.Action) => Redux.Action;
  onSetActiveTab: (ActiveTab: number | null) => DashboardRedux.DashboardSetActiveTabAction;
  onSetIsCollapsed: (IsCollapsed: boolean) => DashboardRedux.DashboardSetIsCollapsedAction;
  onSetIsFloating: (IsFloating: boolean) => DashboardRedux.DashboardSetIsFloatingAction;
  onSetFloatingPosition: (
    FloatingPosition: AdaptableCoordinate
  ) => DashboardRedux.DashboardSetFloatingPositionAction;
  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
  onShowQuickSearchPopup: () => PopupRedux.PopupShowScreenAction;
  onShowDashboardPopup: () => PopupRedux.PopupShowScreenAction;
}

interface DashboardComponentState {
  EditedQuickSearchText: string;
}

class DashboardComponent extends React.Component<DashboardComponentProps, DashboardComponentState> {
  unbindKeyDown: () => void;

  constructor(props: DashboardComponentProps) {
    super(props);
    this.state = { EditedQuickSearchText: this.props.QuickSearchText };
  }
  UNSAFE_componentWillReceiveProps(nextProps: DashboardComponentProps, nextContext: any) {
    this.setState({
      EditedQuickSearchText: nextProps.QuickSearchText,
    });
  }
  debouncedRunQuickSearch = _.debounce(
    () => this.props.onRunQuickSearch(this.state.EditedQuickSearchText),
    250
  );
  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText });
    this.debouncedRunQuickSearch();
  }
  cycleDashboardModes() {
    if (!this.props.DashboardState.IsCollapsed) {
      this.props.onSetIsCollapsed(true);
      return;
    }

    if (!this.props.DashboardState.IsFloating) {
      this.props.onSetIsFloating(true);
      return;
    }

    this.props.onSetIsCollapsed(false);
    this.props.onSetIsFloating(false);
  }

  changeActiveTab(index: number) {
    if (this.props.DashboardState.Tabs[index] !== undefined) {
      this.props.onSetActiveTab(index);
    }
  }
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
  renderFunctionButtons() {
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
              variant={menuItem.FunctionName === 'SystemStatus' ? 'outlined' : 'text'}
              tone={menuItem.FunctionName === 'SystemStatus' ? 'neutral' : 'accent'}
              className={`ab-DashboardToolbar__Home__${kebabCase(menuItem.Label)}`}
              icon={menuItem.Icon}
              tooltip={menuItem.Label}
              disabled={this.props.AccessLevel == 'ReadOnly'}
              onClick={() => this.props.dispatch(menuItem!.ReduxAction)}
              AccessLevel={'Full'}
              style={
                menuItem.FunctionName === 'SystemStatus'
                  ? {
                      ...UIHelper.getStyleForMessageType(this.props.StatusType as MessageType),
                      border: 0,
                    }
                  : {}
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
        disabled: this.props.AccessLevel == 'Hidden',
        onClick: () => this.props.dispatch(menuItem.ReduxAction),
        icon: <Icon name={menuItem.Icon} />,
        label: menuItem.Label,
      };
    });

    return (
      <DropdownButton
        variant="text"
        tone="accent"
        items={menuItems}
        // tooltip="Adaptable Functions"
        className="ab-DashboardToolbar__Home__functions"
        key={'dropdown-functions'}
        id={'dropdown-functions'}
      >
        <Icon name={'home'} />
      </DropdownButton>
    );
  }
  renderQuickSearch() {
    return (
      <>
        <SimpleButton
          icon="quick-search"
          variant="text"
          tone="accent"
          onClick={this.props.onShowQuickSearchPopup}
          tooltip="Quick Search"
          mr={2}
        />
        <AdaptableFormControlTextClear
          type="text"
          placeholder="Search"
          className="ab-DashboardToolbar__QuickSearch__text"
          value={this.state.EditedQuickSearchText}
          OnTextChange={x => this.onUpdateQuickSearchText(x)}
          style={{ width: 'auto', border: 'none' }}
          inputStyle={{ width: '7rem' }}
        />
      </>
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
        left={this.props.DashboardState.ShowFunctionsDropdown && this.renderFunctionsDropdown()}
        right={
          <>
            {this.renderFunctionButtons()}
            {this.renderQuickSearch()}
          </>
        }
        onShowDashboardPopup={this.props.onShowDashboardPopup}
      >
        {this.props.DashboardState.Tabs &&
          this.props.DashboardState.Tabs.map((tab, index) => (
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
    QuickSearchText: state.QuickSearch.QuickSearchText,
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
    onSetFloatingPosition: (FloatingPosition: AdaptableCoordinate) =>
      dispatch(DashboardRedux.DashboardSetFloatingPosition(FloatingPosition)),
    onRunQuickSearch: (newQuickSearchText: string) =>
      dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
    onShowQuickSearchPopup: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.QuickSearchStrategyId,
          ScreenPopups.QuickSearchPopup
        )
      ),
    onShowDashboardPopup: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.DashboardStrategyId,
          ScreenPopups.DashboardPopup
        )
      ),
  };
}

export let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
