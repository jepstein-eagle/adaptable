import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';

export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<Report> {}

export class ReportSummaryWizard extends React.Component<ReportSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ReportSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.data.Name },
      {
        Key: 'Column Scope',
        Value: this.props.api.internalApi
          .getReportService()
          .GetReportColumnScopeLongDescription(this.props.data),
      },
      {
        Key: 'Row Scope',
        Value: this.props.api.internalApi
          .getReportService()
          .GetReportExpressionDescription(this.props.data, this.props.api.columnApi.getColumns()),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ExportStrategyFriendlyName}
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
    //todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
