import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { AdaptableBlotterPopup } from './Components/Popups/AdaptableBlotterPopup';
import { PopupState, MenuState, DashboardState, EntitlementsState } from '../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableBlotterPopupError } from './Components/Popups/AdaptableBlotterPopupError'
import { AdaptableBlotterPopupWarning } from './Components/Popups/AdaptableBlotterPopupWarning'
import { AdaptableBlotterPopupPrompt } from './Components/Popups/AdaptableBlotterPopupPrompt'
import { Dashboard } from './Dashboard/Dashboard'
import { AdaptableBlotterPopupConfirmation } from './Components/Popups/AdaptableBlotterPopupConfirmation'
import { AdaptableBlotterPopupInfo } from './Components/Popups/AdaptableBlotterPopupInfo';
import { UIHelper } from "./UIHelper";
import * as StyleConstants from '../Core/Constants/StyleConstants';


interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupState;
    AdaptableBlotter: IAdaptableBlotter;
    showPopup: (ComponentName: string, IsReadOnly: boolean) => PopupRedux.PopupShowAction;
    onClosePopup: () => PopupRedux.PopupHideAction;
    onCloseErrorPopup: () => PopupRedux.PopupHideErrorAction;
    onCloseWarningPopup: () => PopupRedux.PopupHideWarningAction;
    onCloseInfoPopup: () => PopupRedux.PopupHideInfoAction;
    onConfirmPromptPopup: () => PopupRedux.PopupConfirmPromptAction;
    onClosePromptPopup: () => PopupRedux.PopupHidePromptAction;
    onConfirmConfirmationPopup: (comment: string) => PopupRedux.PopupConfirmConfirmationAction;
    onCancelConfirmationPopup: () => PopupRedux.PopupCancelConfirmationAction;
    onClearPopupParams: () => PopupRedux.PopupClearParamAction;
}

//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {
    render() {
 
        return (
            <div className={StyleConstants.AB_STYLE + StyleConstants.BASE}>
                <Dashboard AdaptableBlotter={this.props.AdaptableBlotter} />

                <AdaptableBlotterPopupError Msg={this.props.PopupState.ErrorPopup.ErrorMsg}
                    onClose={this.props.onCloseErrorPopup}
                    ShowPopup={this.props.PopupState.ErrorPopup.ShowErrorPopup} />

                <AdaptableBlotterPopupWarning Msg={this.props.PopupState.WarningPopup.WarningMsg}
                    onClose={this.props.onCloseWarningPopup}
                    ShowPopup={this.props.PopupState.WarningPopup.ShowWarningPopup} />

                <AdaptableBlotterPopupInfo Msg={this.props.PopupState.InfoPopup.InfoMsg}
                    onClose={this.props.onCloseInfoPopup}
                    ShowPopup={this.props.PopupState.InfoPopup.ShowInfoPopup} />

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
                    onConfirm={this.props.onConfirmConfirmationPopup}
                    ShowCommentBox={this.props.PopupState.ConfirmationPopup.ShowCommentBox} />

                {/*  The main model window where function screens are 'hosted' */}
                <AdaptableBlotterPopup showModal={this.props.PopupState.ScreenPopup.ShowPopup}
                    ComponentName={this.props.PopupState.ScreenPopup.ComponentName}
                    onHide={this.props.onClosePopup}
                    IsReadOnly={this.props.PopupState.ScreenPopup.IsReadOnly}
                    AdaptableBlotter={this.props.AdaptableBlotter}
                    onClearPopupParams={() => this.props.onClearPopupParams()}
                    PopupParams={this.props.PopupState.ScreenPopup.Params} />
            </div>

        );
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        PopupState: state.Popup,
        AdaptableBlotter: ownProps.Blotter,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClosePopup: () => dispatch(PopupRedux.PopupHide()),
        onCloseErrorPopup: () => dispatch(PopupRedux.PopupHideError()),
        onCloseWarningPopup: () => dispatch(PopupRedux.PopupHideWarning()),
        onCloseInfoPopup: () => dispatch(PopupRedux.PopupHideInfo()),
        onClosePromptPopup: () => dispatch(PopupRedux.PopupHidePrompt()),
        onConfirmPromptPopup: (inputText: string) => dispatch(PopupRedux.PopupConfirmPrompt(inputText)),
        onConfirmConfirmationPopup: (comment: string) => dispatch(PopupRedux.PopupConfirmConfirmation(comment)),
        onCancelConfirmationPopup: () => dispatch(PopupRedux.PopupCancelConfirmation()),
        showPopup: (componentName: string, isReadOnly: boolean, params?: any) => dispatch(PopupRedux.PopupShow(componentName, isReadOnly, params)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam())
    };
}

let AdaptableBlotterReact: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

export const AdaptableBlotterApp = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterReact Blotter={AdaptableBlotter} />
</Provider>;