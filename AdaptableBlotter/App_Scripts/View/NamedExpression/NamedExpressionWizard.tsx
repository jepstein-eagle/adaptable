/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage, ExpressionBuilderPageState } from './../ExpressionBuilder/ExpressionBuilderPage'
import { INamedExpression } from '../../Core/Interface/IExpression';


interface NamedExpressionWizardProps extends AdaptableWizardStepProps<INamedExpression> {
    ColumnList: Array<IColumn>
    Blotter: IAdaptableBlotter
    SelectedColumnId: string
}

export class NamedExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: NamedExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: props2.SelectedColumnId
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = "Filter Create Expression"
}