"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
class ListBoxMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let menuItems = this.props.ContextMenuItems.map((menuItem) => {
            return React.createElement(react_bootstrap_1.ListGroupItem, { key: menuItem.Label, onClick: () => this.onClick(menuItem) },
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: menuItem.GlyphIcon }),
                " ",
                menuItem.Label);
        });
        return React.createElement("div", { style: divStyle },
            React.createElement(react_bootstrap_1.ListGroup, null, menuItems));
    }
    onClick(menuItem) {
        this.props.onContextMenuItemClick(menuItem.Action);
    }
}
exports.ListBoxMenu = ListBoxMenu;
let divStyle = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '450px',
    'marginBottom': '0'
};
