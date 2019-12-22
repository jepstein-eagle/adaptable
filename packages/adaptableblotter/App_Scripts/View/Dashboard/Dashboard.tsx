import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { DashboardState } from '../../PredefinedConfig/DashboardState';

import {
  AdaptableDashboardFactory,
  AdaptableDashboardPermanentToolbarFactory,
} from '../AdaptableViewFactory';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { Visibility, AccessLevel } from '../../PredefinedConfig/Common/Enums';

import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { EntitlementsState, Entitlement } from '../../PredefinedConfig/EntitlementsState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import SimpleButton from '../../components/SimpleButton';
import { Box, Flex } from 'rebass';
import { BlotterHelper } from '../../Utilities/Helpers/BlotterHelper';

interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
  DashboardState: DashboardState;
  EntitlementsState: EntitlementsState;
  onClick: (action: Redux.Action) => Redux.Action;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
  render() {
    // this logic is repeated from Home Toolbar where we get the Title  - perhaps put it one place?
    let blotterName = this.props.DashboardState.HomeToolbarTitle;
    if (StringExtensions.IsNullOrEmpty(blotterName)) {
      blotterName = this.props.Blotter.blotterOptions.blotterId;
      if (blotterName == GeneralConstants.USER_NAME) {
        blotterName = 'Blotter ';
      }
    }

    let showBlotterName: string = 'Show ' + blotterName + ' Dashboard';
    let hiddenEntitlements: Entitlement[] = this.props.EntitlementsState.FunctionEntitlements.filter(
      e => e.AccessLevel == 'Hidden'
    );
    let visibleDashboardControls = this.props.DashboardState.VisibleToolbars.filter(vt =>
      ArrayExtensions.NotContainsItem(hiddenEntitlements, vt)
    );
    let visibleDashboardElements = visibleDashboardControls.map((control, idx) => {
      let accessLevel: AccessLevel = BlotterHelper.getEntitlementAccessLevelForStrategy(
        this.props.EntitlementsState.FunctionEntitlements,
        control
      );
      if (accessLevel != AccessLevel.Hidden) {
        let dashboardControl = AdaptableDashboardFactory.get(control);
        if (dashboardControl) {
          let dashboardElememt = React.createElement(dashboardControl, {
            Blotter: this.props.Blotter,
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
              marginTop={1}
              marginRight={1}
              className={`ab-Dashboard__container ab-Dashboard__container--${control}`}
            >
              {dashboardElememt}
            </Box>
          );
        } else {
          LoggingHelper.LogAdaptableBlotterError('Cannot find Dashboard Control for ' + control);
        }
      }
    });

    let homeToolbar = AdaptableDashboardPermanentToolbarFactory.get(
      StrategyConstants.HomeStrategyId
    );
    let homeToolbarElement = (
      <Box
        key={'home'}
        marginTop={1}
        marginRight={1}
        className="ab-Dashboard__container ab-Dashboard__container--Home"
      >
        {React.createElement(homeToolbar, {
          Blotter: this.props.Blotter,
        })}
      </Box>
    );

    return (
      <Box padding={1} paddingTop={0} className={'ab-Dashboard'}>
        {this.props.DashboardState.DashboardVisibility != Visibility.Hidden && (
          <div className="ab_no_margin">
            {this.props.DashboardState.DashboardVisibility == Visibility.Minimised ? (
              <SimpleButton
                variant={this.props.DashboardState.MinimisedHomeToolbarButtonStyle!.Variant}
                tone={this.props.DashboardState.MinimisedHomeToolbarButtonStyle!.Tone}
                m={1}
                px={1}
                py={1}
                icon="arrow-down"
                tooltip={showBlotterName}
                className="ab-Dashboard__expand"
                onClick={() => this.props.onSetDashboardVisibility(Visibility.Visible)}
              >
                {blotterName}
              </SimpleButton>
            ) : (
              <Flex className="ab-Dashboard__inner" alignItems="stretch" style={{ zoom: 1 }}>
                {homeToolbarElement}
                {visibleDashboardElements}
              </Flex>
            )}
          </div>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    DashboardState: state.Dashboard,
    EntitlementsState: state.Entitlements,
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
    onClick: (action: Redux.Action) => dispatch(action),
    onSetDashboardVisibility: (visibility: Visibility) =>
      dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
  };
}

export let Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);
