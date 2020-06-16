import { ExpressionBuilderPage } from '@adaptabletools/adaptable/src/View/ExpressionBuilder/ExpressionBuilderPage';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';

export class CategoryChartXAxisExpressionWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: AdaptableWizardStepProps<CategoryChartDefinition>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderStateWithColumn(
      props2.Data.XAxisExpression,
      props2.Data.XAxisColumnId
    );
  }

  public Data: any;

  public Next(): void {
    this.Data.XAxisExpression = this.state.Expression;
  }

  public canBack(): boolean {
    return true;
  }
}
