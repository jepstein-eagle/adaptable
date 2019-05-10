import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
  ExpressionWizardProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ReportColumnScope } from '../../../Utilities/Enums';
import { IReport } from '../../../Utilities/Interface/BlotterObjects/IReport';
import { UIHelper } from '../../UIHelper';

export class ReportExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<IReport>) {
    super(props2);
    this.state = UIHelper.getExpressionBuilderState(this.props2.Data.Expression);
  }

  public Next(): void {
    this.props2.Data.Expression = this.state.Expression;
  }
  public Back(): void {
    //todo
  }

  public GetIndexStepDecrement() {
    return 1;
  }
}
