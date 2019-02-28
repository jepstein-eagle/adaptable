"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ChartYAxisWizard_1 = require("./ChartYAxisWizard");
const ChartSummaryWizard_1 = require("./ChartSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ChartXAxisWizard_1 = require("./ChartXAxisWizard");
const ChartSettingsWizard_1 = require("./ChartSettingsWizard");
const ChartXAxisExpressionWizard_1 = require("./ChartXAxisExpressionWizard");
const Enums_1 = require("../../../Utilities/Enums");
class ChartWizard extends React.Component {
    render() {
        let chartDefinitions = this.props.ConfigEntities;
        let chartTitles = chartDefinitions.map(s => s.Title);
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Y Axis",
                        Index: 0,
                        Element: React.createElement(ChartYAxisWizard_1.ChartYAxisWizard, null)
                    },
                    {
                        StepName: "X Axis",
                        Index: 1,
                        Element: React.createElement(ChartXAxisWizard_1.ChartXAxisWizard, null)
                    },
                    {
                        StepName: "X Axis",
                        Index: 2,
                        Element: React.createElement(ChartXAxisExpressionWizard_1.ChartXAxisExpressionWizard, { Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ExpressionMode: Enums_1.ExpressionMode.SingleColumn })
                    },
                    {
                        StepName: "Settings",
                        Index: 5,
                        Element: React.createElement(ChartSettingsWizard_1.ChartSettingsWizard, { ChartTitles: chartTitles }),
                    },
                    {
                        StepName: "Summary",
                        Index: 6,
                        Element: React.createElement(ChartSummaryWizard_1.ChartSummaryWizard, null)
                    },
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ChartWizard = ChartWizard;
