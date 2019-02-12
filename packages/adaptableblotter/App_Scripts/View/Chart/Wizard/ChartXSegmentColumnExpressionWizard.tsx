import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { UIHelper } from '../../UIHelper';

export class ChartXSegmentColumnExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IChartDefinition>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderStateWithColumn(this.props2.Data.XSegmentExpression, this.props2.Data.XSegmentColumnId)
    }

    public Next(): void {
        this.props2.Data.XSegmentExpression = this.state.Expression
    }
    
    public canBack(): boolean { return true; }
}