/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage,ExpressionBuilderPageState } from './../ExpressionBuilder/ExpressionBuilderPage'
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';


interface AdvancedSearchExpressionWizardProps extends AdaptableWizardStepProps<IAdvancedSearch> {
    ColumnList: Array<IColumn>
    Blotter: IAdaptableBlotter
        SelectedColumnId: string
}

export class AdvancedSearchExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(public props2: AdvancedSearchExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression : props2.Data.Expression,
            SelectedColumnId : props2.SelectedColumnId
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }

    public Back(): void { }
 
    public StepName = "Advanced Search Create Expression"
}