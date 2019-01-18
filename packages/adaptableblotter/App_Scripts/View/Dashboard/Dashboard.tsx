import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import { Navbar, Nav, Button, Glyphicon, OverlayTrigger, ButtonToolbar, Tooltip } from 'react-bootstrap';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { EntitlementsState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableDashboardViewFactory, AdaptableDashboardPermanentToolbarFactory } from '../AdaptableViewFactory'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Visibility, AccessLevel } from "../../Utilities/Enums";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { LoggingHelper } from "../../Utilities/Helpers/LoggingHelper";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { StrategyHelper } from "../../Utilities/Helpers/StrategyHelper";
import { IEntitlement } from "../../Utilities/Interface/IAdaptableBlotterObjects";

interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
    DashboardState: DashboardState
    EntitlementsState: EntitlementsState
    onClick: (action: Redux.Action) => Redux.Action
    onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
    render() {
         let cssClassName: string = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD
        let cssBaseClassName: string = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD_BASE

        let optionsBlotterName: string = this.props.Blotter.BlotterOptions.blotterId;
        let blotterName: string = (optionsBlotterName == GeneralConstants.USER_NAME) ? "Blotter " : optionsBlotterName;
        let showBlotterName: string = "Show " + blotterName + " Dashboard"
        let hiddenEntitlements: IEntitlement[] = this.props.EntitlementsState.FunctionEntitlements.filter(e => e.AccessLevel == "Hidden");
        let visibleDashboardControls = this.props.DashboardState.VisibleToolbars.filter(vt => ArrayExtensions.NotContainsItem(hiddenEntitlements, vt));//.filter(dc => dc.IsVisible);
        let visibleDashboardElements = visibleDashboardControls.map((control, idx) => {
            //here we use the strategy id but if we start to have multiple dashboard control per strategy (which I doubt)
            //we'll need to use the name or something else
            let dashboardControl = AdaptableDashboardViewFactory.get(control);
            if (dashboardControl) {
                let accessLevel: AccessLevel = StrategyHelper.getEntitlementAccessLevelForStrategy(this.props.EntitlementsState.FunctionEntitlements, control);
                let dashboardElememt = React.createElement(dashboardControl, {
                    Blotter: this.props.Blotter,
                    Columns: this.props.Columns,
                    UserFilters: this.props.UserFilters,
                    SystemFilters: this.props.SystemFilters,
                    ColorPalette: this.props.ColorPalette,
                    GridSorts: this.props.GridSorts,
                    cssClassName: cssClassName,
                    AccessLevel: accessLevel
                });
                return <Nav key={control} style={{ marginRight: "5px", marginTop: "3px", marginBottom: "3px" }} >
                    {dashboardElememt}
                </Nav>
            }
            else {
                LoggingHelper.LogError("Cannot find Dashboard Control for " + control)
            }
        })

        let homeToolbar = AdaptableDashboardPermanentToolbarFactory.get(StrategyConstants.HomeStrategyId)
        let homeToolbarElement = <Nav key={"home"} style={{ marginRight: "5px", marginTop: "3px", marginBottom: "3px" }} >
            {React.createElement(homeToolbar, { cssClassName: cssClassName, Blotter: this.props.Blotter })}
        </Nav>

        return <div className={cssBaseClassName}>
            {this.props.DashboardState.DashboardVisibility != Visibility.Hidden &&
                <div className="ab_no_margin">
                    {this.props.DashboardState.DashboardVisibility == Visibility.Minimised ?

                        <ButtonToolbar bsSize={"small"} bsStyle={"primary"} className="ab_no_padding_no_margin" >
                            <OverlayTrigger overlay={<Tooltip id="tooltipShowButton">{showBlotterName} </Tooltip>}>
                                <Button bsSize={"small"} bsStyle={"primary"} onClick={() => this.props.onSetDashboardVisibility(Visibility.Visible)}>
                                    {blotterName} <Glyphicon glyph={"chevron-down"} />
                                </Button>
                            </OverlayTrigger>
                        </ButtonToolbar>
                        :
                        <Navbar key={"mainnavbar"} fluid style={{ zoom: this.props.DashboardState.Zoom }}>
                            <div className="ab_no_margin">
                                {homeToolbarElement}
                                {visibleDashboardElements}
                            </div>
                        </Navbar>
                    }
                </div>
            }
        </div>
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
        GridSorts: state.Grid.GridSorts
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action),
        onSetDashboardVisibility: (visibility: Visibility) => dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
    };
}

export let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

