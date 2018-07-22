import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import { ICellValidationRule } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { UIHelper } from '../../UIHelper';


export class CellValidationExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<ICellValidationRule>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderState(this.props2.Data.OtherExpression)
    }

    public Next(): void {
        this.props2.Data.OtherExpression = this.state.Expression
    }

    public StepName = this.props.StepName
}