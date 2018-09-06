import * as React from "react";
import { FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { ICellValidationRule } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ActionMode } from "../../Core/Enums";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";


export interface CellValidationEntityRowProps extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
    Column: IColumn
    onChangeActionMode: (index: number, ActionMode: ActionMode) => void
}

export class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
    render(): any {
        let cellValidation: ICellValidationRule = this.props.AdaptableBlotterObject as ICellValidationRule;

        let ActionModeTypes = EnumExtensions.getNames(ActionMode).map((validationMode) => {
            return <option style={{ fontSize: "5px" }} key={validationMode} value={validationMode}>{validationMode}</option>
        })

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = this.getColumnandRule(cellValidation)
        colItems[1].Content = this.setExpressionDescription(cellValidation)
        colItems[2].Content =
            <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={cellValidation.ActionMode} onChange={(x) => this.onActionModeChanged(this.props.Index, x)} >
                {ActionModeTypes}
            </FormControl>
        colItems[3].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, cellValidation)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            ConfigEntity={cellValidation}
            EntityName={StrategyIds.CellValidationStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }



    setExpressionDescription(CellValidation: ICellValidationRule): string {
        return (ExpressionHelper.IsNotEmptyExpression( CellValidation.Expression )) ?
            ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns, this.props.UserFilters) :
            "No Expression";
    }

    private getColumnandRule(cellValidation: ICellValidationRule): string {
        let columnInfo: string = ColumnHelper.getFriendlyNameFromColumn(cellValidation.ColumnId, this.props.Column)
        columnInfo += ": " + cellValidation.Description
        return columnInfo
    }

    onActionModeChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let returnValue: any = (e.value == 'Stop Edit') ? 'Stop Edit' : 'Warn User';
        this.props.onChangeActionMode(index, returnValue);
    }
}

