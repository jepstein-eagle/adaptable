import { IPlusMinusCondition } from '../../Strategy/Interface/IPlusMinusStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Checkbox, FormControl, Label, HelpBlock } from 'react-bootstrap';
import { DataType } from '../../Core/Enums'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColumn, IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { Helper } from '../../Core/Helpers/Helper';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';


export interface PlusMinusEntityRowProps extends SharedEntityExpressionRowProps<PlusMinusEntityRow> {
    Column: IColumn
    onColumnDefaultNudgeValueChange: (index: number, event: React.FormEvent<any>) => void;
       }

export class PlusMinusEntityRow extends React.Component<PlusMinusEntityRowProps, {}> {
    render(): any {
        let x:IPlusMinusCondition= this.props.ConfigEntity as IPlusMinusCondition
        let myCols: IColItem[] = []
            myCols.push({
                size: this.props.EntityRowInfo[0].Width, 
                content: this.props.Column ? this.props.Column.FriendlyName : x.ColumnId + Helper.MissingColumnMagicString
            });
            myCols.push({
                size: this.props.EntityRowInfo[1].Width, 
                content: <FormControl value={x.DefaultNudge.toString()} type="number" placeholder="Enter a Number" onChange={(e) => this.props.onColumnDefaultNudgeValueChange(this.props.Index, e)} />
            });
            myCols.push({
                size: this.props.EntityRowInfo[2].Width,
                 content: this.wrapExpressionDescription(ExpressionHelper.ConvertExpressionToString(x.Expression, this.props.Columns, this.props.UserFilters))
            });
            let buttons: any = <EntityListActionButtons
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, x)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={false}
            ConfigEntity={x}
            EntityName="P">
        </EntityListActionButtons>
            myCols.push({ size: this.props.EntityRowInfo[3].Width,
                 content: buttons });

            return <ConfigEntityRowItem items={myCols} />

    }

  
    private wrapExpressionDescription(expressionDescription: string): string {
        return (expressionDescription == "Any") ? "[Default Column Nudge Value]" : expressionDescription;
    }
}

