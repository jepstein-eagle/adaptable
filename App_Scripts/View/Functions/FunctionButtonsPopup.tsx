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
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helpers/Helper';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { IMenuItem } from '../../Core/Interface/IMenu'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from './../DualListBoxEditor'

interface FunctionButtonsPopupComponentProps extends IStrategyViewPopupProps<FunctionButtonsPopupComponent> {
    DashboardShortcutsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onDashboardControlConfigChange: (strategyId: string, newConfig: any) => DashboardRedux.DashboardSetConfigurationItemAction
}

class FunctionButtonsPopupComponent extends React.Component<FunctionButtonsPopupComponentProps, {}> {
    render() {
        let config: string[] = [];
        if(this.props.DashboardShortcutsDashboardControl.ControlConfiguration!=null){
            config = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
        }
        return <PanelWithImage header="Function Buttons Configuration" bsStyle="primary" glyphicon={StrategyGlyphs.FunctionsGlyph}>
            <DualListBoxEditor AvailableValues={this.props.MenuState.MenuItems.filter(x => config.indexOf(x.Label) == -1).map(x=>x.Label)}
                SelectedValues={config}
                HeaderAvailable="Available Function Buttons"
                HeaderSelected="Visible Function Buttons"
                onChange={(SelectedValues) => this.ListChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithImage>
    }

    ListChange(SelectedValues: string[]){
        this.props.onDashboardControlConfigChange(StrategyIds.FunctionsStrategyId, SelectedValues)
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
        this.props.onDashboardControlConfigChange(StrategyIds.FunctionsStrategyId, arrayConfig)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardShortcutsDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.FunctionsStrategyId),
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDashboardControlConfigChange: (strategyId: string, newConfig: any) => dispatch(DashboardRedux.DashboardSetConfigurationItem(strategyId, newConfig))
    };
}

export let FunctionButtonsPopup = connect(mapStateToProps, mapDispatchToProps)(FunctionButtonsPopupComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}