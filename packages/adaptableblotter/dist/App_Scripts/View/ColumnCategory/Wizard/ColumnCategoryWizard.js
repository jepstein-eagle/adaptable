"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ColumnCategorySettingsWizard_1 = require("./ColumnCategorySettingsWizard");
const ColumnCategoryColumnsWizard_1 = require("./ColumnCategoryColumnsWizard");
const ColumnCategorySummaryWizard_1 = require("./ColumnCategorySummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class ColumnCategoryWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ColumnCategoryStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Name",
                        Index: 0,
                        Element: React.createElement(ColumnCategorySettingsWizard_1.ColumnCategorySettingsWizard, { ColumnCategorys: this.props.ColumnCategorys })
                    },
                    {
                        StepName: "Columns",
                        Index: 1,
                        Element: React.createElement(ColumnCategoryColumnsWizard_1.ColumnCategoryColumnsWizard, { ColumnCategorys: this.props.ColumnCategorys }),
                    },
                    {
                        StepName: "Summary",
                        Index: 2,
                        Element: React.createElement(ColumnCategorySummaryWizard_1.ColumnCategorySummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ColumnCategoryWizard = ColumnCategoryWizard;
