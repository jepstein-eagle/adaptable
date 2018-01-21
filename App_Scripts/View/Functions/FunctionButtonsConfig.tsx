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
import * as StrategyConstants from '../../Core/StrategyConstants'
import { IMenuItem } from '../../Core/Interface/IStrategy'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from './../DualListBoxEditor'

interface FunctionButtonsConfigComponentProps extends IStrategyViewPopupProps<FunctionButtonsConfigComponent> {
    DashboardShortcutsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onDashboardControlConfigChange: (strategyId: string, newConfig: any) => DashboardRedux.DashboardSetConfigurationItemAction
}

class FunctionButtonsConfigComponent extends React.Component<FunctionButtonsConfigComponentProps, {}> {
    render() {
        let config: string[] = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
        return <PanelWithImage header="Function Buttons Configuration" bsStyle="primary" glyphicon="home">
            <DualListBoxEditor AvailableValues={this.props.MenuState.MenuItems.filter(x => config.indexOf(x.Label) == -1).map(x=>x.Label)}
                SelectedValues={config}
                HeaderAvailable="Available Function Buttons"
                HeaderSelected="Visible Function Buttons"
                onChange={(SelectedValues) => this.ListChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithImage>
    }

    ListChange(SelectedValues: string[]){
        this.props.onDashboardControlConfigChange(StrategyConstants.FunctionsStrategyId, SelectedValues)
    }

    onClick(item: React.FormEvent<any>, controlName: string) {
        let e = item.target as HTMLInputElement;
        let originalConf = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
        if (!originalConf) {
            originalConf = []
        }
        let arrayConfig: Array<string> = [].concat(originalConf)
        if (e.checked) {
            arrayConfig.push(controlName)
        }
        else {
            let index = arrayConfig.indexOf(controlName)
            arrayConfig.splice(index, 1)
        }
        this.props.onDashboardControlConfigChange(StrategyConstants.FunctionsStrategyId, arrayConfig)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardShortcutsDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyConstants.FunctionsStrategyId),
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDashboardControlConfigChange: (strategyId: string, newConfig: any) => dispatch(DashboardRedux.DashboardSetConfigurationItem(strategyId, newConfig))
    };
}

export let FunctionButtonsConfig = connect(mapStateToProps, mapDispatchToProps)(FunctionButtonsConfigComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}