import {
  AdaptableWizardStep,
  ExpressionWizardProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IAlertDefinition } from '../../../Utilities/Interface/BlotterObjects/IAlertDefinition';
import { UIHelper } from '../../UIHelper';

export class AlertExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<IAlertDefinition>) {
    super(props2);
    this.state = UIHelper.getExpressionBuilderState(this.props2.Data.Expression);
  }

  public Next(): void {
    this.props2.Data.Expression = this.state.Expression;
  }
}
