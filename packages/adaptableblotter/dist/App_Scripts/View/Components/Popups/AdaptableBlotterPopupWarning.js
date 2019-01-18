"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//we use that syntax to import the default export from the module.... Took me a while to find the syntax
const react_bootstrap_sweetalert_1 = require("react-bootstrap-sweetalert");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class AdaptableBlotterPopupWarning extends React.Component {
    render() {
        return this.props.ShowPopup && React.createElement("div", { className: StyleConstants.POPUP_ALERT },
            React.createElement(react_bootstrap_sweetalert_1.default, { warning: true, confirmBtnBsStyle: StyleConstants.WARNING_BSSTYLE, title: this.props.Header, bsSize: "small", btnSize: "sm", onConfirm: () => this.props.onClose() },
                React.createElement("p", null, this.props.Msg.split("\n").map(function (item, index) {
                    return (React.createElement("span", { key: index },
                        item,
                        React.createElement("br", null)));
                }))));
    }
}
exports.AdaptableBlotterPopupWarning = AdaptableBlotterPopupWarning;
