import { ExpressionBuilderPage } from '@adaptabletools/adaptable/src/View/ExpressionBuilder/ExpressionBuilderPage';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { ExpressionHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';

export class SparklinesChartExpressionColumnWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: AdaptableWizardStepProps<SparklinesChartDefinition>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(
      props2.Data.Expression || ExpressionHelper.CreateEmptyExpression()
    );
  }

  public Data: any;

  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }

  public canBack(): boolean {
    return true;
  }
}
