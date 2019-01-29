import * as React from "react";
import { FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { ICellValidationRule } from "../../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { ActionMode } from "../../Utilities/Enums";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { CellValidationHelper } from "../../Utilities/Helpers/CellValidationHelper";


export interface CellValidationEntityRowProps extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
    Column: IColumn
    onChangeActionMode: (index: number, ActionMode: ActionMode) => void
}

export class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
    render(): any {
        let cellValidation: ICellValidationRule = this.props.AdaptableBlotterObject as ICellValidationRule;

        let ActionModeTypes = EnumExtensions.getNames(ActionMode).map((validationMode) => {
            return <option  key={validationMode} value={validationMode}>{validationMode}</option>
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
             EntityName={StrategyConstants.CellValidationStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }



    setExpressionDescription(CellValidation: ICellValidationRule): string {
        return (ExpressionHelper.IsNotEmptyExpression( CellValidation.Expression )) ?
            ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns) :
            "No Expression";
    }

    private getColumnandRule(cellValidation: ICellValidationRule): string {
        let columnInfo: string = ColumnHelper.getFriendlyNameFromColumn(cellValidation.ColumnId, this.props.Column)
        columnInfo += ": " + CellValidationHelper.createCellValidationDescription( cellValidation, this.props.Columns)
        return columnInfo
    }

    onActionModeChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let returnValue: any = (e.value == 'Stop Edit') ? 'Stop Edit' : 'Warn User';
        this.props.onChangeActionMode(index, returnValue);
    }
}

