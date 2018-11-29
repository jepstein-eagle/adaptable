"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
const react_bootstrap_sweetalert_1 = require("react-bootstrap-sweetalert");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const Enums_1 = require("../../../Utilities/Enums");
class AdaptableBlotterPopupAlert extends React.Component {
    render() {
        let style;
        let isInfo = false;
        let isWarning = false;
        let isError = false;
        switch (this.props.MessageType) {
            case Enums_1.MessageType.Info:
                style = StyleConstants.INFO_BSSTYLE;
                isInfo = true;
                break;
            case Enums_1.MessageType.Warning:
                style = StyleConstants.WARNING_BSSTYLE;
                isWarning = true;
                break;
            case Enums_1.MessageType.Error:
                style = StyleConstants.DANGER_BSSTYLE;
                isError = true;
                break;
        }
        return this.props.ShowPopup && React.createElement("div", { className: StyleConstants.POPUP_ALERT },
            React.createElement(react_bootstrap_sweetalert_1.default, { danger: isError, warning: isWarning, success: isInfo, confirmBtnBsStyle: style, title: this.props.Header, onConfirm: () => this.props.onClose() },
                React.createElement("p", null, this.props.Msg.split("\n").map(function (item, index) {
                    return (React.createElement("span", { key: index },
                        item,
                        React.createElement("br", null)));
                }))));
    }
}
exports.AdaptableBlotterPopupAlert = AdaptableBlotterPopupAlert;
