import * as React from "react";
import { Helper } from '../../Core/Helpers/Helper';
import { FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { CellValidationMode } from '../../Core/Enums'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { IColItem } from "../UIInterfaces";
import { ICellValidationRule } from "../../Core/Api/AdaptableBlotterObjects";


export interface CellValidationEntityRowProps extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
    Column: IColumn
    onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => void
}

export class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
    render(): any {
        let cellValidation: ICellValidationRule = this.props.AdaptableBlotterObject as ICellValidationRule;

        let CellValidationModeTypes = EnumExtensions.getNames(CellValidationMode).map((enumName) => {
            return <option style={{ fontSize: "5px" }} key={enumName} value={enumName}>{StringExtensions.PlaceSpaceBetweenCapitalisedWords(enumName)}</option>
        })

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = this.getColumnandRule(cellValidation)
        colItems[1].Content = this.setExpressionDescription(cellValidation)
        colItems[2].Content =
            <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={cellValidation.CellValidationMode} onChange={(x) => this.onCellValidationModeChanged(this.props.Index, x)} >
                {CellValidationModeTypes}
            </FormControl>
        colItems[3].Content = <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, cellValidation)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            ConfigEntity={cellValidation}
            EntityName={StrategyNames.CellValidationStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems ={colItems} />
    }

  

    setExpressionDescription(CellValidation: ICellValidationRule): string {
        return (CellValidation.HasExpression) ?
            ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, this.props.Columns, this.props.UserFilters) :
            "No Expression";
    }

     private getColumnandRule(cellValidation: ICellValidationRule):string {
        let columnInfo: string =   this.props.Column ? this.props.Column.FriendlyName : cellValidation.ColumnId + GeneralConstants.MISSING_COLUMN
        columnInfo += ": " +        cellValidation.Description
        return columnInfo
       }

    onCellValidationModeChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeCellValidationMode(index, e.value as CellValidationMode);
    }
}

