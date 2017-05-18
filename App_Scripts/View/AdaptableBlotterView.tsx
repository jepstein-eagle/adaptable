import { MenuItemShowPopup, MenuReduxActionItem } from '../Core/MenuItem';
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Modal, Button, Glyphicon, Navbar, NavItem, Nav, Dropdown, FormControl, Form, Col, Row, ControlLabel } from 'react-bootstrap';
import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { EventDispatcher } from '../Core/EventDispatcher'
import { IEvent } from '../Core/Interface/IEvent';
import { AdaptableBlotterPopup } from './Components/Popups/AdaptableBlotterPopup';
import { PopupState, MenuState, DashboardState, EntitlementsState } from '../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableBlotterPopupError } from './Components/Popups/AdaptableBlotterPopupError'
import { AdaptableBlotterPopupWarning } from './Components/Popups/AdaptableBlotterPopupWarning'
import { AdaptableBlotterPopupPrompt } from './Components/Popups/AdaptableBlotterPopupPrompt'
import { Dashboard } from './Dashboard/Dashboard'
import { AdaptableBlotterPopupConfirmation } from './Components/Popups/AdaptableBlotterPopupConfirmation'
import { AdaptableDashboardViewFactory } from './AdaptableViewFactory';
import * as StrategyIds from '../Core/StrategyIds'

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupState;
    MenuState: MenuState;
    DashboardState: DashboardState
    EntitlementsState: EntitlementsState,
    AdaptableBlotter: IAdaptableBlotter;
    showPopup: (ComponentClassName: string, IsReadOnly: boolean) => PopupRedux.PopupShowAction;
    onClosePopup: () => PopupRedux.PopupHideAction;
    onCloseErrorPopup: () => PopupRedux.PopupHideErrorAction;
    onCloseWarningPopup: () => PopupRedux.PopupHideWarningAction;
    onConfirmPromptPopup: () => PopupRedux.PopupConfirmPromptAction;
    onClosePromptPopup: () => PopupRedux.PopupHidePromptAction;
    onConfirmConfirmationPopup: () => PopupRedux.PopupConfirmConfirmationAction;
    onCancelConfirmationPopup: () => PopupRedux.PopupCancelConfirmationAction;
    onClearPopupParams: () => PopupRedux.PopupClearParamAction;
}

//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {
    render() {
        return (
            <div className="adaptable_blotter_style" >
                <Dashboard />

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
                    AdaptableBlotter={this.props.AdaptableBlotter}
                    onClearPopupParams={() => this.props.onClearPopupParams()}
                    PopupParams={this.props.PopupState.ActionConfigurationPopup.Params} />
            </div>

        );
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
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam())
    };
}

let AdaptableBlotterReact: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

export const AdaptableBlotterApp = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterReact Blotter={AdaptableBlotter} />
</Provider>;