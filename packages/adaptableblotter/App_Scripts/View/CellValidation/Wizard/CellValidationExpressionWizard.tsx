import {
  AdaptableWizardStep,
  ExpressionWizardProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { CellValidationRule } from '../../../PredefinedConfig/RunTimeState/CellValidationState';
import { UIHelper } from '../../UIHelper';

export class CellValidationExpressionWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<CellValidationRule>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(props2.Data.Expression);
  }

  public Data: any;

  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }
}
