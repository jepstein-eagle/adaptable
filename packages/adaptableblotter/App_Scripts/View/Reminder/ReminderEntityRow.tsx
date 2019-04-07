import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableObjectRow, } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IReminder } from "../../Utilities/Interface/BlotterObjects/IReminder";
import { EntityRowItem } from "../Components/EntityRowItem";
import { UIHelper } from "../UIHelper";

export class ReminderEntityRow extends React.Component<SharedEntityExpressionRowProps<ReminderEntityRow>, {}> {

    render(): any {
        let reminder: IReminder = this.props.AdaptableBlotterObject as IReminder;

     //   let column = ColumnHelper.getColumnFromId(Reminder.ColumnId, this.props.Columns);
         
        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = <EntityRowItem Content={ reminder.Alert.Msg} />
        colItems[1].Content = <EntityRowItem Content={ reminder.Alert.MessageType} />
        colItems[2].Content = <EntityRowItem Content={ UIHelper.GetScheduleDescription(reminder.Schedule) }/>
        let buttons: any = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            editClick={() => this.props.onEdit(this.props.Index, reminder)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityType={StrategyConstants.ReminderStrategyName} />
        colItems[3].Content = buttons;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

  
}