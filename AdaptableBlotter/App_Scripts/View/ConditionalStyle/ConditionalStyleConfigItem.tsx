import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, Button, Form, Col, Panel, Row, FormControl } from 'react-bootstrap';
import { ConditionalStyleScope, ColumnType } from '../../Core/Enums';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { EnumExtensions } from '../../Core/Extensions';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { ColorPicker } from '../ColorPicker';

interface ConditionalStyleConfigItemProps extends React.ClassAttributes<ConditionalStyleConfigItem> {
    ConditionalStyleCondition: IConditionalStyleCondition;
    Blotter: IAdaptableBlotter;
    Columns: IColumn[];
    onDelete: (ConditionalStyleCondition: IConditionalStyleCondition) => void;
    onEdit: (ConditionalStyleCondition: IConditionalStyleCondition) => void;
    onChangeColumn: (ConditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => void;
    onChangeColour: (ConditionalStyleCondition: IConditionalStyleCondition, backColor: string, foreColor: string) => void;
}

export class ConditionalStyleConfigItem extends React.Component<ConditionalStyleConfigItemProps, {}> {

    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>

                <Col md={3} >
                    {this.props.ConditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column ?
                        <FormControl componentClass="select" placeholder="select" value={this.props.Columns.find(f => f.ColumnId == this.props.ConditionalStyleCondition.ColumnId).ColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl> :
                        "Whole Row"
                    }
                </Col>

                <Col md={2} >
                    <ColorPicker value={this.props.ConditionalStyleCondition.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                </Col>
                <Col md={2} >
                    <ColorPicker value={this.props.ConditionalStyleCondition.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                </Col>
                <Col xs={4}>
                    {ExpressionHelper.ConvertExpressionToString(this.props.ConditionalStyleCondition.Expression, this.props.Columns, this.props.Blotter)}
                </Col>

                <Col md={2} >
                    <EntityListActionButtons
                        deleteClick={() => this.props.onDelete(this.props.ConditionalStyleCondition)}
                        editClick={() => this.props.onEdit(this.props.ConditionalStyleCondition)}>
                    </EntityListActionButtons>
                </Col>
            </Row>
        </li>
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColumn(this.props.ConditionalStyleCondition, e.value);
    }

    private onBackColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColour(this.props.ConditionalStyleCondition, e.value, this.props.ConditionalStyleCondition.ForeColor);
    }

    private onForeColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColour(this.props.ConditionalStyleCondition, this.props.ConditionalStyleCondition.BackColor, e.value);
    }

}

