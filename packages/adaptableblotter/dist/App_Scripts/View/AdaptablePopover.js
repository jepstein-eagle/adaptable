"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const Enums_1 = require("../Utilities/Enums");
const StyleConstants = require("../Utilities/Constants/StyleConstants");
const ButtonInfo_1 = require("./Components/Buttons/ButtonInfo");
const UIHelper_1 = require("./UIHelper");
class AdaptablePopover extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.INFO_BUTTON;
        let messageType = (this.props.MessageType != null) ? this.props.MessageType : Enums_1.MessageType.Info;
        let triggerAction = (this.props.triggerAction != null) ? this.props.triggerAction : ['click'];
        let useButton = (this.props.useButton != null) ? this.props.useButton : false;
        let popoverMinWidth = (this.props.popoverMinWidth != null) ? this.props.popoverMinWidth.toString() + "px" : "auto";
        let size = (this.props.size) ? this.props.size : 'small';
        const popoverClickRootClose = (React.createElement(react_bootstrap_1.Popover, { style: { margin: "0px", padding: "0px", minWidth: popoverMinWidth }, id: "ab_popover", title: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.headerText) ? this.props.headerText : "" }, this.props.bodyText.map((textOrHTML, index) => React.createElement("span", { key: index }, textOrHTML))));
        return React.createElement("span", { className: cssClassName },
            React.createElement(react_bootstrap_1.OverlayTrigger, { rootClose: true, trigger: triggerAction, placement: 'bottom', overlay: popoverClickRootClose }, useButton ?
                React.createElement(ButtonInfo_1.ButtonInfo, { cssClassName: cssClassName, onClick: () => null, size: size, glyph: UIHelper_1.UIHelper.getGlyphByMessageType(messageType), bsStyle: UIHelper_1.UIHelper.getStyleNameByMessageType(messageType), DisplayMode: "Glyph", tooltipText: this.props.tooltipText, showDefaultStyle: this.props.showDefaultStyle })
                :
                    React.createElement(react_bootstrap_1.Label, { bsSize: "large", bsStyle: UIHelper_1.UIHelper.getStyleNameByMessageType(messageType), className: "ab_medium_padding" },
                        React.createElement(react_bootstrap_1.Glyphicon, { glyph: UIHelper_1.UIHelper.getGlyphByMessageType(messageType) }))));
    }
}
exports.AdaptablePopover = AdaptablePopover;
