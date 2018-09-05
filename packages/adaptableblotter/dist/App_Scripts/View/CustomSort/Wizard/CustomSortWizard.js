"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const CustomSortColumnWizard_1 = require("./CustomSortColumnWizard");
const CustomSortValuesWizard_1 = require("./CustomSortValuesWizard");
const CustomSortSummaryWizard_1 = require("./CustomSortSummaryWizard");
const StrategyNames = require("../../../Core/Constants/StrategyNames");
class CustomSortWizard extends React.Component {
    render() {
        let stepNames = ["Select Column", "Create Sort Order", "Summary"];
        let customSorts = this.props.ConfigEntities;
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyNames.CustomSortStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(CustomSortColumnWizard_1.CustomSortColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Columns: this.props.Columns.filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId)) }),
                    React.createElement(CustomSortValuesWizard_1.CustomSortValuesWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns, Blotter: this.props.Blotter }),
                    React.createElement(CustomSortSummaryWizard_1.CustomSortSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CustomSortWizard = CustomSortWizard;
