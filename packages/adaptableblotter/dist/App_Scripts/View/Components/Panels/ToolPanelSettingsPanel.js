"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class ToolPanelSettingsPanel extends React.Component {
    render() {
        let header = React.createElement("span", { style: { verticalAlign: "middle" } },
            ' ',
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: 'wrench' }),
            ' ',
            ' ',
            React.createElement("span", null, "Settings"),
            this.props.button && React.cloneElement(this.props.button, { style: { float: 'right', border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' } }));
        return React.createElement(react_bootstrap_1.Panel, { className: "ab_small-padding-panel ab-panel-header-toolbar-settings", header: header, style: { margin: '0px', padding: '0px' }, bsStyle: this.props.bsStyle, bsSize: 'xsmall' }, this.props.children);
    }
}
exports.ToolPanelSettingsPanel = ToolPanelSettingsPanel;
