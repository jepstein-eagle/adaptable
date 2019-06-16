import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import {
  Navbar,
  Nav,
  Button,
  Glyphicon,
  OverlayTrigger,
  ButtonToolbar,
  Tooltip,
} from 'react-bootstrap';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { DashboardState } from '../../PredefinedConfig/RunTimeState/DashboardState';

import {
  AdaptableDashboardViewFactory,
  AdaptableDashboardPermanentToolbarFactory,
} from '../AdaptableViewFactory';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { Visibility, AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { StrategyHelper } from '../../Utilities/Helpers/StrategyHelper';
import {
  EntitlementsState,
  IEntitlement,
} from '../../PredefinedConfig/DesignTimeState/EntitlementsState';

interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
  DashboardState: DashboardState;
  EntitlementsState: EntitlementsState;
  onClick: (action: Redux.Action) => Redux.Action;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
  render() {
    let cssClassName: string = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD;
    let cssBaseClassName: string = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD_BASE;

    let optionsBlotterName: string = this.props.Blotter.blotterOptions.blotterId;
    let blotterName: string =
      optionsBlotterName == GeneralConstants.USER_NAME ? 'Blotter ' : optionsBlotterName;
    let showBlotterName: string = 'Show ' + blotterName + ' Dashboard';
    let hiddenEntitlements: IEntitlement[] = this.props.EntitlementsState.FunctionEntitlements.filter(
      e => e.AccessLevel == 'Hidden'
    );
    let visibleDashboardControls = this.props.DashboardState.VisibleToolbars.filter(vt =>
      ArrayExtensions.NotContainsItem(hiddenEntitlements, vt)
    ); //.filter(dc => dc.IsVisible);

    let style: string = this.props.DashboardState.UseSingleColourForButtons
      ? StyleConstants.DEFAULT_BSSTYLE
      : StyleConstants.PRIMARY_BSSTYLE;

    let dashboardSize: DashboardSize = this.props.DashboardState.UseExtraSmallButtons
      ? DashboardSize.XSmall
      : DashboardSize.Small;

    let visibleDashboardElements = visibleDashboardControls.map((control, idx) => {
      let accessLevel: AccessLevel = StrategyHelper.getEntitlementAccessLevelForStrategy(
        this.props.EntitlementsState.FunctionEntitlements,
        control
      );
      if (accessLevel != AccessLevel.Hidden) {
        let dashboardControl = AdaptableDashboardViewFactory.get(control);
        if (dashboardControl) {
          let dashboardElememt = React.createElement(dashboardControl, {
            Blotter: this.props.Blotter,
            Columns: this.props.Columns,
            UserFilters: this.props.UserFilters,
            SystemFilters: this.props.SystemFilters,
            ColorPalette: this.props.ColorPalette,
            ColumnSorts: this.props.ColumnSorts,
            cssClassName: cssClassName,
            AccessLevel: accessLevel,
            DashboardSize: dashboardSize,
            UseSingleColourForButtons: this.props.DashboardState.UseSingleColourForButtons,
          });
          return (
            <Nav
              key={control}
              style={{ marginRight: '5px', marginTop: '3px', marginBottom: '3px' }}
            >
              {dashboardElememt}
            </Nav>
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
      <Nav key={'home'} style={{ marginRight: '5px', marginTop: '3px', marginBottom: '3px' }}>
        {React.createElement(homeToolbar, {
          cssClassName: cssClassName,
          Blotter: this.props.Blotter,
          UseSingleColourForButtons: this.props.DashboardState.UseSingleColourForButtons,
        })}
      </Nav>
    );

    return (
      <div className={cssBaseClassName}>
        {this.props.DashboardState.DashboardVisibility != Visibility.Hidden && (
          <div className="ab_no_margin">
            {this.props.DashboardState.DashboardVisibility == Visibility.Minimised ? (
              <ButtonToolbar bsSize={'small'} bsStyle={style} className="ab_no_padding_no_margin">
                <OverlayTrigger
                  overlay={<Tooltip id="tooltipShowButton">{showBlotterName} </Tooltip>}
                >
                  <Button
                    bsSize={'small'}
                    bsStyle={style}
                    onClick={() => this.props.onSetDashboardVisibility(Visibility.Visible)}
                  >
                    {blotterName} <Glyphicon glyph={'chevron-down'} />
                  </Button>
                </OverlayTrigger>
              </ButtonToolbar>
            ) : (
              <Navbar key={'mainnavbar'} fluid style={{ zoom: this.props.DashboardState.Zoom }}>
                <div className="ab_no_margin">
                  {homeToolbarElement}
                  {visibleDashboardElements}
                </div>
              </Navbar>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    DashboardState: state.Dashboard,
    EntitlementsState: state.Entitlements,
    // need to get these props so we can 'feed' the toolbars...
    Columns: state.Grid.Columns,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    ColorPalette: state.UserInterface.ColorPalette,
    ColumnSorts: state.Grid.ColumnSorts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
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
