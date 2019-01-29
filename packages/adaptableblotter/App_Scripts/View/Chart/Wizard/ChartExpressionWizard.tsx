import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { UIHelper } from '../../UIHelper';



export class ChartExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IChartDefinition>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderStateWithColumn(this.props2.Data.XAxisExpression, this.props2.Data.XAxisColumnId)
    }

    public Next(): void {
        this.props2.Data.XAxisExpression = this.state.Expression
    }
    
    public canBack(): boolean { return true; }
    
    public StepName = this.props.StepName
}