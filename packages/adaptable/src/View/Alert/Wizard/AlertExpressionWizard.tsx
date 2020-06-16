import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { UIHelper } from '../../UIHelper';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';

export class AlertExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
  constructor(private props2: AdaptableWizardStepProps<AlertDefinition>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(props2.Data.Expression);
  }

  public Data: any;
  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }
}
