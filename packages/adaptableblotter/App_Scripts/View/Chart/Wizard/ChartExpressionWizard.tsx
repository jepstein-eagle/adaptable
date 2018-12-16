import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import {  IChartDefinition } from '../../../Api/Interface/IAdaptableBlotterObjects';
import { UIHelper } from '../../UIHelper';



export class ChartExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IChartDefinition>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderStateWithColumn(this.props2.Data.XAxisExpression, this.props2.Data.XAxisColumnId)
    }

    public Next(): void {
        this.props2.Data.XAxisExpression = this.state.Expression
    }
    
    public StepName = this.props.StepName
}