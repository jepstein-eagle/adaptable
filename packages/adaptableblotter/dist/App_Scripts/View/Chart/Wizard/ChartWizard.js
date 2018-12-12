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
class ChartWizard extends React.Component {
    render() {
        let stepNames = ["Settings", "Y Axis", "X Axis", "Segemented", "Summary"];
        let Charts = this.props.ConfigEntities;
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(ChartYAxisWizard_1.ChartYAxisWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], ChartDefinitions: Charts, Columns: this.props.Columns }),
                    React.createElement(ChartXAxisWizard_1.ChartXAxisWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], ChartDefinitions: Charts, Columns: this.props.Columns, Blotter: this.props.Blotter }),
                    React.createElement(ChartAdditionalColumnWizard_1.ChartAdditionalColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], ChartDefinitions: Charts, Columns: this.props.Columns, Blotter: this.props.Blotter }),
                    React.createElement(ChartSettingsWizard_1.ChartSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], ChartDefinitions: Charts }),
                    React.createElement(ChartSummaryWizard_1.ChartSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[4], Columns: this.props.Columns })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ChartWizard = ChartWizard;
