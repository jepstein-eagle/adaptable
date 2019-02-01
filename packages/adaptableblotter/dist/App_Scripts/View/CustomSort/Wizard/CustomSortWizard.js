"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const CustomSortColumnWizard_1 = require("./CustomSortColumnWizard");
const CustomSortValuesWizard_1 = require("./CustomSortValuesWizard");
const CustomSortSummaryWizard_1 = require("./CustomSortSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class CustomSortWizard extends React.Component {
    render() {
        let stepNames = ["Column", "Sort Order", "Summary"];
        let customSorts = this.props.ConfigEntities;
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CustomSortStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(CustomSortColumnWizard_1.CustomSortColumnWizard, { StepName: stepNames[0], SortedColumns: this.props.Columns.filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId)) }),
                    React.createElement(CustomSortValuesWizard_1.CustomSortValuesWizard, { StepName: stepNames[1] }),
                    React.createElement(CustomSortSummaryWizard_1.CustomSortSummaryWizard, { StepName: stepNames[2] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CustomSortWizard = CustomSortWizard;
