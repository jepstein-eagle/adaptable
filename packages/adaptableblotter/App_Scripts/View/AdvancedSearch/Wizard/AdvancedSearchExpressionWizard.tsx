import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import { IUserFilter } from '../../../Core/Api/Interface/IAdaptableBlotterObjects';
import { IAdvancedSearch } from '../../../Core/Api/Interface/IAdaptableBlotterObjects';
import { Expression } from '../../../Core/Api/Expression';
import { UIHelper } from "../../UIHelper";


export class AdvancedSearchExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(public props2: ExpressionWizardProps<IAdvancedSearch>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderState(this.props2.Data.Expression)
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }

    public Back(): void {
        // todo
    }

    public StepName = this.props.StepName
}