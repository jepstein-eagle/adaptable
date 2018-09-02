import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import { Navbar, Nav, Button, Glyphicon, OverlayTrigger, ButtonToolbar, Tooltip } from 'react-bootstrap';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { EntitlementsState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableDashboardViewFactory, AdaptableDashboardPermanentToolbarFactory } from '../AdaptableViewFactory'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { DistinctCriteriaPairValue, Visibility } from "../../Core/Enums";
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { AdaptableBlotterLogger } from "../../Core/Helpers/AdaptableBlotterLogger";

interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
    DashboardState: DashboardState
    EntitlementsState: EntitlementsState
    AdaptableBlotter: IAdaptableBlotter
    onClick: (action: Redux.Action) => Redux.Action
    onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
    render() {
        let cssClassName: string = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD
        let cssBaseClassName: string = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD_BASE

        let optionsBlotterName: string = this.props.AdaptableBlotter.BlotterOptions.blotterId;
        let blotterName: string = (optionsBlotterName == GeneralConstants.USER_NAME) ? "Blotter " : optionsBlotterName;
        let showBlotterName: string = "Show " + blotterName + " Dashboard"
        let visibleDashboardControls = this.props.DashboardState.VisibleToolbars//.filter(dc => dc.IsVisible);
        let visibleDashboardElements = visibleDashboardControls.map((control, idx) => {
            //here we use the strategy id but if we start to have multiple dashboard control per strategy (which I doubt)
            //we'll need to use the name or something else
            let dashboardControl = AdaptableDashboardViewFactory.get(control);
            if (dashboardControl) {
                let isReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == control && x.AccessLevel == "ReadOnly") > -1
                let dashboardElememt = React.createElement(dashboardControl, {
                    AdaptableBlotter: this.props.AdaptableBlotter,
                    IsReadOnly: isReadOnly,
                    Columns: this.props.Columns,
                    UserFilters: this.props.UserFilters,
                    SystemFilters: this.props.SystemFilters,
                    ColorPalette: this.props.ColorPalette,
                    GridSorts: this.props.GridSorts,
                    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => this.props.AdaptableBlotter ? this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) : null,
                    cssClassName: cssClassName
                });
                return <Nav key={control} style={{ marginRight: "5px", marginTop: "3px", marginBottom: "3px" }} >
                    {dashboardElememt}
                </Nav>
            }
            else {
                AdaptableBlotterLogger.LogError("Cannot find Dashboard Control for " + control)
            }
        })

        let homeToolbar = AdaptableDashboardPermanentToolbarFactory.get(StrategyIds.HomeStrategyId)
        let homeToolbarElement = <Nav key={"home"} style={{ marginRight: "5px", marginTop: "3px", marginBottom: "3px" }} >
            {React.createElement(homeToolbar, { cssClassName: cssClassName, AdaptableBlotter: this.props.AdaptableBlotter })}
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
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters,
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

