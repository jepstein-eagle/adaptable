import {MenuItemShowPopup} from '../Core/MenuItem';
import {AdaptableBlotter} from '../Kendo/AdaptableBlotter';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {Modal, SplitButton, Button, MenuItem, Alert} from 'react-bootstrap';

import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import {AdaptableBlotterPopup} from './AdaptableBlotterPopup';
import {PopupState, MenuState} from '../Redux/ActionsReducers/Interface/IState';
import {IAdaptableBlotter} from '../Core/Interface/IAdaptableBlotter';
import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore';
import {IMenuItem} from '../Core/interface/IStrategy'


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
            var menuItems = this.props.MenuState.MenuItems.map((menuItem: IMenuItem) => {
                return <MenuItem key={menuItem.Label} onClick={() => this.onClick(menuItem) }>{menuItem.Label}</MenuItem>
            });
        }
        return (
            <div>
                <SplitButton bsStyle="primary" title="Adaptable Blotter Functions" id="Adaptable_Blotter_Menu">
                    {menuItems}
                </SplitButton>
                <Modal show={this.props.PopupState.ShowErrorPopup} onHide={this.props.onClose}  >
                    <Modal.Body>
                        <Alert bsStyle="danger" onDismiss={this.props.onClose}>
                            <h4>Error</h4>
                            {this.props.PopupState.ErrorMsg.split("\n").map(function(item,index) {
                            return (
                                <span key={index}>
                                {item}
                                <br/>
                                </span>
                            )
                            })}
                            <p>
                                <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                            </p>
                        </Alert>
                    </Modal.Body>
                </Modal>
                <AdaptableBlotterPopup showModal={this.props.PopupState.ShowPopup}
                    ComponentClassName={this.props.PopupState.ComponentClassName}
                    onHide={this.props.onClose} 
                    AdaptableBlotter={this.props.AdaptableBlotter}/>

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
    <AdaptableBlotterReact Blotter={AdaptableBlotter}/>
</Provider>;