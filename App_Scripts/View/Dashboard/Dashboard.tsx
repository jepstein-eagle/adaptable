import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import { Navbar, Nav, Panel, Button, Glyphicon, OverlayTrigger, ButtonToolbar, Tooltip, NavItem } from 'react-bootstrap';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { EntitlementsState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableDashboardViewFactory, AdaptableDashboardPermanentToolbarFactory } from '../AdaptableViewFactory'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { DefaultAdaptableBlotterOptions } from "../../Core/DefaultAdaptableBlotterOptions";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { HomeToolbarControl } from '../Home/HomeToolbarControl'
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { DistinctCriteriaPairValue } from "../../Core/Enums";
import { IAdaptableBlotterOptions } from "../../Core/Interface/IAdaptableBlotterOptions";


interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
    DashboardState: DashboardState
    EntitlementsState: EntitlementsState
    BlotterOptions: IAdaptableBlotterOptions
    AdaptableBlotter: IAdaptableBlotter
    onClick: (action: Redux.Action) => Redux.Action
    onSetDashboardMinimised: (isMinimised: boolean) => DashboardRedux.DashboardSetIsMinimisedAction
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {

    render() {

        let optionsBlotterName: string = this.props.BlotterOptions.blotterId;
        let blotterName: string = (optionsBlotterName == GeneralConstants.USER_NAME) ? "Blotter " : optionsBlotterName;
        let showBlotterName: string = "Show " + blotterName + " Toolbars"
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
      
                });
                return <Nav key={control} style={{ marginRight: "5px", marginTop: "3px", marginBottom: "3px" }} >
                    {dashboardElememt}
                </Nav>
            }
            else {
                console.error("Cannot find Dashboard Control for " + control)
            }
        })

        let homeToolbar = AdaptableDashboardPermanentToolbarFactory.get(StrategyIds.HomeStrategyId)
        let homeToolbarElement = <Nav key={"home"} style={{ marginRight: "5px", marginTop: "3px", marginBottom: "3px" }} >
            {React.createElement(homeToolbar, { AdaptableBlotter: this.props.AdaptableBlotter })}
        </Nav>

        return <div className="adaptable_blotter_style_base">
            <div className="no_margin_style">
                {this.props.DashboardState.IsMinimised ?

                    <ButtonToolbar bsSize={"small"} bsStyle={"primary"} className="no_padding_no_margin_style" >
                        <OverlayTrigger overlay={<Tooltip id="tooltipShowButton">{showBlotterName} </Tooltip>}>
                            <Button bsSize={"small"} bsStyle={"primary"} onClick={() => this.props.onSetDashboardMinimised(false)}>
                                {blotterName} <Glyphicon glyph={"chevron-down"} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonToolbar> :
                    <Navbar key={"mainnavbar"} fluid style={{ zoom: this.props.DashboardState.Zoom }}>
                        <div className="adaptable_blotter_style_dashboard_base" >
                            <div className="no_margin_style">
                                {homeToolbarElement}
                                {visibleDashboardElements}
                            </div>
                        </div>
                    </Navbar>
                }
            </div>
        </div>
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardState: state.Dashboard,
        EntitlementsState: state.Entitlements,
        BlotterOptions: state.Grid.BlotterOptions,
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
        onSetDashboardMinimised: (isMinimised: boolean) => dispatch(DashboardRedux.DashboardSetIsMinimised(isMinimised)),

    };
}

export let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

