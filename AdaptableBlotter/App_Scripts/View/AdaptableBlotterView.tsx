import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableBlotter } from '../Kendo/AdaptableBlotter';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Modal, DropdownButton, Button, MenuItem, Alert, Glyphicon, Navbar, NavItem, Nav, NavDropdown } from 'react-bootstrap';

import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { AdaptableBlotterPopup } from './AdaptableBlotterPopup';
import { PopupState, MenuState } from '../Redux/ActionsReducers/Interface/IState';
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
}

class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {
    render() {
        if (this.props.MenuState.MenuItems) {
            var actionMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Action).map((menuItem: IMenuItem) => {
                return <MenuItem eventKey={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
            });
        }

        if (this.props.MenuState.MenuItems) {
            var configMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Configuration).map((menuItem: IMenuItem) => {
                return <MenuItem eventKey={menuItem.Label} key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
            });
        }

        let navbar =
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Adaptable Blotter</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {actionMenuItems}
                    <NavDropdown eventKey={3} title="Configure" id="basic-nav-dropdown">
                        {configMenuItems}
                    </NavDropdown>
                </Nav>
            </Navbar>

        return (
            <div>
                {navbar}

              
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
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        MenuState: state.Menu,
        PopupState: state.Popup,
        AdaptableBlotter: ownProps.Blotter
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClose: () => dispatch(PopupRedux.HidePopup()),
        showPopup: (ComponentClassName: string) => dispatch(PopupRedux.ShowPopup(ComponentClassName, null))
    };
}

let AdaptableBlotterReact: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

// export default AdaptableBlotterReact;

export const AdaptableBlotterApp = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterReact Blotter={AdaptableBlotter} />
</Provider>;