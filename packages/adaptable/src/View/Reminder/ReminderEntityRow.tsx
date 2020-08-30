import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { EntityRowItem } from '../Components/EntityRowItem';
import { UIHelper } from '../UIHelper';

export class ReminderEntityRow extends React.Component<
  SharedEntityRowProps<ReminderEntityRow>,
  {}
> {
  render(): any {
    let reminder: ReminderSchedule = this.props.AdaptableObject as ReminderSchedule;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={reminder.Alert.Msg} />;
    colItems[1].Content = <EntityRowItem Content={reminder.Alert.AlertDefinition.MessageType} />;
    colItems[2].Content = (
      <EntityRowItem Content={UIHelper.getScheduleDescription(reminder.Schedule)} />
    );
    let buttons: any = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(reminder)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ReminderStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
