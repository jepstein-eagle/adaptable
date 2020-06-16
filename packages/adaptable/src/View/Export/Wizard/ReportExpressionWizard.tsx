import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ReportColumnScope } from '../../../PredefinedConfig/Common/Enums';
import { Report } from '../../../PredefinedConfig/ExportState';
import { UIHelper } from '../../UIHelper';

export class ReportExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
  constructor(private props2: AdaptableWizardStepProps<Report>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(props2.Data.Expression);
  }

  public Data: any;

  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }
  public Back(): void {
    //todo
  }

  public GetIndexStepDecrement() {
    return 1;
  }
}
