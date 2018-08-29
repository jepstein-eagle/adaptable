"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const AdaptableBlotterPopup_1 = require("./Components/Popups/AdaptableBlotterPopup");
const AdaptableBlotterPopupPrompt_1 = require("./Components/Popups/AdaptableBlotterPopupPrompt");
const Dashboard_1 = require("./Dashboard/Dashboard");
const AdaptableBlotterPopupConfirmation_1 = require("./Components/Popups/AdaptableBlotterPopupConfirmation");
const StyleConstants = require("../Core/Constants/StyleConstants");
const AdaptableBlotterPopupAlert_1 = require("./Components/Popups/AdaptableBlotterPopupAlert");
const AdaptableBlotterChart_1 = require("./Components/Popups/AdaptableBlotterChart");
//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
class AdaptableBlotterView extends React.Component {
    render() {
        return (React.createElement("div", { className: StyleConstants.AB_STYLE + StyleConstants.BASE },
            React.createElement(Dashboard_1.Dashboard, { AdaptableBlotter: this.props.AdaptableBlotter }),
            React.createElement(AdaptableBlotterChart_1.AdaptableBlotterChart, { AdaptableBlotter: this.props.AdaptableBlotter, onClose: this.props.onCloseChartPopup, showChart: this.props.PopupState.ChartPopup.ShowChartPopup }),
            React.createElement(AdaptableBlotterPopupAlert_1.AdaptableBlotterPopupAlert, { Header: this.props.PopupState.AlertPopup.Header, Msg: this.props.PopupState.AlertPopup.Msg, onClose: this.props.onCloseAlertPopup, ShowPopup: this.props.PopupState.AlertPopup.ShowAlertPopup, MessageType: this.props.PopupState.AlertPopup.MessageType }),
            React.createElement(AdaptableBlotterPopupPrompt_1.AdaptableBlotterPopupPrompt, { Msg: this.props.PopupState.PromptPopup.PromptMsg, Title: this.props.PopupState.PromptPopup.PromptTitle, onClose: this.props.onClosePromptPopup, onConfirm: this.props.onConfirmPromptPopup, ShowPopup: this.props.PopupState.PromptPopup.ShowPromptPopup }),
            React.createElement(AdaptableBlotterPopupConfirmation_1.AdaptableBlotterPopupConfirmation, { Title: this.props.PopupState.ConfirmationPopup.ConfirmationTitle, Msg: this.props.PopupState.ConfirmationPopup.ConfirmationMsg, ShowPopup: this.props.PopupState.ConfirmationPopup.ShowConfirmationPopup, CancelText: this.props.PopupState.ConfirmationPopup.CancelText, ConfirmText: this.props.PopupState.ConfirmationPopup.ConfirmationText, onCancel: this.props.onCancelConfirmationPopup, onConfirm: this.props.onConfirmConfirmationPopup, ShowCommentBox: this.props.PopupState.ConfirmationPopup.ShowCommentBox }),
            React.createElement(AdaptableBlotterPopup_1.AdaptableBlotterPopup, { showModal: this.props.PopupState.ScreenPopup.ShowScreenPopup, ComponentName: this.props.PopupState.ScreenPopup.ComponentName, onHide: this.props.onCloseScreenPopup, IsReadOnly: this.props.PopupState.ScreenPopup.IsReadOnly, AdaptableBlotter: this.props.AdaptableBlotter, onClearPopupParams: () => this.props.onClearPopupParams(), PopupParams: this.props.PopupState.ScreenPopup.Params })));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        PopupState: state.Popup,
        AdaptableBlotter: ownProps.Blotter,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onCloseScreenPopup: () => dispatch(PopupRedux.PopupHideScreen()),
        onCloseAlertPopup: () => dispatch(PopupRedux.PopupHideAlert()),
        onCloseChartPopup: () => dispatch(PopupRedux.PopupHideChart()),
        onClosePromptPopup: () => dispatch(PopupRedux.PopupHidePrompt()),
        onConfirmPromptPopup: (inputText) => dispatch(PopupRedux.PopupConfirmPrompt(inputText)),
        onConfirmConfirmationPopup: (comment) => dispatch(PopupRedux.PopupConfirmConfirmation(comment)),
        onCancelConfirmationPopup: () => dispatch(PopupRedux.PopupCancelConfirmation()),
        showPopup: (componentName, isReadOnly, params) => dispatch(PopupRedux.PopupShowScreen(componentName, isReadOnly, params)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam())
    };
}
let AdaptableBlotterWrapper = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);
exports.AdaptableBlotterApp = ({ AdaptableBlotter }) => React.createElement(react_redux_1.Provider, { store: AdaptableBlotter.AdaptableBlotterStore.TheStore },
    React.createElement(AdaptableBlotterWrapper, { Blotter: AdaptableBlotter }));
