import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { AdaptableBlotterPopup } from './Components/Popups/AdaptableBlotterPopup';
import { PopupState } from '../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableBlotterPopupPrompt } from './Components/Popups/AdaptableBlotterPopupPrompt'
import { Dashboard } from './Dashboard/Dashboard'
import { AdaptableBlotterPopupConfirmation } from './Components/Popups/AdaptableBlotterPopupConfirmation'
import * as StyleConstants from '../Utilities/Constants/StyleConstants';
import { AdaptableBlotterPopupAlert } from "./Components/Popups/AdaptableBlotterPopupAlert";
import { AdaptableBlotterChart } from "./Components/Popups/AdaptableBlotterChart";
import { AdaptableBlotterLoadingScreen } from "./Components/Popups/AdaptableBlotterLoadingScreen";
import { AdaptableBlotterAbout } from "./Components/Popups/AdaptableBlotterAbout";


interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupState;
    Blotter: IAdaptableBlotter;
    showPopup: (ComponentStrategy: string, ComponentName: string, IsReadOnly: boolean) => PopupRedux.PopupShowScreenAction;
    onCloseScreenPopup: () => PopupRedux.PopupHideScreenAction;
    onCloseAlertPopup: () => PopupRedux.PopupHideAlertAction;
    onConfirmPromptPopup: () => PopupRedux.PopupConfirmPromptAction;
    onClosePromptPopup: () => PopupRedux.PopupHidePromptAction;
    onConfirmConfirmationPopup: (comment: string) => PopupRedux.PopupConfirmConfirmationAction;
    onCancelConfirmationPopup: () => PopupRedux.PopupCancelConfirmationAction;
    onClearPopupParams: () => PopupRedux.PopupClearParamAction;
    onCloseChartPopup: () => PopupRedux.PopupHideChartAction;
    onCloseLoadingPopup: () => PopupRedux.PopupHideChartAction;
    onCloseAboutPopup: () => PopupRedux.PopupHideAboutAction;
}

//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {
    render() {
        return (
            <div className={StyleConstants.AB_STYLE + StyleConstants.BASE}>
                <Dashboard Blotter={this.props.Blotter} />

                <AdaptableBlotterChart
                    AdaptableBlotter={this.props.Blotter}
                    onClose={this.props.onCloseChartPopup}
                    showChart={this.props.PopupState.ChartPopup.ShowChartPopup}
                />

                <AdaptableBlotterAbout
                    AdaptableBlotter={this.props.Blotter}
                    onClose={this.props.onCloseAboutPopup}
                     showAbout={this.props.PopupState.AboutPopup.ShowAboutPopup}
                 />

                <AdaptableBlotterLoadingScreen
                    AdaptableBlotter={this.props.Blotter}
                    onClose={this.props.onCloseLoadingPopup}
                    showLoadingScreen={this.props.PopupState.LoadingPopup.ShowLoadingPopup}
                />

                <AdaptableBlotterPopupAlert
                    Header={this.props.PopupState.AlertPopup.Header}
                    Msg={this.props.PopupState.AlertPopup.Msg}
                    onClose={this.props.onCloseAlertPopup}
                    ShowPopup={this.props.PopupState.AlertPopup.ShowAlertPopup}
                    MessageType={this.props.PopupState.AlertPopup.MessageType}
                />

                <AdaptableBlotterPopupPrompt
                    Msg={this.props.PopupState.PromptPopup.PromptMsg}
                    Title={this.props.PopupState.PromptPopup.PromptTitle}
                    onClose={this.props.onClosePromptPopup}
                    onConfirm={this.props.onConfirmPromptPopup}
                    ShowPopup={this.props.PopupState.PromptPopup.ShowPromptPopup}
                />

                <AdaptableBlotterPopupConfirmation
                    Title={this.props.PopupState.ConfirmationPopup.ConfirmationTitle}
                    Msg={this.props.PopupState.ConfirmationPopup.ConfirmationMsg}
                    ShowPopup={this.props.PopupState.ConfirmationPopup.ShowConfirmationPopup}
                    CancelText={this.props.PopupState.ConfirmationPopup.CancelText}
                    ConfirmText={this.props.PopupState.ConfirmationPopup.ConfirmationText}
                    onCancel={this.props.onCancelConfirmationPopup}
                    onConfirm={this.props.onConfirmConfirmationPopup}
                    ShowCommentBox={this.props.PopupState.ConfirmationPopup.ShowCommentBox}
                />

                {/*  The main model window where function screens are 'hosted' */}
                <AdaptableBlotterPopup
                    showModal={this.props.PopupState.ScreenPopup.ShowScreenPopup}
                    ComponentName={this.props.PopupState.ScreenPopup.ComponentName}
                    ComponentStrategy={this.props.PopupState.ScreenPopup.ComponentStrategy}
                    onHide={this.props.onCloseScreenPopup}
                     Blotter={this.props.Blotter}
                    onClearPopupParams={() => this.props.onClearPopupParams()}
                    PopupParams={this.props.PopupState.ScreenPopup.Params}
                />
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
        onCloseScreenPopup: () => dispatch(PopupRedux.PopupHideScreen()),
        onCloseAlertPopup: () => dispatch(PopupRedux.PopupHideAlert()),
        onCloseAboutPopup: () => dispatch(PopupRedux.PopupHideAbout()),
        onCloseChartPopup: () => dispatch(PopupRedux.PopupHideChart()),
        onClosePromptPopup: () => dispatch(PopupRedux.PopupHidePrompt()),
        onConfirmPromptPopup: (inputText: string) => dispatch(PopupRedux.PopupConfirmPrompt(inputText)),
        onConfirmConfirmationPopup: (comment: string) => dispatch(PopupRedux.PopupConfirmConfirmation(comment)),
        onCancelConfirmationPopup: () => dispatch(PopupRedux.PopupCancelConfirmation()),
        showPopup: (componentStrategy: string, componentName: string, params?: any) => dispatch(PopupRedux.PopupShowScreen(componentStrategy, componentName, params)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam())
    };
}

let AdaptableBlotterWrapper: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

export const AdaptableBlotterApp = ({ AdaptableBlotter }: { AdaptableBlotter: IAdaptableBlotter }) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterWrapper Blotter={AdaptableBlotter} />
</Provider>;