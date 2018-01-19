import * as React from "react";
import { Provider, connect } from 'react-redux';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Navbar, Dropdown, Glyphicon, MenuItem, Panel, FormGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IToolbarStrategyViewPopupProps } from '../../Core/Interface/IToolbarStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Core/StrategyConstants'
import * as ScreenPopups from '../../Core/ScreenPopups'
import { IMenuItem, IUIConfirmation } from '../../Core/Interface/IStrategy'

interface FunctionControlComponentProps extends IToolbarStrategyViewPopupProps<FunctionToolbarControlComponent> {
     MenuState: MenuState,
    EntitlementsState: EntitlementsState
}

class FunctionToolbarControlComponent extends React.Component<FunctionControlComponentProps, {}> {

    render() {

        // functions
        var configMenuItems = this.props.MenuState.MenuItems.filter(x => {
            let accessLevel = this.props.EntitlementsState.FunctionEntitlements.find(entitlement => entitlement.FunctionName == x.StrategyId)
            if (accessLevel) {
                return accessLevel.AccessLevel != "Hidden"
            }
            return true;
        }).map((menuItem: IMenuItem) => {
            return <MenuItem disabled={this.props.IsReadOnly} key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
        });

        // shortcuts
        let shortcutsArray: string[] = this.props.DashboardControl.ControlConfiguration
        let shortcuts: any
        if (shortcutsArray) {
            shortcuts = shortcutsArray.map(x => {
                let menuItem = this.props.MenuState.MenuItems.find(y => y.Label == x)
                if (menuItem) {
                    return <OverlayTrigger key={x} overlay={<Tooltip id="tooltipButton" > {menuItem.Label}</Tooltip >}>
                        <Button disabled={this.props.IsReadOnly} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /></Button>
                    </OverlayTrigger >
                }
            })
        }
        return <PanelDashboard headerText="Functions" glyphicon="home" onClose={ ()=> this.props.onClose(this.props.DashboardControl)} onConfigure={()=>this.props.onConfigure()}>
            {shortcuts}
            <Dropdown id="dropdown-functions">
                <Dropdown.Toggle>
                    All
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    {configMenuItems}
                </Dropdown.Menu>
            </Dropdown>
        </PanelDashboard>
    }

    onClick(menuItem: IMenuItem) {
        this.props.onClick(menuItem.Action)
    }
    
 
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyConstants.FunctionsStrategyId),
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: () => dispatch(PopupRedux.PopupShow(ScreenPopups.FunctionButtonsConfigPopup))
    };
}

export let FunctionToolbarControl = connect(mapStateToProps, mapDispatchToProps)(FunctionToolbarControlComponent);
