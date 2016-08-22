/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as ReactBootstrap from 'react-bootstrap';

import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import {AdaptableBlotterPopup} from './AdaptableBlotterPopup';
import {IAdaptableBlotter} from '../Kendo/AdaptableBlotter'

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    State: AdaptableBlotterStore.AdaptableBlotterState;
    AdaptableBlotter: IAdaptableBlotter;
    onClose: () => PopupRedux.HidePopupAction;
    showPopup: (ComponentClassName: string) => PopupRedux.ShowPopupAction;
}

class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {
    render() {
        var menuItems = this.props.State.Menu.MenuItems.map((menuItem: IMenuItem) => {
            return <ReactBootstrap.MenuItem key={menuItem.Label} onClick={() => this.onClick(menuItem) }>{menuItem.Label}</ReactBootstrap.MenuItem>
        });
        return (
            <div>
                <ReactBootstrap.SplitButton bsStyle="primary" title="Adaptable Blotter" id="Adaptable_Blotter_Menu">
                    {menuItems}
                </ReactBootstrap.SplitButton>
                <AdaptableBlotterPopup showModal={this.props.State.Popup.ShowPopup}
                    ComponentClassName={this.props.State.Popup.ComponentClassName}
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
        State: state,
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