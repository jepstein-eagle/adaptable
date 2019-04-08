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
const ReportScheduleWizard_1 = require("./ReportScheduleWizard");
class ReportWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ExportStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(ReportColumnTypeWizard_1.ReportColumnTypeWizard, null)
                    },
                    {
                        StepName: "Column",
                        Index: 1,
                        Element: React.createElement(ReportColumnChooserWizard_1.ReportColumnChooserWizard, null)
                    },
                    {
                        StepName: "Rows",
                        Index: 2,
                        Element: React.createElement(ReportRowTypeWizard_1.ReportRowTypeWizard, null),
                    },
                    {
                        StepName: "Rows",
                        Index: 3,
                        Element: React.createElement(ReportExpressionWizard_1.ReportExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    },
                    {
                        StepName: "Schedule",
                        Index: 4,
                        Element: React.createElement(ReportScheduleWizard_1.ReportScheduleWizard, null)
                    },
                    {
                        StepName: "Settings",
                        Index: 5,
                        Element: React.createElement(ReportSettingsWizard_1.ReportSettingsWizard, { Reports: this.props.ConfigEntities }),
                    },
                    {
                        StepName: "Summary",
                        Index: 6,
                        Element: React.createElement(ReportSummaryWizard_1.ReportSummaryWizard, { UserFilters: this.props.UserFilters })
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ReportWizard = ReportWizard;
