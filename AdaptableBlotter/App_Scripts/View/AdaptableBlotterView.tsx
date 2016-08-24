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
//TODO : need to move the interface
import {IAdaptableBlotter} from '../Kendo/AdaptableBlotter'

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupRedux.PopupState;
    MenuState: MenuRedux.MenuState;
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
                <SplitButton bsStyle="primary" title="Adaptable Blotter" id="Adaptable_Blotter_Menu">
                    {menuItems}
                </SplitButton>
                <Modal show={this.props.PopupState.ShowErrorPopup} onHide={this.props.onClose}  >
                    <Modal.Body>
                        <Alert bsStyle="danger" onDismiss={this.props.onClose}>
                            <h4>Error</h4>
                            <p>{this.props.PopupState.ErrorMsg}</p>
                            <p>
                                <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                            </p>
                        </Alert>
                    </Modal.Body>
                </Modal>
                <AdaptableBlotterPopup showModal={this.props.PopupState.ShowPopup}
                    ComponentClassName={this.props.PopupState.ComponentClassName}
                    onHide={this.props.onClose} />

            </div>
        );
    }
    onClick(menuItem: IMenuItem) {
        //this.props.AdaptableBlotter.ClickedMenu(menuItem, this.props.State.);
        this.props.showPopup(menuItem.Action);
    }
}

function mapStateToProps(state: AdaptableBlotterStore.AdaptableBlotterState, ownProps: any) {
    return {
        MenuState: state.Menu,
        PopupState: state.Popup,
        AdaptableBlotter: ownProps.Blotter
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterStore.AdaptableBlotterState>) {
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