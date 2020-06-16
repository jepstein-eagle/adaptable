import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { UIHelper } from '../../UIHelper';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';

export class UserFilterExpressionWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: AdaptableWizardStepProps<UserFilter>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderStateWithColumn(
      props2.Data.Expression,
      props2.Data.ColumnId
    );
  }
  public Data: any;

  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }
}
