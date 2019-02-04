"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const LayoutSelectionWizard_1 = require("./LayoutSelectionWizard");
const LayoutColumnWizard_1 = require("./LayoutColumnWizard");
const LayoutSettingsWizard_1 = require("./LayoutSettingsWizard");
const LayoutGridSortWizard_1 = require("./LayoutGridSortWizard");
const LayoutSummaryWizard_1 = require("./LayoutSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class LayoutWizard extends React.Component {
    render() {
        let stepNames = ["Source", "Columns", "Sort", "Settings", "Summary"];
        let layouts = this.props.ConfigEntities;
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.LayoutStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(LayoutSelectionWizard_1.LayoutSelectionWizard, { StepName: stepNames[0], Layouts: layouts, GridSorts: this.props.GridSorts }),
                    React.createElement(LayoutColumnWizard_1.LayoutColumnWizard, { StepName: stepNames[1] }),
                    React.createElement(LayoutGridSortWizard_1.LayoutGridSortWizard, { StepName: stepNames[2] }),
                    React.createElement(LayoutSettingsWizard_1.LayoutSettingsWizard, { StepName: stepNames[3], Layouts: layouts }),
                    React.createElement(LayoutSummaryWizard_1.LayoutSummaryWizard, { StepName: stepNames[4] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }),
            ">");
    }
}
exports.LayoutWizard = LayoutWizard;
