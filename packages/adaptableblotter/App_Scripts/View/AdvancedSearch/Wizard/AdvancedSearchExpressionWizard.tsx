import {
  AdaptableWizardStep,
  ExpressionWizardProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { UIHelper } from '../../UIHelper';
import { AdvancedSearch } from '../../../PredefinedConfig/IUserState/AdvancedSearchState';

export class AdvancedSearchExpressionWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(public props2: ExpressionWizardProps<AdvancedSearch>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(props2.Data.Expression);
  }

  public Data: any;

  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }

  public Back(): void {
    // todo
  }
}
