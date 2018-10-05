import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import { IUserFilter } from '../../../Core/Api/Interface/IAdaptableBlotterObjects';
import { UIHelper } from '../../UIHelper';



export class UserFilterExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IUserFilter>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderStateWithColumn(this.props2.Data.Expression, this.props2.Data.ColumnId)
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    
    public StepName = this.props.StepName
}