import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import { Navbar, Nav, Panel, Button, Glyphicon, OverlayTrigger, ButtonToolbar, Tooltip } from 'react-bootstrap';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { EntitlementsState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableDashboardViewFactory } from '../AdaptableViewFactory'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { DefaultAdaptableBlotterOptions } from "../../Core/DefaultAdaptableBlotterOptions";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'


interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
    DashboardState: DashboardState
    EntitlementsState: EntitlementsState
    BlotterName: string
    onClick: (action: Redux.Action) => Redux.Action
}

export interface DashboardComponentState {
    ShowOpen: boolean
}

class DashboardComponent extends React.Component<DashboardComponentProps, DashboardComponentState> {
    constructor() {
        super()

        this.state = { ShowOpen: true }
    }
    render() {
        let blotterName: string = (this.props.BlotterName == GeneralConstants.USER_NAME) ? "Blotter Toolbar" : this.props.BlotterName;
        let showBlotterName: string = "show " + blotterName;
        let visibleDashboardControls = this.props.DashboardState.DashboardStrategyControls.filter(dc => dc.IsVisible);
        let visibleDashboardElements = visibleDashboardControls.map((control, idx) => {
            //here we use the strategy id but if we start to have multiple dashboard control per strategy (which I doubt)
            //we'll need to use the name or something else
            let dashboardControl = AdaptableDashboardViewFactory.get(control.Strategy);
            if (dashboardControl) {
                let isReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == control.Strategy && x.AccessLevel == "ReadOnly") > -1
                let dashboardElememt = React.createElement(dashboardControl, { IsReadOnly: isReadOnly });
                return <Nav key={control.Strategy} style={{ marginRight: "5px", marginTop: "3px", marginBottom: "3px" }} >
                    {dashboardElememt}
                </Nav>
            }
            else {
                console.error("Cannot find Dashboard Control for " + control.Strategy)
            }
        })

        let hideButton = <Nav style={hideButtonStyle}>
            <ButtonToolbar>
                <OverlayTrigger overlay={<Tooltip id="tooltipHideButton">Hide Toolbar</Tooltip>}>
                    <Button bsSize={"xsmall"} bsStyle={"primary"} onClick={() => this.setState({ ShowOpen: !this.state.ShowOpen } as DashboardComponentState)}>
                        <Glyphicon glyph={"chevron-up"} />
                    </Button>
                </OverlayTrigger>
            </ButtonToolbar>
        </Nav>

        return <div style={divStyle}>
            {this.state.ShowOpen ?

                <Navbar fluid style={{ zoom: this.props.DashboardState.DashboardZoom }}>

                    {visibleDashboardElements}
                    {hideButton}
                </Navbar> :
                <ButtonToolbar bsSize={"small"} bsStyle={"primary"} style={closedButtonStyle} >
                    <OverlayTrigger overlay={<Tooltip id="tooltipShowButton">{showBlotterName} </Tooltip>}>
                        <Button bsSize={"small"} bsStyle={"primary"} onClick={() => this.setState({ ShowOpen: !this.state.ShowOpen } as DashboardComponentState)}>
                            {blotterName} <Glyphicon glyph={"chevron-down"} />
                        </Button>
                    </OverlayTrigger>
                </ButtonToolbar>
            }
        </div>
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

let closedButtonStyle = {
    margin: '0px',
    padding: '0px'
}

let hideButtonStyle = {
    margin: '3px',
}

let divStyle = {
    margin: '0px',
}
let testdivStyle = {
    topMargin: '10px',
}