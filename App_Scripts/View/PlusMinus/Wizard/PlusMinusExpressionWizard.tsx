import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { DistinctCriteriaPairValue, QueryTab } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IPlusMinusRule } from '../../../Core/Api/Interface/AdaptableBlotterObjects';



export class PlusMinusExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IPlusMinusRule>) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: "",
            SelectedTab: QueryTab.ColumnValue
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = this.props.StepName
}