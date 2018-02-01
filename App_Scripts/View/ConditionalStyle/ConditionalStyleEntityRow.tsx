import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, Button, Form, Col, Panel, Row, FormControl, HelpBlock, Checkbox, Label } from 'react-bootstrap';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { IConditionalStyleCondition } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { Helper } from '../../Core/Helpers/Helper';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ColorPicker } from '../ColorPicker';
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';

export class ConditionalStyleEntityRow  extends React.Component<SharedEntityExpressionRowProps<ConditionalStyleEntityRow>, {}> {

    render(): any {
        let conditionalStyleCondition: IConditionalStyleCondition = this.props.ConfigEntity as IConditionalStyleCondition;

        let isDisabled = conditionalStyleCondition.IsPredefined
        let column = this.props.Columns.find(x => x.ColumnId == conditionalStyleCondition.ColumnId)

        let myCols: IColItem[] = []
        myCols.push({
            size: this.props.EntityRowInfo[0].Width, content:
                conditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column ?
                    column ? column.FriendlyName : conditionalStyleCondition.ColumnId + Helper.MissingColumnMagicString :
                    "Whole Row"
        });
        myCols.push({ size: this.props.EntityRowInfo[1].Width, content: <StyleVisualItem Style={conditionalStyleCondition.Style} /> });
        myCols.push({
            size: this.props.EntityRowInfo[2].Width, content: ExpressionHelper.ConvertExpressionToString(conditionalStyleCondition.Expression, this.props.Columns, this.props.UserFilters)
        });
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.Index, conditionalStyleCondition)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfigEntity={conditionalStyleCondition}
            overrideDisableEdit={(!column && conditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column)}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName="Conditional Style" />
        myCols.push({ size: this.props.EntityRowInfo[3].Width, content: buttons });

        return <ConfigEntityRowItem items={myCols} />
    }
}
