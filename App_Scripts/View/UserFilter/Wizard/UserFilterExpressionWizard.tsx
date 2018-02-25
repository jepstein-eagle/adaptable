import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';



export class UserFilterExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IUserFilter>) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: props2.Data.ColumnId
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    
    public StepName = this.props.StepName
}