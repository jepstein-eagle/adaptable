import { MenuItemShowPopup } from '../Core/MenuItem';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Modal, DropdownButton, Button, MenuItem, Alert, Glyphicon, Navbar, NavItem, Nav, NavDropdown, FormControl, Form, Col, Row, ControlLabel, ButtonToolbar } from 'react-bootstrap';
import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { EventDispatcher } from '../Core/EventDispatcher'
import { IEvent } from '../Core/Interface/IEvent';
import { AdaptableBlotterPopup } from './AdaptableBlotterPopup';
import { PopupState, MenuState } from '../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { IMenuItem } from '../Core/interface/IStrategy'
import { MenuType } from '../Core/Enums';
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl';
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl';
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl';
import { AdaptableBlotterPopupError } from './AdaptableBlotterPopupError'
import { AdaptableBlotterPopupWarning } from './AdaptableBlotterPopupWarning'
import { AdaptableBlotterPopupPrompt } from './AdaptableBlotterPopupPrompt'
import { AdaptableBlotterPopupConfirmation } from './AdaptableBlotterPopupConfirmation'

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupState;
    MenuState: MenuState;
    AdaptableBlotter: IAdaptableBlotter;
    showPopup: (ComponentClassName: string, Params?: any) => PopupRedux.ShowPopupAction;
    onClosePopup: () => PopupRedux.HidePopupAction;
    onCloseErrorPopup: () => PopupRedux.HideErrorPopupAction;
    onCloseWarningPopup: () => PopupRedux.HideWarningPopupAction;
    onConfirmPromptPopup: () => PopupRedux.HidePromptPopupAction;
    onClosePromptPopup: () => PopupRedux.HidePromptPopupAction;
    onConfirmConfirmationPopup: () => PopupRedux.ConfirmConfirmationPopupAction;
    onCancelConfirmationPopup: () => PopupRedux.CancelConfirmationPopupAction;
}

class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {

    render() {

        // a, rather basic, top menu. done for early demo purposes and which needs soon to be replaced by a proper, configurable, 'dashboard' like in WPF version
        // in this version all action items are buttons and all config screens go in a dropdown
        // plus i've added very simple quick search and advanced search controls
        if (this.props.MenuState.MenuItems) {
            var actionMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Action).map((menuItem: IMenuItem) => {
                return <NavItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</NavItem>
            });
        }

        if (this.props.MenuState.MenuItems) {
            var configMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Configuration).map((menuItem: IMenuItem) => {
                return <MenuItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
            });
        }

        return (
            <div className="adaptable_blotter_style">
                {/*  The temporary nav bar - in lieue of a Dashboard - containing action buttons, config dropdown and quick search control */}
                <Navbar fluid  >
                    <Navbar.Header>
                        <QuickSearchToolbarControl />
                    </Navbar.Header>
                    <Navbar.Header>
                        {<AdvancedSearchToolbarControl />}
                    </Navbar.Header>
                    <Navbar.Header>
                        {<LayoutToolbarControl />}
                    </Navbar.Header>
                    <Nav style={marginStyle} >

                        <NavDropdown key="functions" title="Functions..." id="basic-nav-dropdown">
                            {actionMenuItems}
                        </NavDropdown>

                        <NavDropdown key="Configure" title="Configure..." id="basic-nav-dropdown">
                            {configMenuItems}
                        </NavDropdown>

                    </Nav>
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
                    AdaptableBlotter={this.props.AdaptableBlotter} />
            </div>

        );
    }

    onClick(menuItem: IMenuItem) {
        if (menuItem instanceof MenuItemShowPopup) {
            this.props.showPopup(menuItem.Action);
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
        AdaptableBlotter: ownProps.Blotter,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClosePopup: () => dispatch(PopupRedux.HidePopup()),
        onCloseErrorPopup: () => dispatch(PopupRedux.HideErrorPopup()),
        onCloseWarningPopup: () => dispatch(PopupRedux.HideWarningPopup()),
        onClosePromptPopup: () => dispatch(PopupRedux.HidePromptPopup()),
        onConfirmPromptPopup: () => dispatch(PopupRedux.HidePromptPopup()),
        onConfirmConfirmationPopup: () => dispatch(PopupRedux.ConfirmConfirmationPopup()),
        onCancelConfirmationPopup: () => dispatch(PopupRedux.CancelConfirmationPopup()),
        showPopup: (componentClassName: string, params?: any) => dispatch(PopupRedux.ShowPopup(componentClassName, params)),
    };
}

let AdaptableBlotterReact: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

export const AdaptableBlotterApp = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterReact Blotter={AdaptableBlotter} />
</Provider>;

let marginStyle: React.CSSProperties = {
    margin: '3px'
}

let glyphStyle = {
    fontSize: "large",
    marginRight: '5px',
    padding: '0px'
}

let headerStyle = {
    fontSize: "large",

}
