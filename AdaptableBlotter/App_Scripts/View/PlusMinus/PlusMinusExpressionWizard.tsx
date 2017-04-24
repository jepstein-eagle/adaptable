import * as React from "react";
import { IColumn, IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage, ExpressionBuilderPageState } from './../ExpressionBuilder/ExpressionBuilderPage'
import { IPlusMinusCondition } from '../../Core/interface/IPlusMinusStrategy';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { DistinctCriteriaPairValue } from '../../Core/Enums'

interface PlusMinusExpressionWizardProps extends AdaptableWizardStepProps<IPlusMinusCondition> {
    ColumnList: Array<IColumn>
    UserFilters: IUserFilter[]
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}

export class PlusMinusExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: PlusMinusExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: ""
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = "Plus/Minus: Create Query"
}