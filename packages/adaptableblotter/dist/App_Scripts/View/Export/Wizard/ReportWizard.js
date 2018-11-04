"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ReportColumnChooserWizard_1 = require("./ReportColumnChooserWizard");
const ReportColumnTypeWizard_1 = require("./ReportColumnTypeWizard");
const ReportExpressionWizard_1 = require("./ReportExpressionWizard");
const ReportSettingsWizard_1 = require("./ReportSettingsWizard");
const ReportSummaryWizard_1 = require("./ReportSummaryWizard");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
class ReportWizard extends React.Component {
    render() {
        let stepNames = ["Type", "Columns", "Build Query", "Choose Name", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ExportStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(ReportColumnTypeWizard_1.ReportColumnTypeWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0] }),
                    React.createElement(ReportColumnChooserWizard_1.ReportColumnChooserWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns }),
                    React.createElement(ReportExpressionWizard_1.ReportExpressionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter }),
                    React.createElement(ReportSettingsWizard_1.ReportSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], Reports: this.props.ConfigEntities }),
                    React.createElement(ReportSummaryWizard_1.ReportSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[4], Columns: this.props.Columns, UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ReportWizard = ReportWizard;
