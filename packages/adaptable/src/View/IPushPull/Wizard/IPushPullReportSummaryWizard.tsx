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
import { IPushPullReport } from '../../../PredefinedConfig/IPushPullState';

export interface IPushPullReportSummaryWizardProps
  extends AdaptableWizardStepProps<IPushPullReport> {}

export class IPushPullReportSummaryWizard
  extends React.Component<IPushPullReportSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: IPushPullReportSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let scheduleDescription = this.props.Data.Report.AutoExport
      ? ' (' + UIHelper.getScheduleDescription(this.props.Data.Report.AutoExport.Schedule) + ')'
      : 'None';

    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Report.Name },
      {
        Key: 'Columns',
        Value: this.props.Adaptable!.ReportService.GetReportColumnsDescription(
          this.props.Data.Report,
          this.props.Columns
        ),
      },
      {
        Key: 'Rows',
        Value: this.props.Adaptable!.ReportService.GetReportExpressionDescription(
          this.props.Data.Report,
          this.props.Columns
        ),
      },
      { Key: 'Schedule', Value: scheduleDescription },
      { Key: 'Folder', Value: this.props.Data.Folder },
      { Key: 'Page', Value: this.props.Data.Page },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ExportStrategyFriendlyName}
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
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
