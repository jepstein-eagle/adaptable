"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const UIHelper_1 = require("../../UIHelper");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
class AdaptableBlotterLoadingScreen extends React.Component {
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        return (React.createElement(react_bootstrap_1.Modal, { show: this.props.showLoadingScreen, onHide: this.props.onClose, className: cssClassName + StyleConstants.BASE, container: modalContainer },
            React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                React.createElement(react_bootstrap_1.Modal.Title, null, "\u00A0\u00A0\u00A0Initialising Grid"),
                React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                    React.createElement("div", { className: "ab_loading_screen" },
                        React.createElement("span", null, "Retrieving your settings and setting up the grid..."),
                        React.createElement("br", null),
                        React.createElement("br", null))))));
    }
}
exports.AdaptableBlotterLoadingScreen = AdaptableBlotterLoadingScreen;
