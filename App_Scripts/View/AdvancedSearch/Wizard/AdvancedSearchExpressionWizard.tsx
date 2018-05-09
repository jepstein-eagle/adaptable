import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { IUserFilter } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { DistinctCriteriaPairValue, QueryTab } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdvancedSearch } from '../../../Core/Api/Interface/AdaptableBlotterObjects';

export class AdvancedSearchExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(public props2: ExpressionWizardProps<IAdvancedSearch>) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: props2.SelectedColumnId,
            SelectedTab: QueryTab.ColumnValue
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