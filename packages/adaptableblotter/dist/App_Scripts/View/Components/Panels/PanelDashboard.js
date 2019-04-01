"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const ButtonClose_1 = require("../Buttons/ButtonClose");
const ButtonConfigure_1 = require("../Buttons/ButtonConfigure");
const ButtonMinimise_1 = require("../Buttons/ButtonMinimise");
//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class PanelDashboard extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.DASHBOARD_PANEL;
        let panelStyle = (this.props.useDefaultPanelStyle) ? StyleConstants.DEFAULT_BSSTYLE : StyleConstants.PRIMARY_BSSTYLE;
        let header = React.createElement("span", null,
            React.createElement("span", { style: { verticalAlign: "middle", marginRight: "10px", padding: "0px", fontSize: 'xsmall' } },
                this.props.showMinimiseButton &&
                    React.createElement("span", null,
                        React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, size: "xs", bsStyle: panelStyle, DisplayMode: "Glyph", style: { float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }, onClick: () => this.props.onMinimise() }),
                        ' ',
                        ' '),
                this.props.showGlyphIcon &&
                    React.createElement(react_bootstrap_1.Glyphicon, { style: { fontSize: 'small' }, glyph: this.props.glyphicon }),
                ' ',
                React.createElement("span", { style: { fontSize: 'small' } }, this.props.headerText)),
            ' ',
            " ",
            ' ',
            this.props.showCloseButton &&
                React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, overrideTooltip: "Close " + this.props.headerText, size: 'xs', bsStyle: panelStyle, DisplayMode: "Glyph", style: { float: "right", marginLeft: "0px", marginRight: "0px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }, onClick: () => this.props.onClose() }),
            this.props.showConfigureButton &&
                React.createElement(ButtonConfigure_1.ButtonConfigure, { cssClassName: cssClassName, overrideTooltip: "Configure " + this.props.headerText, size: 'xs', bsStyle: panelStyle, DisplayMode: "Glyph", style: { float: "right", marginLeft: "0px", marginRight: "0px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }, onClick: () => this.props.onConfigure() }));
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { className: "ab_small-padding-panel ab-panel-header-dashboard", header: header, bsStyle: panelStyle, style: this.props.style },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true }, this.props.children)));
    }
}
PanelDashboard.defaultProps = {
    showCloseButton: true,
    showConfigureButton: true,
    showMinimiseButton: false,
    useDefaultPanelStyle: true,
    headerText: "Function",
    glyphicon: "home",
    onClose: null,
    onConfigure: null,
    onMinimise: null,
    showGlyphIcon: true,
    cssClassName: ""
};
exports.PanelDashboard = PanelDashboard;
