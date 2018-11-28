"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const Enums_1 = require("../../Core/Enums");
class StyleVisualItem extends React.Component {
    render() {
        let styleVisualisation;
        if (this.props.Style.ClassName) {
            styleVisualisation = React.createElement("div", null, "CSS Class: " + this.props.Style.ClassName);
        }
        else {
            let backColorForStyle = this.props.Style.BackColor != undefined ? this.props.Style.BackColor : null;
            let foreColorForStyle = this.props.Style.ForeColor != undefined ? this.props.Style.ForeColor : "black";
            let fontWeightForStyle = this.props.Style.FontWeight == Enums_1.FontWeight.Bold ? "bold" : "normal";
            let fontStyleForStyle = this.props.Style.FontStyle == Enums_1.FontStyle.Italic ? "italic" : "normal";
            let fontSizeForStyle = EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(this.props.Style.FontSize);
            styleVisualisation = React.createElement("div", { className: this.props.Style.BackColor != undefined ? "" : "ab_white_grey_stripes", style: {
                    textAlign: 'center',
                    margin: '2px',
                    padding: '3px',
                    background: backColorForStyle,
                    color: foreColorForStyle,
                    fontWeight: fontWeightForStyle,
                    fontStyle: fontStyleForStyle,
                    fontSize: fontSizeForStyle
                } }, "Style");
        }
        return styleVisualisation;
    }
}
exports.StyleVisualItem = StyleVisualItem;
