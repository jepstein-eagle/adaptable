import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
  ExpressionWizardProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ReportColumnScope } from '../../../PredefinedConfig/Common/Enums';
import { Report } from '../../../PredefinedConfig/ExportState';
import { UIHelper } from '../../UIHelper';
import { IPushPullReport } from '../../../PredefinedConfig/IPushPullState';

export class IPushPullReportExpressionWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<IPushPullReport>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(props2.Data.Report.Expression);
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
