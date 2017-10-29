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
import { IMenuItem } from '../../Core/Interface/IStrategy'

interface FunctionsControlComponentProps extends IStrategyViewPopupProps<FunctionsToolbarControlComponent> {
    FunctionsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onClick: (action: Redux.Action) => Redux.Action
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

        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm >
                <Dropdown id="dropdown-functions" style={smll} >
                    <Dropdown.Toggle>
                        <Glyphicon glyph="home" />{' '}Functions
                            </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {configMenuItems}
                    </Dropdown.Menu>
                </Dropdown>
            </AdaptableBlotterForm>

        </Panel>
    }

    onClick(menuItem: IMenuItem) {
        this.props.onClick(menuItem.Action)
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
        onClick: (action: Redux.Action) => dispatch(action)
    };
}

export let FunctionsToolbarControl = connect(mapStateToProps, mapDispatchToProps)(FunctionsToolbarControlComponent);


var smll = {
    marginTop: '0px',
    marginBottom: '0px',
    marginRight: '0px',
    padding: '0px'

};