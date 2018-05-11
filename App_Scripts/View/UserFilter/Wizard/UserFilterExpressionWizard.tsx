import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { DistinctCriteriaPairValue, QueryTab } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IUserFilter } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { UIHelper } from '../../UIHelper';



export class UserFilterExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IUserFilter>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderState(this.props2.Data.Expression)
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    
    public StepName = this.props.StepName
}