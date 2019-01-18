"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const AdaptableBlotterPopup_1 = require("./Components/Popups/AdaptableBlotterPopup");
const AdaptableBlotterPopupPrompt_1 = require("./Components/Popups/AdaptableBlotterPopupPrompt");
const Dashboard_1 = require("./Dashboard/Dashboard");
const AdaptableBlotterPopupConfirmation_1 = require("./Components/Popups/AdaptableBlotterPopupConfirmation");
const StyleConstants = require("../Utilities/Constants/StyleConstants");
const AdaptableBlotterPopupAlert_1 = require("./Components/Popups/AdaptableBlotterPopupAlert");
const AdaptableBlotterChart_1 = require("./Components/Popups/AdaptableBlotterChart");
const AdaptableBlotterLoadingScreen_1 = require("./Components/Popups/AdaptableBlotterLoadingScreen");
const AdaptableBlotterAbout_1 = require("./Components/Popups/AdaptableBlotterAbout");
const ChartEnums_1 = require("../Utilities/ChartEnums");
//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
class AdaptableBlotterView extends React.Component {
    render() {
        return (React.createElement("div", { className: StyleConstants.AB_STYLE + StyleConstants.BASE },
            React.createElement(Dashboard_1.Dashboard, { Blotter: this.props.Blotter }),
            this.props.SystemState.ChartVisibility != ChartEnums_1.ChartVisibility.Hidden &&
                React.createElement(AdaptableBlotterChart_1.AdaptableBlotterChart, { AdaptableBlotter: this.props.Blotter, onClose: this.props.onCloseChartPopup, showChart: this.props.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised, showModal: this.props.ChartState.ShowModal }),
            React.createElement(AdaptableBlotterAbout_1.AdaptableBlotterAbout, { AdaptableBlotter: this.props.Blotter, onClose: this.props.onCloseAboutPopup, showAbout: this.props.PopupState.AboutPopup.ShowAboutPopup }),
            React.createElement(AdaptableBlotterLoadingScreen_1.AdaptableBlotterLoadingScreen, { AdaptableBlotter: this.props.Blotter, onClose: this.props.onCloseLoadingPopup, showLoadingScreen: this.props.PopupState.LoadingPopup.ShowLoadingPopup }),
            React.createElement(AdaptableBlotterPopupAlert_1.AdaptableBlotterPopupAlert, { Header: this.props.PopupState.AlertPopup.Header, Msg: this.props.PopupState.AlertPopup.Msg, onClose: this.props.onCloseAlertPopup, ShowPopup: this.props.PopupState.AlertPopup.ShowAlertPopup, MessageType: this.props.PopupState.AlertPopup.MessageType }),
            React.createElement(AdaptableBlotterPopupPrompt_1.AdaptableBlotterPopupPrompt, { Msg: this.props.PopupState.PromptPopup.PromptMsg, Title: this.props.PopupState.PromptPopup.PromptTitle, onClose: this.props.onClosePromptPopup, onConfirm: this.props.onConfirmPromptPopup, ShowPopup: this.props.PopupState.PromptPopup.ShowPromptPopup }),
            React.createElement(AdaptableBlotterPopupConfirmation_1.AdaptableBlotterPopupConfirmation, { Title: this.props.PopupState.ConfirmationPopup.ConfirmationTitle, Msg: this.props.PopupState.ConfirmationPopup.ConfirmationMsg, ShowPopup: this.props.PopupState.ConfirmationPopup.ShowConfirmationPopup, CancelText: this.props.PopupState.ConfirmationPopup.CancelText, ConfirmText: this.props.PopupState.ConfirmationPopup.ConfirmationText, onCancel: this.props.onCancelConfirmationPopup, onConfirm: this.props.onConfirmConfirmationPopup, ShowCommentBox: this.props.PopupState.ConfirmationPopup.ShowCommentBox }),
            React.createElement(AdaptableBlotterPopup_1.AdaptableBlotterPopup, { showModal: this.props.PopupState.ScreenPopup.ShowScreenPopup, ComponentName: this.props.PopupState.ScreenPopup.ComponentName, ComponentStrategy: this.props.PopupState.ScreenPopup.ComponentStrategy, onHide: this.props.onCloseScreenPopup, Blotter: this.props.Blotter, onClearPopupParams: () => this.props.onClearPopupParams(), PopupParams: this.props.PopupState.ScreenPopup.Params })));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        PopupState: state.Popup,
        SystemState: state.System,
        ChartState: state.Chart,
        AdaptableBlotter: ownProps.Blotter,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onCloseScreenPopup: () => dispatch(PopupRedux.PopupHideScreen()),
        onCloseAlertPopup: () => dispatch(PopupRedux.PopupHideAlert()),
        onCloseAboutPopup: () => dispatch(PopupRedux.PopupHideAbout()),
        onCloseChartPopup: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden)),
        onClosePromptPopup: () => dispatch(PopupRedux.PopupHidePrompt()),
        onConfirmPromptPopup: (inputText) => dispatch(PopupRedux.PopupConfirmPrompt(inputText)),
        onConfirmConfirmationPopup: (comment) => dispatch(PopupRedux.PopupConfirmConfirmation(comment)),
        onCancelConfirmationPopup: () => dispatch(PopupRedux.PopupCancelConfirmation()),
        showPopup: (componentStrategy, componentName, params) => dispatch(PopupRedux.PopupShowScreen(componentStrategy, componentName, params)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam())
    };
}
let AdaptableBlotterWrapper = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);
exports.AdaptableBlotterApp = ({ AdaptableBlotter }) => React.createElement(react_redux_1.Provider, { store: AdaptableBlotter.AdaptableBlotterStore.TheStore },
    React.createElement(AdaptableBlotterWrapper, { Blotter: AdaptableBlotter }));
