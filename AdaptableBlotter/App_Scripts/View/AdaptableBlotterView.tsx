import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableBlotter } from '../Kendo/AdaptableBlotter';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Modal, DropdownButton, Button, MenuItem, Alert, Glyphicon, Navbar, NavItem, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';
import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as QuickSearchRedux from '../Redux/ActionsReducers/QuickSearchRedux'
import { AdaptableBlotterPopup } from './AdaptableBlotterPopup';
import { PopupState, MenuState, QuickSearchState } from '../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { IMenuItem } from '../Core/interface/IStrategy'
import { MenuType } from '../Core/Enums';

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupState;
    MenuState: MenuState;
    AdaptableBlotter: IAdaptableBlotter;
    onClose: () => PopupRedux.HidePopupAction;
    showPopup: (ComponentClassName: string) => PopupRedux.ShowPopupAction;
    onSetQuickSearchText: (newQuickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction,
}

interface QuickSearchActionState {
    EditedQuickSearchText: string
}

class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, QuickSearchActionState> {

    // can we lose this constructor?
    constructor() {
        super();
        this.state = { EditedQuickSearchText: "" }
    }

    public componentDidMount() {
        this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.subscribe(() => this.onQuickSearchStateChanged())
    }

    render() {

        // a, rather basic, top menu. done for early demo purposes but needs to be replaced by a proper, configurable, 'dashboard' like in WPF version
        // in this version all action items are buttons and all config screens go in a dropdown
        if (this.props.MenuState.MenuItems) {
            var actionMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Action).map((menuItem: IMenuItem) => {
                return <MenuItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
            });
        }

        if (this.props.MenuState.MenuItems) {
            var configMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Configuration).map((menuItem: IMenuItem) => {
                return <MenuItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
            });
        }

        let navbar =
            <Navbar  >
                <Navbar.Header>
                    <Navbar.Brand>
                        Adaptable Blotter
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {actionMenuItems}
                    <NavDropdown key="Configure" title="Configure..." id="basic-nav-dropdown">
                        {configMenuItems}
                    </NavDropdown>
                </Nav>

            </Navbar>
        let navbar2 =
            <Navbar fluid>
                <Nav>
                    <Form className='navbar-form' action="">
                        <FormControl
                            type="text"
                            placeholder="Quick Search"
                            value={this.state.EditedQuickSearchText}
                            onChange={(x) => this.onUpdateQuickSearchText(x)}
                            onKeyDown={(x) => this.onKeyDownQuickSearch(x)}
                            />
                        <Button bsStyle='success' onClick={(x) => this.onApplyQuickSearch(x)} >Search</Button>
                    </Form>
                </Nav>

            </Navbar>


        return (

            <div >

                {navbar}
                {navbar2}

                {/*  The error modal we show - e.g. in SmartEdit when no numeric columns are selected */}
                <Modal show={this.props.PopupState.ShowErrorPopup} onHide={this.props.onClose}  >
                    <Modal.Body>
                        <Alert bsStyle="danger" onDismiss={this.props.onClose}>
                            <h4>Error</h4>
                            <p>
                                {this.props.PopupState.ErrorMsg.split("\n").map(function (item, index) {
                                    return (
                                        <span key={index}>
                                            {item}
                                            <br />
                                        </span>
                                    )
                                })}
                            </p>
                            <p>
                                <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                            </p>
                        </Alert>
                    </Modal.Body>
                </Modal>

                {/*  The main model window where action and configuration screens are 'hosted' */}
                <AdaptableBlotterPopup showModal={this.props.PopupState.ShowPopup}
                    ComponentClassName={this.props.PopupState.ComponentClassName}
                    onHide={this.props.onClose}
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

    onUpdateQuickSearchText(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ EditedQuickSearchText: e.value });
    }

    // doing 2 things here 
    // 1. stopping strange effect of pressing enter in the input making the whole blotter reload - no fucking idea why it does that....
    // 2.  triggering the apply quick search (in other words making it as though I pressed the button)
    onKeyDownQuickSearch(event: React.KeyboardEvent) {
        let e: any = event.keyCode;

        if (e == 13) {
            event.stopPropagation();
            this.onApplyQuickSearch(null);
        }
    }

    onApplyQuickSearch(event: React.FormEvent) {

        this.props.onSetQuickSearchText(this.state.EditedQuickSearchText);
    }

    // is there a better way to keep them in sync?
    onQuickSearchStateChanged() {
        if (this.state != null && this.state.EditedQuickSearchText != this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText) {
            this.setState({ EditedQuickSearchText: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText });
        }
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
        onClose: () => dispatch(PopupRedux.HidePopup()),
        showPopup: (ComponentClassName: string) => dispatch(PopupRedux.ShowPopup(ComponentClassName, null)),
        onSetQuickSearchText: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(newQuickSearchText)),
    };
}

let AdaptableBlotterReact: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

export const AdaptableBlotterApp = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterReact Blotter={AdaptableBlotter} />
</Provider>;

let titleStyle: React.CSSProperties = {
    fontSize: "18px"
}

let buttonStyle: React.CSSProperties = {
    active: "none",
    focus: "none"
}

