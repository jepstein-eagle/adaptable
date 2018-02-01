import * as React from "react";
import { IColumn, IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage, ExpressionBuilderPageState } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { IRange } from '../../../Strategy/Interface/IExportStrategy';
import { Expression } from '../../../Core/Expression';
import { IUserFilter } from '../../../Core/Interface/IExpression'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'

export interface RangeExpressionWizardProps extends AdaptableWizardStepProps<IRange> {
    ColumnList: Array<IColumn>
    UserFilters: IUserFilter[]
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}

export class RangeExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: RangeExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId:  "" // what is this????
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { 
        //todo
    }
    public StepName = "Range: Create Query"
}