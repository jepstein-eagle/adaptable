import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
  ExpressionWizardProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ReportColumnScope } from '../../../PredefinedConfig/Common/Enums';
import { Report } from '../../../PredefinedConfig/RunTimeState/ExportState';
import { UIHelper } from '../../UIHelper';

export class ReportExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<Report>) {
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
