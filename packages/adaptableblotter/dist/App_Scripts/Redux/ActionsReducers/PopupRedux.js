"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Core/Enums");
exports.POPUP_SHOW_SCREEN = 'POPUP_SHOW_SCREEN';
exports.POPUP_HIDE_SCREEN = 'POPUP_HIDE_SCREEN';
exports.POPUP_SHOW_CHART = 'POPUP_SHOW_CHART';
exports.POPUP_HIDE_CHART = 'POPUP_HIDE_CHART';
exports.POPUP_SHOW_LOADING = 'POPUP_SHOW_LOADING';
exports.POPUP_HIDE_LOADING = 'POPUP_HIDE_LOADING';
exports.POPUP_SHOW_ALERT = 'POPUP_SHOW_ALERT';
exports.POPUP_HIDE_ALERT = 'POPUP_HIDE_ALERT';
exports.POPUP_SHOW_PROMPT = 'POPUP_SHOW_PROMPT';
exports.POPUP_HIDE_PROMPT = 'POPUP_HIDE_PROMPT';
exports.POPUP_CONFIRM_PROMPT = 'POPUP_CONFIRM_PROMPT';
exports.POPUP_SHOW_CONFIRMATION = 'POPUP_SHOW_CONFIRMATION';
exports.POPUP_CONFIRM_CONFIRMATION = 'POPUP_CONFIRM_CONFIRMATION';
exports.POPUP_CANCEL_CONFIRMATION = 'POPUP_CANCEL_CONFIRMATION';
exports.POPUP_CLEAR_PARAM = 'POPUP_CLEAR_PARAM';
exports.PopupShowScreen = (ComponentStrategy, ComponentName, Params) => ({
    type: exports.POPUP_SHOW_SCREEN,
    ComponentStrategy,
    ComponentName,
    Params
});
exports.PopupHideScreen = () => ({
    type: exports.POPUP_HIDE_SCREEN
});
exports.PopupShowAlert = (Alert) => ({
    type: exports.POPUP_SHOW_ALERT,
    Alert
});
exports.PopupHideAlert = () => ({
    type: exports.POPUP_HIDE_ALERT
});
exports.PopupShowChart = () => ({
    type: exports.POPUP_SHOW_CHART,
});
exports.PopupHideChart = () => ({
    type: exports.POPUP_HIDE_CHART
});
exports.PopupShowLoading = () => ({
    type: exports.POPUP_SHOW_LOADING,
});
exports.PopupHideLoading = () => ({
    type: exports.POPUP_HIDE_LOADING
});
exports.PopupShowPrompt = (Prompt) => ({
    type: exports.POPUP_SHOW_PROMPT,
    Prompt
});
exports.PopupHidePrompt = () => ({
    type: exports.POPUP_HIDE_PROMPT
});
exports.PopupConfirmPrompt = (InputText) => ({
    type: exports.POPUP_CONFIRM_PROMPT,
    InputText
});
exports.PopupShowConfirmation = (Confirmation) => ({
    type: exports.POPUP_SHOW_CONFIRMATION,
    Confirmation
});
exports.PopupConfirmConfirmation = (comment) => ({
    type: exports.POPUP_CONFIRM_CONFIRMATION,
    comment
});
exports.PopupCancelConfirmation = () => ({
    type: exports.POPUP_CANCEL_CONFIRMATION
});
exports.PopupClearParam = () => ({
    type: exports.POPUP_CLEAR_PARAM
});
const initialPopupState = {
    ScreenPopup: {
        ShowScreenPopup: false,
        ComponentStrategy: "",
        ComponentName: "",
        Params: null
    },
    ChartPopup: {
        ShowChartPopup: false,
    },
    LoadingPopup: {
        ShowLoadingPopup: false,
    },
    AlertPopup: {
        ShowAlertPopup: false,
        Header: "",
        Msg: "",
        MessageType: Enums_1.MessageType.Info
    },
    ConfirmationPopup: {
        ShowConfirmationPopup: false,
        ConfirmationMsg: "",
        ConfirmationTitle: "",
        ConfirmationText: "",
        CancelText: "",
        CancelAction: null,
        ConfirmAction: null,
        ShowCommentBox: false,
        ConfirmationComment: null
    },
    PromptPopup: {
        ShowPromptPopup: false,
        PromptTitle: "",
        PromptMsg: "",
        ConfirmAction: null
    },
};
exports.ShowPopupReducer = (state = initialPopupState, action) => {
    switch (action.type) {
        case exports.POPUP_SHOW_SCREEN: {
            let actionTypedShowPopup = action;
            let newScreenPopup = { ShowScreenPopup: true, ComponentStrategy: actionTypedShowPopup.ComponentStrategy, ComponentName: actionTypedShowPopup.ComponentName, Params: actionTypedShowPopup.Params };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        case exports.POPUP_HIDE_SCREEN: {
            let newScreenPopup = { ShowScreenPopup: false, ComponentStrategy: "", ComponentName: "", Params: null };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        case exports.POPUP_SHOW_PROMPT: {
            let actionTyped = action;
            let newPromptPopup = {
                ShowPromptPopup: true,
                PromptTitle: actionTyped.Prompt.PromptTitle,
                PromptMsg: actionTyped.Prompt.PromptMsg,
                ConfirmAction: actionTyped.Prompt.ConfirmAction
            };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_HIDE_PROMPT: {
            let newPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: "", ConfirmAction: null };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_CONFIRM_PROMPT: {
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: "", ConfirmAction: null };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_SHOW_CONFIRMATION: {
            let actionTyped = action;
            let newConfirmationPopup = {
                ShowConfirmationPopup: true,
                ConfirmationMsg: actionTyped.Confirmation.ConfirmationMsg,
                ConfirmationTitle: actionTyped.Confirmation.ConfirmationTitle,
                ConfirmationText: actionTyped.Confirmation.ConfirmationText,
                CancelText: actionTyped.Confirmation.CancelText,
                ConfirmAction: actionTyped.Confirmation.ConfirmAction,
                CancelAction: actionTyped.Confirmation.CancelAction,
                ShowCommentBox: actionTyped.Confirmation.ShowCommentBox,
                ConfirmationComment: null
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_CONFIRM_CONFIRMATION: {
            let actionTyped = action;
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup = {
                ShowConfirmationPopup: false,
                ConfirmationMsg: "",
                ConfirmationTitle: "",
                ConfirmationText: "",
                CancelText: "",
                ConfirmAction: null,
                CancelAction: null,
                ShowCommentBox: false,
                ConfirmationComment: actionTyped.comment
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_CANCEL_CONFIRMATION: {
            //we dispatch the Action of CancelAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup = {
                ShowConfirmationPopup: false,
                ConfirmationMsg: "",
                ConfirmationTitle: "",
                ConfirmationText: "",
                CancelText: "",
                ConfirmAction: null,
                CancelAction: null,
                ShowCommentBox: false,
                ConfirmationComment: null
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_SHOW_ALERT: {
            let showAlertAction = action;
            let newAlertPopup = { ShowAlertPopup: true, Header: showAlertAction.Alert.Header, Msg: showAlertAction.Alert.Msg, MessageType: showAlertAction.Alert.MessageType };
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case exports.POPUP_HIDE_ALERT: {
            let newAlertPopup = { ShowAlertPopup: false, Header: "", Msg: "", MessageType: Enums_1.MessageType.Info };
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case exports.POPUP_SHOW_CHART: {
            let newChartPopup = { ShowChartPopup: true };
            return Object.assign({}, state, { ChartPopup: newChartPopup });
        }
        case exports.POPUP_HIDE_CHART: {
            let newChartPopup = { ShowChartPopup: false };
            return Object.assign({}, state, { ChartPopup: newChartPopup });
        }
        case exports.POPUP_SHOW_LOADING: {
            let newLoadingPopup = { ShowLoadingPopup: true };
            return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
        }
        case exports.POPUP_HIDE_LOADING: {
            let newLoadingPopup = { ShowLoadingPopup: false };
            return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
        }
        case exports.POPUP_CLEAR_PARAM: {
            let newScreenPopup = { ShowScreenPopup: state.ScreenPopup.ShowScreenPopup, ComponentStrategy: state.ScreenPopup.ComponentStrategy, ComponentName: state.ScreenPopup.ComponentName, Params: null };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        default:
            return state;
    }
};
