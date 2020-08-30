import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { DataSource } from '../../../PredefinedConfig/DataSourceState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';

export interface DataSourceSummaryWizardProps extends AdaptableWizardStepProps<DataSource> {}

export class DataSourceSummaryWizard extends React.Component<DataSourceSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: DataSourceSummaryWizardProps) {
    super(props);
  }

  render() {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.data.Name },
      { Key: 'Description', Value: this.props.data.Description },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.DataSourceStrategyFriendlyName}
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
    /* no implementation required   */
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
