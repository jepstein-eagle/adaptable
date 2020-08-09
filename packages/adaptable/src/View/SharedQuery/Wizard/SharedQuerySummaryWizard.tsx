import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { SharedQuery } from '../../../PredefinedConfig/SharedQueryState';

export interface SharedQuerySummaryWizardProps extends AdaptableWizardStepProps<SharedQuery> {}

export class SharedQuerySummaryWizard extends React.Component<SharedQuerySummaryWizardProps, {}>
  implements AdaptableWizardStep {
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      {
        Key: 'Expression',
        Value: this.props.Data.Expression,
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.SharedQueryStrategyFriendlyName}
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
    //
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
