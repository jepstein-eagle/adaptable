"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class FilterFormPanel extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL;
        let className = "ab_panel-with-button";
        if (this.props.className) {
            className += " " + this.props.className;
        }
        className += " " + "ab_panel-with-button-reduce-header-padding";
        let header = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
            React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                this.props.IsAlwaysFilter ?
                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                        React.createElement("span", null, "Filter"))
                    :
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Menu", checked: this.props.ContextMenuTab == Enums_1.ContextMenuTab.Menu, onChange: (e) => this.onSelectMenu(e) }, "Menu"),
                            React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Filter", checked: this.props.ContextMenuTab == Enums_1.ContextMenuTab.Filter, onChange: (e) => this.onSelectFilter(e) }, "Filter")),
                React.createElement(react_bootstrap_1.Col, { xs: 2 }, this.props.clearFilterButton && this.props.ContextMenuTab == Enums_1.ContextMenuTab.Filter && React.cloneElement(this.props.clearFilterButton, { style: { float: 'right' } })),
                React.createElement(react_bootstrap_1.Col, { xs: 2 }, this.props.saveButton && this.props.ContextMenuTab == Enums_1.ContextMenuTab.Filter && React.cloneElement(this.props.saveButton, { style: { float: 'right' } })),
                React.createElement(react_bootstrap_1.Col, { xs: 2 }, this.props.closeButton && React.cloneElement(this.props.closeButton, { style: { float: 'right' } }))));
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: header, className: className, style: this.props.style, bsStyle: this.props.bsStyle }, this.props.children));
    }
    onSelectMenu(tab) {
        this.props.ContextMenuChanged(Enums_1.ContextMenuTab.Menu);
    }
    onSelectFilter(tab) {
        this.props.ContextMenuChanged(Enums_1.ContextMenuTab.Filter);
    }
}
exports.FilterFormPanel = FilterFormPanel;
