/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
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
import { IMenuItem } from '../../Core/interface/IStrategy'

interface DashboardShortcutsControlConfigComponentProps extends IStrategyViewPopupProps<DashboardShortcutsToolbarControlConfigComponent> {
    DashboardShortcutsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onClick: (action: Redux.Action) => Redux.Action
}

class DashboardShortcutsToolbarControlConfigComponent extends React.Component<DashboardShortcutsControlConfigComponentProps, {}> {

    render() {
        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm className='navbar-form' >
                <FormGroup controlId="formDashboardShortcuts">
              
                </FormGroup>

            </AdaptableBlotterForm>

        </Panel>
    }

    onClick(menuItem: IMenuItem) {
        this.props.onClick(menuItem.Action)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardShortcutsDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.DashboardShortcutsStrategyId),
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action)
    };
}

export let DashboardShortcutsToolbarControlConfig = connect(mapStateToProps, mapDispatchToProps)(DashboardShortcutsToolbarControlConfigComponent);
