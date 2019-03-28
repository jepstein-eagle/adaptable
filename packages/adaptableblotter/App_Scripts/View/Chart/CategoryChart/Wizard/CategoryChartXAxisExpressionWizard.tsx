import { ExpressionBuilderPage } from "../../../ExpressionBuilder/ExpressionBuilderPage";
import { AdaptableWizardStep, ExpressionWizardProps } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { UIHelper } from "../../../UIHelper";

export class CategoryChartXAxisExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<ICategoryChartDefinition>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderStateWithColumn(this.props2.Data.XAxisExpression, this.props2.Data.XAxisColumnId)
    }

    public Next(): void {
        this.props2.Data.XAxisExpression = this.state.Expression
    }
    
    public canBack(): boolean { return true; }
    
}