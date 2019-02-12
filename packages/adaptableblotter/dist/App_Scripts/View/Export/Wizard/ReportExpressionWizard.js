"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
const Enums_1 = require("../../../Utilities/Enums");
const UIHelper_1 = require("../../UIHelper");
class ReportExpressionWizard extends ExpressionBuilderPage_1.ExpressionBuilderPage {
    constructor(props2) {
        super(props2);
        this.props2 = props2;
        this.state = UIHelper_1.UIHelper.getExpressionBuilderState(this.props2.Data.Expression);
    }
    Next() {
        this.props2.Data.Expression = this.state.Expression;
    }
    Back() {
        //todo
    }
    GetIndexStepDecrement() {
        return (this.props2.Data.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns) ? 1 : 2;
    }
}
exports.ReportExpressionWizard = ReportExpressionWizard;
