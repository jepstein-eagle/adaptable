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
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Description', Value: this.props.Data.Description },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.DataSourceStrategyFriendlyName}
      />
    );
    return <div>{summaryPage}</div>;
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
    /* no implementation required   */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
