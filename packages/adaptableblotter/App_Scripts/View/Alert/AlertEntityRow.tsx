import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IAlertDefinition } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";
import { MessageType } from "../../Core/Enums";
import { FormControl } from 'react-bootstrap';
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { AlertHelper } from "../../Core/Helpers/AlertHelper";


export interface AlertEntityRowProps extends SharedEntityExpressionRowProps<AlertEntityRow> {
    Column: IColumn
    onChangeMessageType: (index: number, Type: MessageType) => void
}

export class AlertEntityRow extends React.Component<AlertEntityRowProps, {}> {
    render(): any {
        let alert: IAlertDefinition = this.props.AdaptableBlotterObject as IAlertDefinition;

        let MessageTypes = EnumExtensions.getNames(MessageType).map((type) => {
            return <option style={{ fontSize: "5px" }} key={type} value={type}>{type}</option>
        })

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = this.getColumnandRule(alert)
        colItems[1].Content =
           <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={alert.MessageType} onChange={(x) => this.onMessageTypeChanged(this.props.Index, x)} >
                {MessageTypes}
            </FormControl> 
        colItems[2].Content = this.setExpressionDescription(alert)
        colItems[3].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, alert)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            EntityName={StrategyConstants.AlertStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }



    setExpressionDescription(Alert: IAlertDefinition): string {
        return (ExpressionHelper.IsNotEmptyExpression(Alert.Expression)) ?
            ExpressionHelper.ConvertExpressionToString(Alert.Expression, this.props.Columns) :
            "No Expression";
    }

    private getColumnandRule(Alert: IAlertDefinition): string {
        let columnInfo: string = ColumnHelper.getFriendlyNameFromColumn(Alert.ColumnId, this.props.Column)
        columnInfo += ": " + AlertHelper.createAlertDescription(Alert, this.props.Columns)
        return columnInfo
    }

    onMessageTypeChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let messageType: MessageType;
        if (e.value == 'Info') {
            messageType = MessageType.Info
        } else if (e.value == 'Warning') {
            messageType = MessageType.Warning
        } else if (e.value == 'Error') {
            messageType = MessageType.Error
        }
        this.props.onChangeMessageType(index, messageType);
    }
}

