import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
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
        Value: this.props.api.columnApi.getFriendlyNameFromColumnId(this.props.data.ColumnId),
      },
      { Key: 'Nudge Value', Value: this.props.data.NudgeValue },
      { Key: 'Is Column Default', Value: this.props.data.IsDefaultNudge ? 'True' : 'False' },
      {
        Key: 'Custom Rule',
        Value: this.props.data.IsDefaultNudge
          ? 'None'
          : this.props.api.queryApi.QueryObjectToString(this.props.data),
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
  public next(): void {
    /* No implementation */
  }
  public back(): void {
    /* No implementation */
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return this.props.data.IsDefaultNudge ? 2 : 1;
  }
}
