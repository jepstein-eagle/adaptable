import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { UIHelper } from '../../UIHelper';
import { BaseSchedule } from '../../../PredefinedConfig/Common/Schedule';
import { ScheduleType } from '../../../PredefinedConfig/Common/Enums';
import { ReminderSchedule } from '../../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../../../PredefinedConfig/IPushPullState';

export interface ScheduleSummaryWizardProps extends AdaptableWizardStepProps<BaseSchedule> {}

export class ScheduleSummaryWizard extends React.Component<ScheduleSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ScheduleSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [];
    switch (this.props.Data.ScheduleType) {
      case ScheduleType.Reminder:
        let reminderKVP: KeyValuePair[] = [
          { Key: 'Header', Value: (this.props.Data as ReminderSchedule)!.Alert.Header },
          { Key: 'Message', Value: (this.props.Data as ReminderSchedule)!.Alert.Msg },
          {
            Key: 'Message Type',
            Value: (this.props.Data as ReminderSchedule)!.Alert.AlertDefinition.MessageType,
          },
          {
            Key: 'Show as Popup',
            Value: (this.props.Data as ReminderSchedule)!.Alert.AlertDefinition.AlertProperties
              .ShowPopup
              ? 'True'
              : 'False',
          },
        ];
        keyValuePairs.push(...reminderKVP);
        break;
      case ScheduleType.Report:
        let reportKVP: KeyValuePair[] = [
          { Key: 'ReportName', Value: (this.props.Data as ReportSchedule)!.ReportName },
          {
            Key: 'ExportDestination',
            Value: (this.props.Data as ReportSchedule)!.ExportDestination,
          },
        ];
        keyValuePairs.push(...reportKVP);
        break;
      case ScheduleType.iPushPull:
        let iPushPullKVP: KeyValuePair[] = [
          {
            Key: 'Report',
            Value: (this.props.Data as IPushPullSchedule)!.IPushPullReport.ReportName,
          },
          { Key: 'Folder', Value: (this.props.Data as IPushPullSchedule)!.IPushPullReport.Folder },
          { Key: 'Page', Value: (this.props.Data as IPushPullSchedule)!.IPushPullReport.Page },
          {
            Key: 'Export As',
            Value: (this.props.Data as IPushPullSchedule)!.Transmission,
          },
        ];
        keyValuePairs.push(...iPushPullKVP);
        break;
    }
    keyValuePairs.push({
      Key: 'Schedule',
      Value: UIHelper.getScheduleDescription(this.props.Data.Schedule),
    });

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ReminderStrategyFriendlyName}
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
    /* no implementation */
  }

  public Back(): void {
    /* no implementation */
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
