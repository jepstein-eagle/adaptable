import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { SharedQuery } from '../../../PredefinedConfig/QueryState';

export interface SharedQuerySummaryWizardProps extends AdaptableWizardStepProps<SharedQuery> {}

export class SharedQuerySummaryWizard extends React.Component<SharedQuerySummaryWizardProps, {}>
  implements AdaptableWizardStep {
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.data.Name },
      {
        Key: 'Expression',
        Value: this.props.data.Expression,
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.QueryStrategyFriendlyName}
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
    //
  }
  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
