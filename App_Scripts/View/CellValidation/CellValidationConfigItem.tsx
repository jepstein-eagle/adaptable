import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel, FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { CellValidationMode } from '../../Core/Enums'
import * as StrategyNames from '../../Core/StrategyNames'

export interface CellValidationConfigItemProps extends React.ClassAttributes<CellValidationConfigItem> {
    CellValidation: ICellValidationRule
    Column: IColumn
    Columns: IColumn[]
    UserFilters: IUserFilter[]
    Index: number
    onEdit: (index: number, CellValidation: ICellValidationRule) => void;
    onShare: () => void;
    TeamSharingActivated: boolean
    onDeleteConfirm: Redux.Action;
    onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => void

}

export class CellValidationConfigItem extends React.Component<CellValidationConfigItemProps, {}> {
    render(): any {
        let CellValidationModeTypes = EnumExtensions.getNames(CellValidationMode).map((enumName) => {
            return <option key={enumName} value={enumName}>{StringExtensions.PlaceSpaceBetweenCapitalisedWords(enumName)}</option>
        })

        let myCols: IColItem[] = []
        myCols.push({ size: 2, content: this.props.Column ? this.props.Column.FriendlyName : this.props.CellValidation.ColumnId + Helper.MissingColumnMagicString });
        myCols.push({ size: 3, content: <span style={expressionFontSizeStyle}>{this.props.CellValidation.Description}</span> });
        myCols.push({ size: 2, content: <span style={expressionFontSizeStyle}>{this.setExpressionDescription(this.props.CellValidation)}</span> });
        myCols.push({
            size: 3, content:
                <FormControl style={expressionFontSizeStyle} componentClass="select" placeholder="select" value={this.props.CellValidation.CellValidationMode} onChange={(x) => this.onCellValidationModeChanged(this.props.Index, x)} >

                    {CellValidationModeTypes}
                </FormControl>
        });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, this.props.CellValidation)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            ConfigEntity={this.props.CellValidation}
            EntityName={StrategyNames.CellValidationStrategyName} />

        myCols.push({ size: 3, content: buttons });


        return <ConfigEntityRow
            items={myCols}
        />
    }

    setExpressionDescription(CellValidation: ICellValidationRule): string {
        return (CellValidation.HasExpression) ?
            ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, this.props.Columns, this.props.UserFilters) :
            "No Expression";
    }


    onCellValidationModeChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeCellValidationMode(index, e.value as CellValidationMode);
    }
}

let expressionFontSizeStyle = {
    fontSize: 'small'
};
