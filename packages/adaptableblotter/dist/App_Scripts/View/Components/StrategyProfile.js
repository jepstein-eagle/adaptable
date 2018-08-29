"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const react_bootstrap_1 = require("react-bootstrap");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class StrategyProfile extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.STRATEGY_PROFILE;
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: StrategyGlyphs.getGhyphiconForStrategy(this.props.StrategyId) }),
            ' ',
            StrategyNames.getNameForStrategy(this.props.StrategyId));
    }
}
exports.StrategyProfile = StrategyProfile;
