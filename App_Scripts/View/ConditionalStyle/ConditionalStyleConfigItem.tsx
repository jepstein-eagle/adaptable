import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, Button, Form, Col, Panel, Row, FormControl, HelpBlock, Checkbox, Label } from 'react-bootstrap';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { EnumExtensions } from '../../Core/Extensions';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ColorPicker } from '../ColorPicker';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';

export interface ConditionalStyleConfigItemProps extends React.ClassAttributes<ConditionalStyleConfigItem> {
    ConditionalStyleCondition: IConditionalStyleCondition;
    Columns: IColumn[];
    TeamSharingActivated: boolean
    UserFilters: IUserFilter[]
    onDeleteConfirm: Redux.Action;
    onEdit: (ConditionalStyleCondition: IConditionalStyleCondition) => void;
    onShare: () => void
}

export class ConditionalStyleConfigItem extends React.Component<ConditionalStyleConfigItemProps, {}> {

    render(): any {
        let isDisabled = this.props.ConditionalStyleCondition.IsPredefined
        let styleVisualItem = <StyleVisualItem Style={this.props.ConditionalStyleCondition.Style} />
        let column = this.props.Columns.find(x => x.ColumnId == this.props.ConditionalStyleCondition.ColumnId)

<<<<<<< HEAD
        let myCols: IColItem[] = []
        myCols.push({
            size: 3, content:
                this.props.ConditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column ?
                    column ? column.FriendlyName : this.props.ConditionalStyleCondition.ColumnId + Helper.MissingColumnMagicString :
                    "Whole Row"
        });
        myCols.push({ size: 2, content: <StyleVisualItem Style={this.props.ConditionalStyleCondition.Style} /> });
        myCols.push({
            size: 4, content: <span style={expressionFontSizeStyle}>
                {ExpressionHelper.ConvertExpressionToString(this.props.ConditionalStyleCondition.Expression, this.props.Columns, this.props.UserFilters)}
            </span>
        });
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.ConditionalStyleCondition)}
            ConfigEntity={this.props.ConditionalStyleCondition}
            overrideDisableEdit={(!column && this.props.ConditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column)}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName="Conditional Style" />
        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRow items={myCols} />
=======
                <Col xs={4}>
                    <span style={expressionFontSizeStyle}>
                        {ExpressionHelper.ConvertExpressionToString(this.props.ConditionalStyleCondition.Expression, this.props.Columns, this.props.UserFilters)}
                    </span>
                </Col>

                <Col md={3} >
                    <EntityListActionButtons
                        editClick={() => this.props.onEdit(this.props.ConditionalStyleCondition)}
                        showShare={this.props.TeamSharingActivated}
                        shareClick={() => this.props.onShare()}
                        ConfigEntity={this.props.ConditionalStyleCondition}
                        overrideDisableEdit={(!column && this.props.ConditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column)}
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
                        EntityName="Conditional Style">
                    </EntityListActionButtons>
                </Col>
            </Row>
        </li >
>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
    }
}

var expressionFontSizeStyle = {
    fontSize: 'small'
};