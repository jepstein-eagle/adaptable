"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
const UIHelper_1 = require("../../UIHelper");
class ConditionalStyleExpressionWizard extends ExpressionBuilderPage_1.ExpressionBuilderPage {
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
}
exports.ConditionalStyleExpressionWizard = ConditionalStyleExpressionWizard;
