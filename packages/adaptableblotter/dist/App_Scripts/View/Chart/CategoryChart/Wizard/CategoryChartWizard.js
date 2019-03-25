"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../../../Utilities/Constants/StrategyConstants");
const AdaptableWizard_1 = require("../../../Wizard/AdaptableWizard");
const CategoryChartYAxisWizard_1 = require("./CategoryChartYAxisWizard");
const CategoryChartXAxisWizard_1 = require("./CategoryChartXAxisWizard");
const CategoryChartXAxisExpressionWizard_1 = require("./CategoryChartXAxisExpressionWizard");
const Enums_1 = require("../../../../Utilities/Enums");
const CategoryChartSummaryWizard_1 = require("./CategoryChartSummaryWizard");
const CategoryChartSettingsWizard_1 = require("./CategoryChartSettingsWizard");
class CategoryChartWizard extends React.Component {
    render() {
        let chartDefinitions = this.props.ConfigEntities;
        let chartNames = chartDefinitions.map(s => s.Name);
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Y Axis",
                        Index: 0,
                        Element: React.createElement(CategoryChartYAxisWizard_1.CategoryChartYAxisWizard, null)
                    },
                    {
                        StepName: "X Axis",
                        Index: 1,
                        Element: React.createElement(CategoryChartXAxisWizard_1.CategoryChartXAxisWizard, null)
                    },
                    {
                        StepName: "X Axis",
                        Index: 2,
                        Element: React.createElement(CategoryChartXAxisExpressionWizard_1.CategoryChartXAxisExpressionWizard, { Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ExpressionMode: Enums_1.ExpressionMode.SingleColumn })
                    },
                    {
                        StepName: "Settings",
                        Index: 5,
                        Element: React.createElement(CategoryChartSettingsWizard_1.CategoryChartSettingsWizard, { ChartNames: chartNames }),
                    },
                    {
                        StepName: "Summary",
                        Index: 6,
                        Element: React.createElement(CategoryChartSummaryWizard_1.CategoryChartSummaryWizard, null)
                    },
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CategoryChartWizard = CategoryChartWizard;
