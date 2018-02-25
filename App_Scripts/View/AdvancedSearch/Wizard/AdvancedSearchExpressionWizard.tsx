import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { IAdvancedSearch } from '../../../Strategy/Interface/IAdvancedSearchStrategy';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';

export class AdvancedSearchExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(public props2: ExpressionWizardProps<IAdvancedSearch>) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: props2.SelectedColumnId
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }

    public Back(): void {
        // todo
     }

     public StepName = this.props.StepName
}