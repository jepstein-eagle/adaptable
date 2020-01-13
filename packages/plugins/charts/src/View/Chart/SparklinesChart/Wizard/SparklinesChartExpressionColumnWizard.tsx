import { ExpressionBuilderPage } from '@adaptabletools/adaptable/src/View/ExpressionBuilder/ExpressionBuilderPage';
import {
  AdaptableWizardStep,
  ExpressionWizardProps,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';

export class SparklinesChartExpressionColumnWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<SparklinesChartDefinition>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(props2.Data.Expression);
  }

  public Data: any;

  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }

  public canBack(): boolean {
    return true;
  }
}
