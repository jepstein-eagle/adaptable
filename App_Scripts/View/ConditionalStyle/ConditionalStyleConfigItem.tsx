import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, Button, Form, Col, Panel, Row, FormControl, HelpBlock, Checkbox, Label } from 'react-bootstrap';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { EnumExtensions } from '../../Core/Extensions';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ColorPicker } from '../ColorPicker';
import { IUserFilter } from '../../Core/Interface/IExpression';

interface ConditionalStyleConfigItemProps extends React.ClassAttributes<ConditionalStyleConfigItem> {
    ConditionalStyleCondition: IConditionalStyleCondition;
    Columns: IColumn[];
    UserFilters: IUserFilter[]
    onDeleteConfirm: Redux.Action;
    onEdit: (ConditionalStyleCondition: IConditionalStyleCondition) => void;
}

export class ConditionalStyleConfigItem extends React.Component<ConditionalStyleConfigItemProps, {}> {

    render(): any {
        let isDisabled = this.props.ConditionalStyleCondition.IsPredefined

        let backColorForStyle: string = this.props.ConditionalStyleCondition.Style.BackColor != undefined ? this.props.ConditionalStyleCondition.Style.BackColor : "transparent";
        let foreColorForStyle: string = this.props.ConditionalStyleCondition.Style.ForeColor != undefined ? this.props.ConditionalStyleCondition.Style.ForeColor : "black";
        let fontWeightForStyle: any = this.props.ConditionalStyleCondition.Style.FontWeight == FontWeight.Bold ? "bold" : "normal"
        let fontStyleForStyle: any = this.props.ConditionalStyleCondition.Style.FontStyle == FontStyle.Italic ? "italic" : "normal"
        let fontSizeForStyle: any = EnumExtensions.getCssFontSizeFromFontSizeEnum(this.props.ConditionalStyleCondition.Style.FontSize);
        let column = this.props.Columns.find(x => x.ColumnId == this.props.ConditionalStyleCondition.ColumnId)
        return <li
            className="list-group-item"
            onClick={() => { }}>
            <Row style={{ display: "flex", alignItems: "center" }}>

                <Col md={3} >
                    {this.props.ConditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column ?
                        column ? column.FriendlyName : this.props.ConditionalStyleCondition.ColumnId :
                        "Whole Row"
                    }
                </Col>

                <Col md={2} >
                    <div style={{

                        margin: '2px', padding: '3px', background: backColorForStyle, color: foreColorForStyle, fontWeight: fontWeightForStyle, fontStyle: fontStyleForStyle
                    }}>Style</div> {/* font size taken out */}
                </Col>

                <Col xs={4}>
                    <span style={expressionFontSizeStyle}>
                        {ExpressionHelper.ConvertExpressionToString(this.props.ConditionalStyleCondition.Expression, this.props.Columns, this.props.UserFilters)}
                    </span>
                </Col>

                <Col md={3} >
                    <EntityListActionButtons
                        editClick={() => this.props.onEdit(this.props.ConditionalStyleCondition)}
                        ConfigEntity={this.props.ConditionalStyleCondition}
                        ConfirmDeleteAction={this.props.onDeleteConfirm}>
                    </EntityListActionButtons>
                </Col>
            </Row>
        </li >
    }

}

var expressionFontSizeStyle = {
    fontSize: 'small'
};