import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IPlusMinusRule } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { UIHelper } from '../../UIHelper';



export class PlusMinusExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IPlusMinusRule>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderState(this.props2.Data.Expression)
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = this.props.StepName
}