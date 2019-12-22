import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { Reminder } from '../../PredefinedConfig/ReminderState';
import { EntityRowItem } from '../Components/EntityRowItem';
import { UIHelper } from '../UIHelper';

export class ReminderEntityRow extends React.Component<
  SharedEntityExpressionRowProps<ReminderEntityRow>,
  {}
> {
  render(): any {
    let reminder: Reminder = this.props.AdaptableObject as Reminder;

    //   let column = ColumnHelper.getColumnFromId(Reminder.ColumnId, this.props.Columns);

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={reminder.Alert.Msg} />;
    colItems[1].Content = <EntityRowItem Content={reminder.Alert.AlertDefinition.MessageType} />;
    colItems[2].Content = (
      <EntityRowItem Content={UIHelper.getScheduleDescription(reminder.Schedule)} />
    );
    let buttons: any = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(reminder)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ReminderStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
