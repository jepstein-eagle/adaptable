"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ChartYAxisWizard_1 = require("./ChartYAxisWizard");
const ChartSummaryWizard_1 = require("./ChartSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ChartXAxisWizard_1 = require("./ChartXAxisWizard");
const ChartSettingsWizard_1 = require("./ChartSettingsWizard");
const ChartAdditionalColumnWizard_1 = require("./ChartAdditionalColumnWizard");
const ChartExpressionWizard_1 = require("./ChartExpressionWizard");
const Enums_1 = require("../../../Utilities/Enums");
class ChartWizard extends React.Component {
    render() {
        //  console.log("in wziard0")
        //   console.log(this.props.EditedAdaptableBlotterObject)
        let stepNames = ["Y Axis", "X Axis", "X Segment", "Settings", "Summary"];
        let chartDefinitions = this.props.ConfigEntities;
        let chartTitles = chartDefinitions.map(s => s.Title);
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(ChartYAxisWizard_1.ChartYAxisWizard, { StepName: stepNames[0] }),
                    React.createElement(ChartXAxisWizard_1.ChartXAxisWizard, { StepName: stepNames[1] }),
                    React.createElement(ChartExpressionWizard_1.ChartExpressionWizard, { StepName: stepNames[1], Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ExpressionMode: Enums_1.ExpressionMode.SingleColumn }),
                    React.createElement(ChartAdditionalColumnWizard_1.ChartAdditionalColumnWizard, { StepName: stepNames[2] }),
                    React.createElement(ChartSettingsWizard_1.ChartSettingsWizard, { StepName: stepNames[3], ChartTitles: chartTitles }),
                    React.createElement(ChartSummaryWizard_1.ChartSummaryWizard, { StepName: stepNames[4] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ChartWizard = ChartWizard;
