"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const UIHelper_1 = require("../../UIHelper");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const PanelWithImage_1 = require("../Panels/PanelWithImage");
class AdaptableBlotterPopupConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = (e) => {
            this.setState({ PromptText: e.target.value });
        };
        this.state = { PromptText: "" };
    }
    render() {
        let style = UIHelper_1.UIHelper.getStyleNameByMessageType(this.props.MessageType);
        let header = this.props.Header;
        let glyph = UIHelper_1.UIHelper.getGlyphByMessageType(this.props.MessageType);
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let cssClassName = StyleConstants.POPUP_PROMPT;
        return this.props.ShowPopup && React.createElement("div", { className: StyleConstants.POPUP_PROMPT },
            React.createElement(react_bootstrap_1.Modal, { show: this.props.ShowPopup, onHide: this.props.onCancel, className: cssClassName, container: modalContainer, bsSize: "small" },
                React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                    React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                        React.createElement("div", { className: cssClassName },
                            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: header, bsStyle: style, glyphicon: glyph, bsSize: "small" },
                                React.createElement("div", null,
                                    React.createElement("div", { style: { display: "flex", alignItems: "center" } }, this.props.Msg.split("\n").map(function (item, index) {
                                        return (React.createElement(react_bootstrap_1.ControlLabel, { key: index },
                                            item,
                                            React.createElement("br", null)));
                                    })),
                                    this.props.ShowCommentBox &&
                                        React.createElement("div", { style: { marginTop: '20px' } },
                                            React.createElement("span", null, "Please enter a comment to confirm"),
                                            React.createElement("br", null),
                                            React.createElement(react_bootstrap_1.FormControl, { style: { marginTop: '20px' }, value: this.state.PromptText, type: "string", placeholder: "Enter text", onChange: (e) => this.changeContent(e) })),
                                    React.createElement("div", { style: { marginTop: '20px' } },
                                        React.createElement(react_bootstrap_1.Row, null,
                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                React.createElement(react_bootstrap_1.Button, { bsStyle: StyleConstants.PRIMARY_BSSTYLE, className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CONFIRM_BUTTON, disabled: !this.canConfirm(), onClick: () => this.onConfirmmForm() }, this.props.ConfirmButtonText)),
                                            React.createElement(react_bootstrap_1.Col, { xs: 2 }),
                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                React.createElement(react_bootstrap_1.Button, { bsStyle: StyleConstants.DEFAULT_BSSTYLE, className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CANCEL_BUTTON, onClick: () => this.onCancelForm() }, this.props.CancelButtonText)))))))))));
    }
    onCancelForm() {
        this.setState({ PromptText: "" });
        this.props.onCancel();
    }
    onConfirmmForm() {
        let promptText = this.state.PromptText;
        this.setState({ PromptText: "" });
        this.props.onConfirm(promptText);
    }
    canConfirm() {
        if (this.props.ShowCommentBox) {
            return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PromptText);
        }
        return true;
    }
}
exports.AdaptableBlotterPopupConfirmation = AdaptableBlotterPopupConfirmation;
