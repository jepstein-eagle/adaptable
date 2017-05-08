import * as React from "react";
import { Provider, connect } from 'react-redux';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Navbar, Dropdown, Glyphicon, MenuItem, Panel, FormGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy'

interface DashboardShortcutsControlComponentProps extends IStrategyViewPopupProps<DashboardShortcutsToolbarControlComponent> {
    DashboardShortcutsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onClick: (action: Redux.Action) => Redux.Action
}

class DashboardShortcutsToolbarControlComponent extends React.Component<DashboardShortcutsControlComponentProps, {}> {

    render() {
        let shortcutsArray: string[] = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
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
        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm className='navbar-form' >
                <FormGroup controlId="formDashboardShortcuts">
                    {shortcuts}
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

export let DashboardShortcutsToolbarControl = connect(mapStateToProps, mapDispatchToProps)(DashboardShortcutsToolbarControlComponent);
