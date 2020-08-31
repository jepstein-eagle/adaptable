import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { UserFilter } from '../../../PredefinedConfig/FilterState';

export interface UserFilterSummaryWizardProps extends AdaptableWizardStepProps<UserFilter> {}

export class UserFilterSummaryWizard extends React.Component<UserFilterSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: UserFilterSummaryWizardProps) {
    super(props);
  }
  render() {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.data.Name },
      {
        Key: 'Column',
        Value: '',
      },
      {
        Key: 'Query',
        Value: 'Need to do this',
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.UserFilterStrategyFriendlyName}
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
    /* no implementation */
  }
  public back(): void {
    /* no implementation */
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
