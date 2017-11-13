import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Navbar, Label, Dropdown, ListGroup, Glyphicon, MenuItem, Panel, FormGroup, Checkbox } from 'react-bootstrap';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from './../DualListBoxEditor'

interface DashboardShortcutsControlConfigComponentProps extends IStrategyViewPopupProps<DashboardShortcutsToolbarControlConfigComponent> {
    DashboardShortcutsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onDashboardControlConfigChange: (strategyId: string, newConfig: any) => DashboardRedux.DashboardSetConfigurationItemAction
}

class DashboardShortcutsToolbarControlConfigComponent extends React.Component<DashboardShortcutsControlConfigComponentProps, {}> {
    render() {
        let config: string[] = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
        return <PanelWithImage header="Dashboard Bookmarks Configuration" bsStyle="primary" glyphicon="bookmark">
            <DualListBoxEditor AvailableValues={this.props.MenuState.MenuItems.filter(x => config.indexOf(x.Label) == -1).map(x=>x.Label)}
                SelectedValues={config}
                HeaderAvailable="Available Bookmarks"
                HeaderSelected="Selected Bookmarks"
                onChange={(SelectedValues) => this.ListChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithImage>
    }

    ListChange(SelectedValues: string[]){
        this.props.onDashboardControlConfigChange(StrategyIds.DashboardShortcutsStrategyId, SelectedValues)
    }

    onClick(item: React.FormEvent<any>, bookmark: string) {
        let e = item.target as HTMLInputElement;
        let originalConf = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
        if (!originalConf) {
            originalConf = []
        }
        let arrayConfig: Array<string> = [].concat(originalConf)
        if (e.checked) {
            arrayConfig.push(bookmark)
        }
        else {
            let index = arrayConfig.indexOf(bookmark)
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

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}