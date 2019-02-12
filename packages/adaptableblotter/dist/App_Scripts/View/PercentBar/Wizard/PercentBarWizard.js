"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const PercentBarSelectColumnWizard_1 = require("././PercentBarSelectColumnWizard");
const PercentBarSummaryWizard_1 = require("././PercentBarSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const PercentBarSettingsWizard_1 = require("./PercentBarSettingsWizard");
const PercentBarValuesWizard_1 = require("./PercentBarValuesWizard");
class PercentBarWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.PercentBarStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(PercentBarSelectColumnWizard_1.PercentBarSelectColumnWizard, null)
                    },
                    {
                        StepName: "Values",
                        Index: 1,
                        Element: React.createElement(PercentBarValuesWizard_1.PercentBarValuesWizard, null),
                    },
                    {
                        StepName: "Settings",
                        Index: 2,
                        Element: React.createElement(PercentBarSettingsWizard_1.PercentBarSettingsWizard, { ColorPalette: this.props.ColorPalette }),
                    },
                    {
                        StepName: "Summary",
                        Index: 3,
                        Element: React.createElement(PercentBarSummaryWizard_1.PercentBarSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.PercentBarWizard = PercentBarWizard;
