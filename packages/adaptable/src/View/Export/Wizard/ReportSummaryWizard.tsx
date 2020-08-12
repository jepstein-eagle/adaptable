import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { UIHelper } from '../../UIHelper';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<Report> {}

export class ReportSummaryWizard extends React.Component<ReportSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ReportSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      {
        Key: 'Columns',
        Value: this.props.Api.internalApi
          .getReportService()
          .GetReportColumnsDescription(this.props.Data, this.props.Api.gridApi.getColumns()),
      },
      {
        Key: 'Rows',
        Value: this.props.Api.internalApi
          .getReportService()
          .GetReportExpressionDescription(this.props.Data, this.props.Api.gridApi.getColumns()),
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
  public Next(): void {
    //
  }
  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
