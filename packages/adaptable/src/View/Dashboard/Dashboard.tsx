import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { DashboardState, CustomToolbar } from '../../PredefinedConfig/DashboardState';
import {
  AdaptableDashboardFactory,
  AdaptableDashboardPermanentToolbarFactory,
} from '../AdaptableViewFactory';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';
import SimpleButton from '../../components/SimpleButton';
import { Box, Flex } from 'rebass';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
  DashboardState: DashboardState;
  onClick: (action: Redux.Action) => Redux.Action;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
  render() {
    let instanceName = this.props.Adaptable.api.internalApi.setToolbarTitle();

    let showInstanceName: string = 'Show ' + instanceName + ' Dashboard';
    let visibleDashboardControls = this.props.DashboardState.VisibleToolbars.filter(
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
                marginTop={1}
                marginRight={1}
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
          Adaptable: this.props.Adaptable,
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
                tooltip={showInstanceName}
                className="ab-Dashboard__expand"
                onClick={() => this.props.onSetDashboardVisibility(Visibility.Visible)}
              >
                {instanceName}
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

export let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
