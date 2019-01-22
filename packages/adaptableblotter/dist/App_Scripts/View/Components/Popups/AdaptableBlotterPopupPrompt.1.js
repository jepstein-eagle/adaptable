"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
const react_bootstrap_sweetalert_1 = require("react-bootstrap-sweetalert");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class AdaptableBlotterPopupPromptOld extends React.Component {
    render() {
        return this.props.ShowPopup && React.createElement("div", { className: StyleConstants.POPUP_PROMPT },
            React.createElement(react_bootstrap_sweetalert_1.default, { input: true, showCancel: true, placeholder: this.props.Msg, confirmBtnBsStyle: "primary", cancelBtnBsStyle: "default", title: this.props.Title, onConfirm: (inputValue) => this.props.onConfirm(inputValue), onCancel: () => this.props.onClose() }));
    }
}
exports.AdaptableBlotterPopupPromptOld = AdaptableBlotterPopupPromptOld;
