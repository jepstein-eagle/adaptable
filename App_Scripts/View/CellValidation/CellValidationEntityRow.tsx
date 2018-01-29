import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel, FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { CellValidationMode } from '../../Core/Enums'
import * as StrategyNames from '../../Core/StrategyNames'
import { SharedEntityExpressionRowProps } from '../Components/ConfigEntityRowProps';


export interface CellValidationEntityRowProps extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
   // CellValidation: ICellValidationRule
    Column: IColumn
    ///Columns: IColumn[]
    //UserFilters: IUserFilter[]
  //  Index: number
 //   onEdit: (index: number, CellValidation: ICellValidationRule) => void;
 //   onShare: () => void;
 //   TeamSharingActivated: boolean
 //   onDeleteConfirm: Redux.Action;
    onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => void

}

export class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
    render(): any {
     let cellValidation:ICellValidationRule = this.props.ConfigEntity as ICellValidationRule;
     
        let CellValidationModeTypes = EnumExtensions.getNames(CellValidationMode).map((enumName) => {
            return <option key={enumName} value={enumName}>{StringExtensions.PlaceSpaceBetweenCapitalisedWords(enumName)}</option>
        })

        let myCols: IColItem[] = []
        myCols.push({ size: 2, content: this.props.Column ? this.props.Column.FriendlyName : cellValidation.ColumnId + Helper.MissingColumnMagicString });
        myCols.push({ size: 3, content: cellValidation.Description});
        myCols.push({ size: 2, content: this.setExpressionDescription(cellValidation)});
        myCols.push({
            size: 2, content:
                <FormControl  componentClass="select" placeholder="select" value={cellValidation.CellValidationMode} onChange={(x) => this.onCellValidationModeChanged(this.props.Index, x)} >

                    {CellValidationModeTypes}
                </FormControl>
        });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, cellValidation)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            ConfigEntity={cellValidation}
            EntityName={StrategyNames.CellValidationStrategyName} />

        myCols.push({ size: 3, content: buttons });


        return <ConfigEntityRowItem
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

