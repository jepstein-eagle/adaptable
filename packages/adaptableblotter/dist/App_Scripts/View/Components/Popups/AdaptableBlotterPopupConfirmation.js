"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
const react_bootstrap_sweetalert_1 = require("react-bootstrap-sweetalert");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class AdaptableBlotterPopupConfirmation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let title = this.props.ShowCommentBox ? React.createElement("span", null,
            React.createElement(react_bootstrap_sweetalert_1.default.WarningIcon, null),
            this.props.Title) : this.props.Title;
        let msgSplit = this.props.Msg.split("\n");
        return this.props.ShowPopup && React.createElement("div", { className: StyleConstants.POPUP_CONFIRMATION },
            React.createElement(react_bootstrap_sweetalert_1.default, { type: this.props.ShowCommentBox ? "input" : "warning", btnSize: "sm", showCancel: true, confirmBtnBsStyle: "primary", confirmBtnBsSize: "sm", confirmBtnText: this.props.ConfirmText, cancelBtnBsStyle: "default", cancelBtnText: this.props.CancelText, title: title, placeholder: "Please enter a comment to confirm", onConfirm: (inputValue) => this.props.onConfirm(inputValue), onCancel: () => this.props.onCancel() },
                React.createElement("p", null, msgSplit.map(function (item, index) {
                    return (React.createElement("span", { key: index },
                        item,
                        index != msgSplit.length - 1 && React.createElement("br", null)));
                }))));
    }
}
exports.AdaptableBlotterPopupConfirmation = AdaptableBlotterPopupConfirmation;
