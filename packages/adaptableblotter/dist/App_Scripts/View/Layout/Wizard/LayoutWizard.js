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
        let layouts = this.props.ConfigEntities;
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.LayoutStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Source",
                        Index: 0,
                        Element: React.createElement(LayoutSelectionWizard_1.LayoutSelectionWizard, { Layouts: layouts, GridSorts: this.props.GridSorts })
                    },
                    {
                        StepName: "Columns",
                        Index: 1,
                        Element: React.createElement(LayoutColumnWizard_1.LayoutColumnWizard, null)
                    },
                    {
                        StepName: "Sort",
                        Index: 2,
                        Element: React.createElement(LayoutGridSortWizard_1.LayoutGridSortWizard, null),
                    },
                    {
                        StepName: "Settings",
                        Index: 3,
                        Element: React.createElement(LayoutSettingsWizard_1.LayoutSettingsWizard, { Layouts: layouts }),
                    },
                    {
                        StepName: "Summary",
                        Index: 4,
                        Element: React.createElement(LayoutSummaryWizard_1.LayoutSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }),
            ">");
    }
}
exports.LayoutWizard = LayoutWizard;
