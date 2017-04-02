import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, Button, Form, Col, Panel, Row, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import { ConditionalStyleScope } from '../../Core/Enums';
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
    onChangeColumn: (ConditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => void;
    onChangeColour: (ConditionalStyleCondition: IConditionalStyleCondition, backColor: string, foreColor: string) => void;
}

export class ConditionalStyleConfigItem extends React.Component<ConditionalStyleConfigItemProps, {}> {

    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })
        let isDisabled = this.props.ConditionalStyleCondition.IsPredefined


        return <li
            className="list-group-item"
            onClick={() => { }}>
            <Row style={{ display: "flex", alignItems: "center" }}>

                <Col md={2} >
                    {this.props.ConditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column ?
                        <FormControl disabled={isDisabled} componentClass="select" placeholder="select" value={this.props.Columns.find(f => f.ColumnId == this.props.ConditionalStyleCondition.ColumnId).ColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl> :
                        "Whole Row"
                    }
                </Col>

                <Col md={2} >
                    <Checkbox onChange={(x) => this.onUseBackColourCheckChange(x)}
                        checked={this.props.ConditionalStyleCondition.Style.BackColor != undefined} >
                        {this.props.ConditionalStyleCondition.Style.BackColor != undefined &&
                            <ColorPicker disabled={isDisabled} value={this.props.ConditionalStyleCondition.Style.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                        }
                    </Checkbox>
                </Col>
                <Col md={2} >
                    <Checkbox onChange={(x) => this.onUseForeColourCheckChange(x)}
                        checked={this.props.ConditionalStyleCondition.Style.ForeColor != undefined} >
                        {this.props.ConditionalStyleCondition.Style.ForeColor != undefined &&
                            <ColorPicker disabled={isDisabled} value={this.props.ConditionalStyleCondition.Style.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                        }
                    </Checkbox>
                </Col>
                <Col xs={3}>
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
        </li>
    }

    private onUseBackColourCheckChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onChangeColour(this.props.ConditionalStyleCondition, "#ffffff", this.props.ConditionalStyleCondition.Style.ForeColor);
        } else {
            this.props.onChangeColour(this.props.ConditionalStyleCondition, undefined, this.props.ConditionalStyleCondition.Style.ForeColor);
        }
    }

    private onUseForeColourCheckChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onChangeColour(this.props.ConditionalStyleCondition, this.props.ConditionalStyleCondition.Style.BackColor, "#000000", );
        } else {
            this.props.onChangeColour(this.props.ConditionalStyleCondition,  this.props.ConditionalStyleCondition.Style.BackColor, undefined);
        }
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColumn(this.props.ConditionalStyleCondition, e.value);
    }

    private onBackColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColour(this.props.ConditionalStyleCondition, e.value, this.props.ConditionalStyleCondition.Style.ForeColor);
    }

    private onForeColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColour(this.props.ConditionalStyleCondition, this.props.ConditionalStyleCondition.Style.BackColor, e.value);
    }

}

var expressionFontSizeStyle = {
    fontSize: 'small'
};