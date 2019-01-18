"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const ButtonNew_1 = require("../Buttons/ButtonNew");
const SummaryRowItem_1 = require("./SummaryRowItem");
const StrategyProfile_1 = require("../StrategyProfile");
class StrategyHeader extends React.Component {
    render() {
        let summaryItems = [];
        let newButton = this.props.NewButtonDisabled ?
            null :
            React.createElement(ButtonNew_1.ButtonNew, { cssClassName: this.props.cssClassName, size: "xsmall", onClick: () => this.props.onNew(), overrideTooltip: "Create " + this.props.NewButtonTooltip, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel });
        summaryItems.push(React.createElement("b", null, React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: this.props.StrategyId })));
        summaryItems.push(this.props.StrategySummary);
        summaryItems.push(newButton);
        return React.createElement(SummaryRowItem_1.SummaryRowItem, { cssClassName: this.props.cssClassName, SummaryItems: summaryItems });
    }
}
exports.StrategyHeader = StrategyHeader;
