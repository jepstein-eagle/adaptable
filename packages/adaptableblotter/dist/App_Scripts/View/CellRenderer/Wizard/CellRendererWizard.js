"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const CellRendererSelectColumnWizard_1 = require("./CellRendererSelectColumnWizard");
const CellRendererSummaryWizard_1 = require("./CellRendererSummaryWizard");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
const CellRendererSettingsWizard_1 = require("./CellRendererSettingsWizard");
class CellRendererWizard extends React.Component {
    render() {
        let stepNames = ["Select Column", "Settings", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CellRendererStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(CellRendererSelectColumnWizard_1.CellRendererSelectColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Columns: this.props.Columns }),
                    React.createElement(CellRendererSettingsWizard_1.CellRendererSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns, ColorPalette: this.props.ColorPalette }),
                    React.createElement(CellRendererSummaryWizard_1.CellRendererSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CellRendererWizard = CellRendererWizard;
