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
        let customSorts = this.props.ConfigEntities;
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CustomSortStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(CustomSortColumnWizard_1.CustomSortColumnWizard, { SortedColumns: this.props.Columns.filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId)) }),
                    },
                    {
                        StepName: "Sort Order",
                        Index: 1,
                        Element: React.createElement(CustomSortValuesWizard_1.CustomSortValuesWizard, null),
                    },
                    {
                        StepName: "Summary",
                        Index: 2,
                        Element: React.createElement(CustomSortSummaryWizard_1.CustomSortSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CustomSortWizard = CustomSortWizard;
