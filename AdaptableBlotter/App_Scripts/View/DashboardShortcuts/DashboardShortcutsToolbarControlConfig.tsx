/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Navbar, Dropdown, Glyphicon, MenuItem, Panel, FormGroup, Checkbox } from 'react-bootstrap';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/interface/IStrategy'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';

interface DashboardShortcutsControlConfigComponentProps extends IStrategyViewPopupProps<DashboardShortcutsToolbarControlConfigComponent> {
    DashboardShortcutsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onDashboardControlConfigChange: (strategyId: string, newConfig: any) => DashboardRedux.DashboardSetConfigurationItemAction
}

class DashboardShortcutsToolbarControlConfigComponent extends React.Component<DashboardShortcutsControlConfigComponentProps, {}> {

    render() {
        let availableShortcuts = this.props.MenuState.MenuItems.map(menuItem => {
            let config: string[] = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
            let isChecked = false
            if(config)
            {
                isChecked = config.indexOf(menuItem.Label) > -1
            }
            return <Checkbox key={menuItem.Label} checked={isChecked} onChange={(item) => this.onClick(item, menuItem)}>{menuItem.Label}</Checkbox>
        })
        return <PanelWithImage header="Dashboard Shortcut Configuration" bsStyle="primary" glyphicon="dashboard">
            {availableShortcuts}
        </PanelWithImage>
    }

    onClick(item: React.FormEvent, menuItem: IMenuItem) {
        let e = item.target as HTMLInputElement;
        let arrayConfig: Array<string> = [].concat(this.props.DashboardShortcutsDashboardControl.ControlConfiguration)
        if (!arrayConfig) {
            arrayConfig = []
        }
        if (e.checked) {
            arrayConfig.push(menuItem.Label)
        }
        else {
            let index = arrayConfig.indexOf(menuItem.Label)
            arrayConfig.splice(index, 1)
        }
        this.props.onDashboardControlConfigChange(StrategyIds.DashboardShortcutsStrategyId, arrayConfig)
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
        onDashboardControlConfigChange: (strategyId: string, newConfig: any) => dispatch(DashboardRedux.DashboardSetConfigurationItem(strategyId, newConfig))
    };
}

export let DashboardShortcutsToolbarControlConfig = connect(mapStateToProps, mapDispatchToProps)(DashboardShortcutsToolbarControlConfigComponent);
