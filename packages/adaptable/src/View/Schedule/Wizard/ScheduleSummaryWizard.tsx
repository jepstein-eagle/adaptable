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
import { Glue42Schedule } from '../../../PredefinedConfig/Glue42State';
import { IPushPullSchedule } from '../../../PredefinedConfig/IPushPullState';
import { OpenFinSchedule } from '../../../PredefinedConfig/OpenFinState';

export interface ScheduleSummaryWizardProps extends AdaptableWizardStepProps<BaseSchedule> {}

export class ScheduleSummaryWizard extends React.Component<ScheduleSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ScheduleSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [];
    switch (this.props.data.ScheduleType) {
      case ScheduleType.Reminder:
        let reminderKVP: KeyValuePair[] = [
          { Key: 'Header', Value: (this.props.data as ReminderSchedule)!.Alert.Header },
          { Key: 'Message', Value: (this.props.data as ReminderSchedule)!.Alert.Msg },
          {
            Key: 'Message Type',
            Value: (this.props.data as ReminderSchedule)!.Alert.AlertDefinition.MessageType,
          },
          {
            Key: 'Show as Popup',
            Value: (this.props.data as ReminderSchedule)!.Alert.AlertDefinition.AlertProperties
              .ShowPopup
              ? 'True'
              : 'False',
          },
        ];
        keyValuePairs.push(...reminderKVP);
        break;
      case ScheduleType.Report:
        let reportKVP: KeyValuePair[] = [
          { Key: 'Report Name', Value: (this.props.data as ReportSchedule)!.ReportName },
          {
            Key: 'Export Destination',
            Value: (this.props.data as ReportSchedule)!.ExportDestination,
          },
        ];
        keyValuePairs.push(...reportKVP);
        break;
      case ScheduleType.ipushpull:
        let iPushPullKVP: KeyValuePair[] = [
          {
            Key: 'Report',
            Value: (this.props.data as IPushPullSchedule)!.IPushPullReport.ReportName,
          },
          { Key: 'Folder', Value: (this.props.data as IPushPullSchedule)!.IPushPullReport.Folder },
          { Key: 'Page', Value: (this.props.data as IPushPullSchedule)!.IPushPullReport.Page },
          {
            Key: 'Export As',
            Value: (this.props.data as IPushPullSchedule)!.Transmission,
          },
        ];
        keyValuePairs.push(...iPushPullKVP);
        break;
      case ScheduleType.Glue42:
        let glue42KVP: KeyValuePair[] = [
          {
            Key: 'Report',
            Value: (this.props.data as Glue42Schedule)!.Glue42Report.ReportName,
          },
          //   {
          //     Key: 'Export As',
          //     Value: (this.props.Data as Glue42Schedule)!.Transmission,
          //   },
        ];
        keyValuePairs.push(...glue42KVP);
        break;
      case ScheduleType.OpenFin:
        let openFinKVP: KeyValuePair[] = [
          {
            Key: 'Report',
            Value: (this.props.data as OpenFinSchedule)!.OpenFinReport.ReportName,
          },
        ];
        keyValuePairs.push(...openFinKVP);
        break;
    }
    keyValuePairs.push({
      Key: 'Schedule',
      Value: UIHelper.getScheduleDescription(this.props.data.Schedule),
    });

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ReminderStrategyFriendlyName}
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
