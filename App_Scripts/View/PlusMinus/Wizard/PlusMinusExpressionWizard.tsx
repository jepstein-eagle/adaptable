import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { IPlusMinusCondition } from '../../../Strategy/Interface/IPlusMinusStrategy';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';



export class PlusMinusExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IPlusMinusCondition>) {
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
    public StepName = this.props.StepName
}