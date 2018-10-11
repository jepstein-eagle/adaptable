"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const LayoutSelectionWizard_1 = require("./LayoutSelectionWizard");
const LayoutColumnWizard_1 = require("./LayoutColumnWizard");
const LayoutSettingsWizard_1 = require("./LayoutSettingsWizard");
const LayoutGridSortWizard_1 = require("./LayoutGridSortWizard");
const LayoutSummaryWizard_1 = require("./LayoutSummaryWizard");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
class LayoutWizard extends React.Component {
    render() {
        let stepNames = ["Source", "Columns", "Sort", "Settings", "Summary"];
        let layouts = this.props.ConfigEntities;
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.LayoutStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(LayoutSelectionWizard_1.LayoutSelectionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Layouts: layouts, Columns: this.props.Columns, GridSorts: this.props.GridSorts }),
                    React.createElement(LayoutColumnWizard_1.LayoutColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns }),
                    React.createElement(LayoutGridSortWizard_1.LayoutGridSortWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns }),
                    React.createElement(LayoutSettingsWizard_1.LayoutSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], Layouts: layouts }),
                    React.createElement(LayoutSummaryWizard_1.LayoutSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[4], Columns: this.props.Columns })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }),
            ">");
    }
}
exports.LayoutWizard = LayoutWizard;
