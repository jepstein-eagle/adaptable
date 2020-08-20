import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';

export interface PlusMinusSummaryWizardProps extends AdaptableWizardStepProps<PlusMinusRule> {}

export class PlusMinusSummaryWizard extends React.Component<PlusMinusSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: PlusMinusSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Name',
        Value: this.props.Api.columnApi.getFriendlyNameFromColumnId(this.props.Data.ColumnId),
      },
      { Key: 'Nudge Value', Value: this.props.Data.NudgeValue },
      { Key: 'Is Column Default', Value: this.props.Data.IsDefaultNudge ? 'True' : 'False' },
      {
        Key: 'Custom Rule',
        Value: this.props.Data.IsDefaultNudge
          ? 'None'
          : ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Api),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.PlusMinusStrategyFriendlyName}
      />
    );
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    /* No implementation */
  }
  public Back(): void {
    /* No implementation */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return this.props.Data.IsDefaultNudge ? 2 : 1;
  }
}
