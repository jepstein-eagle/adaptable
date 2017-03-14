import { MenuItemShowPopup } from '../Core/MenuItem';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Modal, DropdownButton, Button, MenuItem, Alert, Glyphicon, Navbar, NavItem, Nav, Dropdown, FormControl, Form, Col, Row, ControlLabel, ButtonToolbar } from 'react-bootstrap';
import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { EventDispatcher } from '../Core/EventDispatcher'
import { IEvent } from '../Core/Interface/IEvent';
import { AdaptableBlotterPopup } from './Components/Popups/AdaptableBlotterPopup';
import { PopupState, MenuState, DashboardState, EntitlementsState } from '../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { IMenuItem } from '../Core/interface/IStrategy'
import { MenuType } from '../Core/Enums';
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl';
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl';
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl';
import { SmartEditToolbarControl } from './SmartEdit/SmartEditToolbarControl';
import { AdaptableBlotterPopupError } from './Components/Popups/AdaptableBlotterPopupError'
import { AdaptableBlotterPopupWarning } from './Components/Popups/AdaptableBlotterPopupWarning'
import { AdaptableBlotterPopupPrompt } from './Components/Popups/AdaptableBlotterPopupPrompt'
import { AdaptableBlotterPopupConfirmation } from './Components/Popups/AdaptableBlotterPopupConfirmation'

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupState;
    MenuState: MenuState;
    DashboardState: DashboardState
    EntitlementsState: EntitlementsState,
    AdaptableBlotter: IAdaptableBlotter;
    showPopup: (ComponentClassName: string, Params?: any) => PopupRedux.PopupShowAction;
    onClosePopup: () => PopupRedux.PopupHideAction;
    onCloseErrorPopup: () => PopupRedux.PopupHideErrorAction;
    onCloseWarningPopup: () => PopupRedux.PopupHideWarningAction;
    onConfirmPromptPopup: () => PopupRedux.PopupConfirmPromptAction;
    onClosePromptPopup: () => PopupRedux.PopupHidePromptAction;
    onConfirmConfirmationPopup: () => PopupRedux.PopupConfirmConfirmationAction;
    onCancelConfirmationPopup: () => PopupRedux.PopupCancelConfirmationAction;
}

