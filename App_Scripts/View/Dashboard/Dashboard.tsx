import * as React from "react";
import { Provider, connect } from 'react-redux';
import * as Redux from "redux";
import { Row, Navbar, Nav } from 'react-bootstrap';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { EntitlementsState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableDashboardViewFactory } from '../AdaptableViewFactory'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'



interface DashboardComponentProps extends IStrategyViewPopupProps<DashboardComponent> {
    DashboardState: DashboardState
    EntitlementsState: EntitlementsState
    onClick: (action: Redux.Action) => Redux.Action
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
    constructor() {
        super()
    }
    render() {
        let visibleDashboardControls = this.props.DashboardState.DashboardStrategyControls.filter(dc => dc.IsVisible);
        let visibleDashboardElements = visibleDashboardControls.map((control, idx) => {
            //here we use the strategy id but if we start to have multiple dashboard control per strategy (which I doubt)
            //we'll need to use the name or something else
            let dashboardControl = AdaptableDashboardViewFactory.get(control.Strategy);
            if (dashboardControl) {
                let isReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == control.Strategy && x.AccessLevel == "ReadOnly") > -1
                let dashboardElememt = React.createElement(dashboardControl, { IsReadOnly: isReadOnly });
                return <Nav key={control.Strategy} style={{ marginRight: "5px", marginTop:"3px", marginBottom: "3px" }} >
                    {dashboardElememt}
                </Nav>
            }
            else {
                console.error("Cannot find Dashboard Control for " + control.Strategy)
            }
        })
        return <Navbar fluid style={{ zoom: this.props.DashboardState.DashboardZoom }}>
                {visibleDashboardElements}
        </Navbar>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardState: state.Dashboard,
        EntitlementsState: state.Entitlements,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action)
    };
}

export let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
