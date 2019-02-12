"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const PlusMinusColumnWizard_1 = require("./PlusMinusColumnWizard");
const PlusMinusSettingsWizard_1 = require("./PlusMinusSettingsWizard");
const PlusMinusExpressionWizard_1 = require("./PlusMinusExpressionWizard");
const PlusMinusSummaryWizard_1 = require("./PlusMinusSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const Enums_1 = require("../../../Utilities/Enums");
class PlusMinusWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.PlusMinusStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(PlusMinusColumnWizard_1.PlusMinusColumnWizard, { NumericColumns: this.props.Columns.filter(x => x.DataType == Enums_1.DataType.Number) }),
                    },
                    {
                        StepName: "Settings",
                        Index: 1,
                        Element: React.createElement(PlusMinusSettingsWizard_1.PlusMinusSettingsWizard, null),
                    },
                    {
                        StepName: "Query",
                        Index: 2,
                        Element: React.createElement(PlusMinusExpressionWizard_1.PlusMinusExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    },
                    {
                        StepName: "Summary",
                        Index: 3,
                        Element: React.createElement(PlusMinusSummaryWizard_1.PlusMinusSummaryWizard, { UserFilters: this.props.UserFilters })
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.PlusMinusWizard = PlusMinusWizard;
