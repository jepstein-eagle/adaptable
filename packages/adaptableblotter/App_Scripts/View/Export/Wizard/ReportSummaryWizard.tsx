import { Report } from '../../../PredefinedConfig/RunTimeState/ExportState';
import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';
import { UIHelper } from '../../UIHelper';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';

export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<Report> {
  UserFilters: UserFilter[];
}

export class ReportSummaryWizard extends React.Component<ReportSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ReportSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let scheduleDescription = this.props.Data.AutoExport
      ? ' (' + UIHelper.getScheduleDescription(this.props.Data.AutoExport.Schedule) + ')'
      : 'None';

    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      {
        Key: 'Columns',
        Value: this.props.Blotter!.ReportService.GetReportColumnsDescription(
          this.props.Data,
          this.props.Columns
        ),
      },
      {
        Key: 'Rows',
        Value: this.props.Blotter!.ReportService.GetReportExpressionDescription(
          this.props.Data,
          this.props.Columns
        ),
      },
      { Key: 'Schedule', Value: scheduleDescription },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ExportStrategyName}
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
