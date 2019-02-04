"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ReportColumnChooserWizard_1 = require("./ReportColumnChooserWizard");
const ReportColumnTypeWizard_1 = require("./ReportColumnTypeWizard");
const ReportExpressionWizard_1 = require("./ReportExpressionWizard");
const ReportSettingsWizard_1 = require("./ReportSettingsWizard");
const ReportSummaryWizard_1 = require("./ReportSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ReportRowTypeWizard_1 = require("./ReportRowTypeWizard");
class ReportWizard extends React.Component {
    render() {
        let stepNames = ["Columns", "Rows", "Settings", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ExportStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(ReportColumnTypeWizard_1.ReportColumnTypeWizard, { StepName: stepNames[0] }),
                    React.createElement(ReportColumnChooserWizard_1.ReportColumnChooserWizard, { StepName: stepNames[0] }),
                    React.createElement(ReportRowTypeWizard_1.ReportRowTypeWizard, { StepName: stepNames[1] }),
                    React.createElement(ReportExpressionWizard_1.ReportExpressionWizard, { StepName: stepNames[1], UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    React.createElement(ReportSettingsWizard_1.ReportSettingsWizard, { StepName: stepNames[2], Reports: this.props.ConfigEntities }),
                    React.createElement(ReportSummaryWizard_1.ReportSummaryWizard, { StepName: stepNames[3], UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ReportWizard = ReportWizard;
