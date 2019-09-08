import { ExpressionBuilderPage } from '../../../ExpressionBuilder/ExpressionBuilderPage';
import {
  AdaptableWizardStep,
  ExpressionWizardProps,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '../../../../PredefinedConfig/RunTimeState/ChartState';
import { UIHelper } from '../../../UIHelper';

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
