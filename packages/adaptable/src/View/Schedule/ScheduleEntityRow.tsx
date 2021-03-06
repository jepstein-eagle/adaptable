import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { EntityRowItem } from '../Components/EntityRowItem';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
import UIHelper from '../UIHelper';
import { ScheduleType } from '../../PredefinedConfig/Common/Enums';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { OpenFinSchedule } from '../../PredefinedConfig/OpenFinState';

export class ScheduleEntityRow extends React.Component<
  SharedEntityRowProps<ScheduleEntityRow>,
  {}
> {
  render(): any {
    let baseSchedule: BaseSchedule = this.props.adaptableObject as BaseSchedule;
    let details: string = '';
    switch (baseSchedule.ScheduleType) {
      case ScheduleType.Reminder:
        let reminderSchedule: ReminderSchedule = baseSchedule as ReminderSchedule;
        details =
          reminderSchedule.Alert.Msg +
          ' (' +
          reminderSchedule.Alert.AlertDefinition.MessageType +
          ')';
        break;
      case ScheduleType.Report:
        let reportSchedule: ReportSchedule = baseSchedule as ReportSchedule;
        details = reportSchedule.ReportName + ' (' + reportSchedule.ExportDestination + ')';
        break;
      case ScheduleType.ipushpull:
        let iPushPullSchedule: IPushPullSchedule = baseSchedule as IPushPullSchedule;
        details =
          iPushPullSchedule.IPushPullReport.ReportName +
          ' (' +
          iPushPullSchedule.IPushPullReport.Folder +
          '/' +
          iPushPullSchedule.IPushPullReport.Page +
          ' - ' +
          iPushPullSchedule.Transmission +
          ')';
        break;
      case ScheduleType.Glue42:
        let glue42Schedule: Glue42Schedule = baseSchedule as Glue42Schedule;
        details = glue42Schedule.Glue42Report.ReportName;
        break;
      case ScheduleType.OpenFin:
        let openFinSchedule: OpenFinSchedule = baseSchedule as OpenFinSchedule;
        details = openFinSchedule.OpenFinReport.ReportName;
        break;
    }

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={baseSchedule.ScheduleType} />;
    colItems[1].Content = <EntityRowItem Content={details} />;
    colItems[2].Content = (
      <EntityRowItem Content={UIHelper.getScheduleDescription(baseSchedule.Schedule)} />
    );
    let buttons: any = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(baseSchedule)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        confirmDeleteAction={this.props.onDeleteConfirm}
        entityType={StrategyConstants.ScheduleStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
