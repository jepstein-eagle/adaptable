import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { EntityRowItem } from '../Components/EntityRowItem';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
import UIHelper from '../UIHelper';
import { ScheduleType } from '../../PredefinedConfig/Common/Enums';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import {
  ReminderScheduleEditAction,
  ReminderScheduleAddAction,
} from '../../Redux/ActionsReducers/ReminderRedux';

export class ScheduleEntityRow extends React.Component<
  SharedEntityExpressionRowProps<ScheduleEntityRow>,
  {}
> {
  render(): any {
    let baseSchedule: BaseSchedule = this.props.AdaptableObject as BaseSchedule;
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
      case ScheduleType.iPushPull:
        let iPushPullSchedule: IPushPullSchedule = baseSchedule as IPushPullSchedule;
        details =
          iPushPullSchedule.IPushPullReport.ReportName +
          ' (' +
          iPushPullSchedule.IPushPullReport.Folder +
          '/' +
          iPushPullSchedule.IPushPullReport.Page +
          ' - ' +
          iPushPullSchedule.DataTransmission +
          ')';
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
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ScheduleStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
