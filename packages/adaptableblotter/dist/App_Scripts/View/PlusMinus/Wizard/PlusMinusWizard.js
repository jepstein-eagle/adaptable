"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const PlusMinusColumnWizard_1 = require("./PlusMinusColumnWizard");
const PlusMinusSettingsWizard_1 = require("./PlusMinusSettingsWizard");
const PlusMinusExpressionWizard_1 = require("./PlusMinusExpressionWizard");
const PlusMinusSummaryWizard_1 = require("./PlusMinusSummaryWizard");
const StrategyNames = require("../../../Core/Constants/StrategyNames");
const Enums_1 = require("../../../Core/Enums");
class PlusMinusWizard extends React.Component {
    render() {
        let stepNames = ["Select Column", "Settings", "Build Query", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyNames.PlusMinusStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [React.createElement(PlusMinusColumnWizard_1.PlusMinusColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Columns: this.props.Columns.filter(x => x.DataType == Enums_1.DataType.Number) }),
                    React.createElement(PlusMinusSettingsWizard_1.PlusMinusSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1] }),
                    React.createElement(PlusMinusExpressionWizard_1.PlusMinusExpressionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, getColumnValueDisplayValuePairDistinctList: this.props.getColumnValueDisplayValuePairDistinctList, BlotterOptions: this.props.BlotterOptions, BlotterApi: this.props.BlotterApi }),
                    React.createElement(PlusMinusSummaryWizard_1.PlusMinusSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], Columns: this.props.Columns, UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.PlusMinusWizard = PlusMinusWizard;
