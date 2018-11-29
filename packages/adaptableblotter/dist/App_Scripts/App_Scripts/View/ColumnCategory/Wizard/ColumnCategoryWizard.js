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
        let stepNames = ["Name", "Columns", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ColumnCategoryStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(ColumnCategorySettingsWizard_1.ColumnCategorySettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], ColumnCategorys: this.props.ColumnCategorys }),
                    React.createElement(ColumnCategoryColumnsWizard_1.ColumnCategoryColumnsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], ColumnCategorys: this.props.ColumnCategorys, Columns: this.props.Columns }),
                    React.createElement(ColumnCategorySummaryWizard_1.ColumnCategorySummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ColumnCategoryWizard = ColumnCategoryWizard;
