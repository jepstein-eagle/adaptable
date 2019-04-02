"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class EntityRowItem extends React.Component {
    render() {
        return React.createElement("span", { style: { fontSize: 'small' } },
            " ",
            this.props.Content);
    }
}
exports.EntityRowItem = EntityRowItem;