//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {
    render() {

        var configMenuItems = this.props.MenuState.MenuItems.filter(x => {
            let accessLevel = this.props.EntitlementsState.FunctionEntitlements.find(entitlement => entitlement.FunctionName == x.StrategyId)
            if (accessLevel) {
                return accessLevel.AccessLevel != "Hidden"
            }
            return true;
        }).map((menuItem: IMenuItem) => {
            return <MenuItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
        });

        var visibleDashboardControls = this.props.DashboardState.DashboardControls.filter(dc => dc.IsVisible);
        //Because the Dashboard is autonomous and compoenents are not provided by the strategies we have no ways of linking the two together
        //so you need to harcode everything...
        //as discussed the strategies should provide the available react element and Dashbaord should just build them using React.Clonelement like for the PopupShow
        let quickSearchToolbarReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == "QuickSearch" && x.AccessLevel == "ReadOnly") > -1
        let advancedSearchToolbarReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == "AdvancedSearch" && x.AccessLevel == "ReadOnly") > -1
        let layoutToolbarReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == "Layout" && x.AccessLevel == "ReadOnly") > -1
        return (
            <div className="adaptable_blotter_style" >
                {/*  The temporary nav bar - in lieue of a Dashboard - containing action buttons, config dropdown and quick search control */}
                <Navbar fluid >
                    <Navbar.Brand >
                        <Dropdown id="dropdown-functions" >
                            <Dropdown.Toggle style={marginStyle}>
                                <Glyphicon glyph="home" />{' '}Functions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {configMenuItems}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Brand>

                    {/* Im sure we must be able to do this more dynamically and cleverly but while there are ony 3 its ok for now */}
                    {visibleDashboardControls.find(dc => dc.Name == "Quick Search") != null &&
                        <Nav>
                            <QuickSearchToolbarControl IsReadOnly={quickSearchToolbarReadOnly}/>
                        </Nav>
                    }
                    {visibleDashboardControls.find(dc => dc.Name == "Advanced Search") != null && <Nav>
                        <AdvancedSearchToolbarControl IsReadOnly={advancedSearchToolbarReadOnly}/>
                    </Nav>
                    }
                    {visibleDashboardControls.find(dc => dc.Name == "Layout") != null && <Nav>
                        <LayoutToolbarControl IsReadOnly={layoutToolbarReadOnly}/>
                    </Nav>
                    }

                </Navbar>

                <AdaptableBlotterPopupError Msg={this.props.PopupState.ErrorPopup.ErrorMsg}
                    onClose={this.props.onCloseErrorPopup}
                    ShowPopup={this.props.PopupState.ErrorPopup.ShowErrorPopup} />

                <AdaptableBlotterPopupWarning Msg={this.props.PopupState.WarningPopup.WarningMsg}
                    onClose={this.props.onCloseWarningPopup}
                    ShowPopup={this.props.PopupState.WarningPopup.ShowWarningPopup} />

                <AdaptableBlotterPopupPrompt
                    Msg={this.props.PopupState.PromptPopup.PromptMsg}
                    Title={this.props.PopupState.PromptPopup.PromptTitle}
                    onClose={this.props.onClosePromptPopup}
                    onConfirm={this.props.onConfirmPromptPopup}
                    ShowPopup={this.props.PopupState.PromptPopup.ShowPromptPopup} />

                <AdaptableBlotterPopupConfirmation
                    Title={this.props.PopupState.ConfirmationPopup.ConfirmationTitle}
                    Msg={this.props.PopupState.ConfirmationPopup.ConfirmationMsg}
                    ShowPopup={this.props.PopupState.ConfirmationPopup.ShowConfirmationPopup}
                    CancelText={this.props.PopupState.ConfirmationPopup.CancelText}
                    ConfirmText={this.props.PopupState.ConfirmationPopup.ConfirmationText}
                    onCancel={this.props.onCancelConfirmationPopup}
                    onConfirm={this.props.onConfirmConfirmationPopup} />

                {/*  The main model window where action and configuration screens are 'hosted' */}
                <AdaptableBlotterPopup showModal={this.props.PopupState.ActionConfigurationPopup.ShowPopup}
                    ComponentClassName={this.props.PopupState.ActionConfigurationPopup.ComponentClassName}
                    onHide={this.props.onClosePopup}
                    IsReadOnly={this.props.PopupState.ActionConfigurationPopup.IsReadOnly}
                    AdaptableBlotter={this.props.AdaptableBlotter} />
            </div>

        );
    }

    onClick(menuItem: IMenuItem) {
        if (menuItem instanceof MenuItemShowPopup) {
            let accessLevel = this.props.EntitlementsState.FunctionEntitlements.find(x => x.FunctionName == menuItem.StrategyId)
            this.props.showPopup(menuItem.Action, accessLevel ? accessLevel.AccessLevel == "ReadOnly" : false);
        }
        else {
            this.props.AdaptableBlotter.onMenuClicked(menuItem)
        };
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        MenuState: state.Menu,
        PopupState: state.Popup,
        DashboardState: state.Dashboard,
        EntitlementsState: state.Entitlements,
        AdaptableBlotter: ownProps.Blotter,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClosePopup: () => dispatch(PopupRedux.PopupHide()),
        onCloseErrorPopup: () => dispatch(PopupRedux.PopupHideError()),
        onCloseWarningPopup: () => dispatch(PopupRedux.PopupHideWarning()),
        onClosePromptPopup: () => dispatch(PopupRedux.PopupHidePrompt()),
        onConfirmPromptPopup: (inputText: string) => dispatch(PopupRedux.PopupConfirmPrompt(inputText)),
        onConfirmConfirmationPopup: () => dispatch(PopupRedux.PopupConfirmConfirmation()),
        onCancelConfirmationPopup: () => dispatch(PopupRedux.PopupCancelConfirmation()),
        showPopup: (componentClassName: string, isReadOnly: boolean, params?: any) => dispatch(PopupRedux.PopupShow(componentClassName, isReadOnly, params)),
    };
}

let AdaptableBlotterReact: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

export const AdaptableBlotterApp = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterReact Blotter={AdaptableBlotter} />
</Provider>;

let marginStyle = {
    padding: '3px',

}

let glyphStyle = {
    fontSize: "large",
    marginRight: '5px',
    padding: '0px'
}

let headerStyle = {
    fontSize: "large",

}
