"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const StyleConstants = require("../Core/Constants/StyleConstants");
const ButtonInfo_1 = require("./Components/Buttons/ButtonInfo");
const UIHelper_1 = require("./UIHelper");
class AdaptablePopover extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.INFO_BUTTON;
        let triggerAction = (this.props.triggerAction != null) ? this.props.triggerAction : ['hover', 'focus'];
        let useButton = (this.props.useButton != null) ? this.props.useButton : false;
        const popoverClickRootClose = (React.createElement(react_bootstrap_1.Popover, { style: { margin: "0px", padding: "0px" }, id: "ab_popover", title: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.headerText) ? this.props.headerText : "" }, this.props.bodyText.map((textOrHTML, index) => React.createElement("span", { key: index }, textOrHTML))));
        return React.createElement("span", { className: cssClassName },
            React.createElement(react_bootstrap_1.OverlayTrigger, { rootClose: true, trigger: triggerAction, placement: 'bottom', overlay: popoverClickRootClose }, useButton ?
                React.createElement(ButtonInfo_1.ButtonInfo, { cssClassName: cssClassName, onClick: () => null, size: "small", glyph: UIHelper_1.UIHelper.getGlyphByMessageType(this.props.MessageType), bsStyle: UIHelper_1.UIHelper.getStyleNameByMessageType(this.props.MessageType), DisplayMode: "Glyph", tooltipText: this.props.tooltipText })
                :
                    React.createElement(react_bootstrap_1.Label, { bsSize: "large", bsStyle: UIHelper_1.UIHelper.getStyleNameByMessageType(this.props.MessageType), className: "ab_medium_padding" },
                        React.createElement(react_bootstrap_1.Glyphicon, { glyph: UIHelper_1.UIHelper.getGlyphByMessageType(this.props.MessageType) }))));
    }
}
exports.AdaptablePopover = AdaptablePopover;
