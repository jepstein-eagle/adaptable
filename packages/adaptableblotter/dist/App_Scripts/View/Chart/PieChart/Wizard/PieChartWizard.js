"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../../../Utilities/Constants/StrategyConstants");
const AdaptableWizard_1 = require("../../../Wizard/AdaptableWizard");
const PieChartSettingsWizard_1 = require("./PieChartSettingsWizard");
const PieChartSummaryWizard_1 = require("./PieChartSummaryWizard");
const PieChartPrimaryColumnWizard_1 = require("./PieChartPrimaryColumnWizard");
const PieChartSecondaryColumnWizard_1 = require("./PieChartSecondaryColumnWizard");
class PieChartWizard extends React.Component {
    render() {
        let chartDefinitions = this.props.ConfigEntities;
        let chartNames = chartDefinitions.map(s => s.Name);
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Primary",
                        Index: 0,
                        Element: React.createElement(PieChartPrimaryColumnWizard_1.PieChartPrimaryColumnWizard, null),
                    },
                    {
                        StepName: "Secondary",
                        Index: 1,
                        Element: React.createElement(PieChartSecondaryColumnWizard_1.PieChartSecondaryColumnWizard, null),
                    },
                    {
                        StepName: "Settings",
                        Index: 2,
                        Element: React.createElement(PieChartSettingsWizard_1.PieChartSettingsWizard, { ChartNames: chartNames }),
                    },
                    {
                        StepName: "Summary",
                        Index: 3,
                        Element: React.createElement(PieChartSummaryWizard_1.PieChartSummaryWizard, null)
                    },
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.PieChartWizard = PieChartWizard;
