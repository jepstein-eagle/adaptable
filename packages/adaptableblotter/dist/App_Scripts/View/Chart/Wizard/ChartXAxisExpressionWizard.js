"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
const UIHelper_1 = require("../../UIHelper");
class ChartXAxisExpressionWizard extends ExpressionBuilderPage_1.ExpressionBuilderPage {
    constructor(props2) {
        super(props2);
        this.props2 = props2;
        this.state = UIHelper_1.UIHelper.getExpressionBuilderStateWithColumn(this.props2.Data.XAxisExpression, this.props2.Data.XAxisColumnId);
    }
    Next() {
        this.props2.Data.XAxisExpression = this.state.Expression;
    }
    canBack() { return true; }
}
exports.ChartXAxisExpressionWizard = ChartXAxisExpressionWizard;
