import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Navbar, Dropdown, Glyphicon, MenuItem, Panel, FormGroup } from 'react-bootstrap';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem, IUIConfirmation } from '../../Core/Interface/IStrategy'
import { PanelDashboard } from "../Components/Panels/PanelDashboard";

interface FunctionsControlComponentProps extends IStrategyViewPopupProps<FunctionsToolbarControlComponent> {
    FunctionsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onClick: (action: Redux.Action) => Redux.Action,
    onConfirmWarning: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction
}

class FunctionsToolbarControlComponent extends React.Component<FunctionsControlComponentProps, {}> {

    render() {

        var configMenuItems = this.props.MenuState.MenuItems.filter(x => {
            let accessLevel = this.props.EntitlementsState.FunctionEntitlements.find(entitlement => entitlement.FunctionName == x.StrategyId)
            if (accessLevel) {
                return accessLevel.AccessLevel != "Hidden"
            }
            return true;
        }).map((menuItem: IMenuItem) => {
            return <MenuItem disabled={this.props.IsReadOnly} key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
        });

        return <PanelDashboard headerText="Functions" glyphicon="home" onHideControl={(confirmation) => this.hideControl(confirmation)}>
            <Dropdown id="dropdown-functions">
                <Dropdown.Toggle>
                    <Glyphicon glyph="home" />{' '}Functions
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

    hideControl(confirmation: IUIConfirmation) {
        confirmation.ConfirmAction = DashboardRedux.ChangeVisibilityDashboardControl(this.props.FunctionsDashboardControl.Strategy, false);
        this.props.onConfirmWarning(confirmation)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FunctionsDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.FunctionsStrategyId),
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action),
        onConfirmWarning: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}

export let FunctionsToolbarControl = connect(mapStateToProps, mapDispatchToProps)(FunctionsToolbarControlComponent);
