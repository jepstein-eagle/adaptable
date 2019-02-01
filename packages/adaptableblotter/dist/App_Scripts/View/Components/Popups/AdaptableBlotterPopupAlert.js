"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const react_bootstrap_1 = require("react-bootstrap");
const PanelWithImage_1 = require("../Panels/PanelWithImage");
const UIHelper_1 = require("../../UIHelper");
class AdaptableBlotterPopupAlert extends React.Component {
    render() {
        let headerContainsMessage = this.props.Header.indexOf(this.props.MessageType) != -1;
        let style = UIHelper_1.UIHelper.getStyleNameByMessageType(this.props.MessageType);
        let header = (headerContainsMessage) ? this.props.Header : this.props.MessageType.toUpperCase();
        let glyph = UIHelper_1.UIHelper.getGlyphByMessageType(this.props.MessageType);
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let cssClassName = StyleConstants.POPUP_ALERT;
        return this.props.ShowPopup &&
            React.createElement("div", { className: StyleConstants.POPUP_ALERT },
                React.createElement(react_bootstrap_1.Modal, { show: this.props.ShowPopup, onHide: this.props.onClose, className: cssClassName, container: modalContainer, bsSize: "small" },
                    React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                        React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                            React.createElement("div", { className: cssClassName },
                                React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: header, bsStyle: style, glyphicon: glyph, bsSize: "small" },
                                    React.createElement("div", null,
                                        headerContainsMessage == false &&
                                            React.createElement("div", { style: { display: "flex", alignItems: "center" } },
                                                React.createElement(react_bootstrap_1.ControlLabel, null, this.props.Header)),
                                        React.createElement("div", { style: { display: "flex", alignItems: "center" } }, this.props.Msg),
                                        React.createElement("div", { style: { marginTop: '20px' } },
                                            React.createElement(react_bootstrap_1.Row, null,
                                                React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                                                React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                    React.createElement(react_bootstrap_1.Button, { bsStyle: style, className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON, onClick: () => this.props.onClose() }, "OK")))))))))));
    }
}
exports.AdaptableBlotterPopupAlert = AdaptableBlotterPopupAlert;
