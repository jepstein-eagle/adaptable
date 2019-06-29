import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { DataSource } from '../../../PredefinedConfig/RunTimeState/DataSourceState';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';

export interface DataSourceSummaryWizardProps extends AdaptableWizardStepProps<DataSource> {}

export class DataSourceSummaryWizard extends React.Component<DataSourceSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: DataSourceSummaryWizardProps) {
    super(props);
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '-summary';

    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Description', Value: this.props.Data.Description },
    ];

    let summaryPage = (
      <WizardSummaryPage
        cssClassName={cssClassName}
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.DataSourceStrategyName}
      />
    );
    return <div className={cssClassName}>{summaryPage}</div>;
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
