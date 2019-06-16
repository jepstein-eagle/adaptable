import { ExpressionBuilderPage } from '../../../ExpressionBuilder/ExpressionBuilderPage';
import {
  AdaptableWizardStep,
  ExpressionWizardProps,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { ICategoryChartDefinition } from '../../../../PredefinedConfig/IUserState/ChartState';
import { UIHelper } from '../../../UIHelper';

export class CategoryChartXAxisExpressionWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<ICategoryChartDefinition>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderStateWithColumn(
      props2.Data.XAxisExpression,
      props2.Data.XAxisColumnId
    );
  }

  public Data: any;

  public Next(): void {
    this.Data.XAxisExpression = this.state.Expression;
  }

  public canBack(): boolean {
    return true;
  }
}
