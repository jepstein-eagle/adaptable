import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IAlertDefinition } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";
import { AlertType } from "../../Core/Enums";
import { FormControl } from 'react-bootstrap';
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";


export interface AlertEntityRowProps extends SharedEntityExpressionRowProps<AlertEntityRow> {
    Column: IColumn
    onChangeAlertType: (index: number, Type: AlertType) => void
}

export class AlertEntityRow extends React.Component<AlertEntityRowProps, {}> {
    render(): any {
        let alert: IAlertDefinition = this.props.AdaptableBlotterObject as IAlertDefinition;

        let alertTypes = EnumExtensions.getNames(AlertType).map((type) => {
            return <option style={{ fontSize: "5px" }} key={type} value={type}>{type}</option>
        })

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = this.getColumnandRule(alert)
        colItems[1].Content =
           <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={alert.AlertType} onChange={(x) => this.onAlertTypeChanged(this.props.Index, x)} >
                {alertTypes}
            </FormControl> 
        colItems[2].Content = this.setExpressionDescription(alert)
        colItems[3].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, alert)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            ConfigEntity={alert}
            EntityName={StrategyNames.AlertStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }



    setExpressionDescription(Alert: IAlertDefinition): string {
        return (ExpressionHelper.IsNotEmptyExpression(Alert.Expression)) ?
            ExpressionHelper.ConvertExpressionToString(Alert.Expression, this.props.Columns, this.props.UserFilters) :
            "No Expression";
    }

    private getColumnandRule(Alert: IAlertDefinition): string {
        let columnInfo: string = ColumnHelper.getFriendlyNameFromColumn(Alert.ColumnId, this.props.Column)
        columnInfo += ": " + Alert.Description
        return columnInfo
    }

    onAlertTypeChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let alertType: AlertType;
        if (e.value == 'Info') {
            alertType = AlertType.Info
        } else if (e.value == 'Warning') {
            alertType = AlertType.Warning
        } else if (e.value == 'Error') {
            alertType = AlertType.Error
        }
        this.props.onChangeAlertType(index, alertType);
    }
}

