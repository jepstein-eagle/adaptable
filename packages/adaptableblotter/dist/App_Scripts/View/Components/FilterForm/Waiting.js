"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const react_bootstrap_1 = require("react-bootstrap");
class Waiting extends React.Component {
    render() {
        return React.createElement("div", null,
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                React.createElement(react_bootstrap_1.Col, { xs: 6 },
                    React.createElement("h1", null,
                        React.createElement(react_bootstrap_1.Glyphicon, { glyph: "refresh" }))),
                React.createElement(react_bootstrap_1.Col, { xs: 2 })),
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                React.createElement(react_bootstrap_1.Col, { xs: 11 },
                    React.createElement("h5", null,
                        ' ',
                        " ",
                        this.props.WaitingMessage))));
    }
}
exports.Waiting = Waiting;
