import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, Checkbox, FormControl, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { ConditionalStyleScope, ColumnType, ConditionalStyleColour } from '../../Core/Enums';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { EnumEx } from '../../Core/Helper';

interface ConditionalStyleConfigItemProps extends React.ClassAttributes<ConditionalStyleConfigItem> {
    ConditionalStyleCondition: IConditionalStyleCondition;
    Columns: IColumn[];
    onDelete: (ConditionalStyleCondition: IConditionalStyleCondition) => void;
    onEdit: (ConditionalStyleCondition: IConditionalStyleCondition) => void;
    onChangeColumn: (ConditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => void;
    onChangeColour: (ConditionalStyleCondition: IConditionalStyleCondition, newColour: ConditionalStyleColour) => void;
}

export class ConditionalStyleConfigItem extends React.Component<ConditionalStyleConfigItemProps, {}> {

    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })

        let optionColours =  EnumEx.getNamesAndValues(ConditionalStyleColour).map((conditionalStyleColourNameAndValue: any) => {
                                return <option key={conditionalStyleColourNameAndValue.value} value={conditionalStyleColourNameAndValue.value}>{conditionalStyleColourNameAndValue.name}</option>
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

                <Col md={3} >
                    <FormControl componentClass="select" placeholder="select" value={this.props.ConditionalStyleCondition.ConditionalStyleColour.toString()} onChange={(x) => this.onColourSelectChange(x)} >
                             <option value="select" key="select">Select a colour</option>
                            {optionColours}                           
                    </FormControl>
                </Col>

                <Col xs={4}>
                    {ExpressionHelper.ConvertExpressionToString(this.props.ConditionalStyleCondition.Expression, this.props.Columns)}
                </Col>

                <Col md={1} >
                    <ButtonToolbar>
                        <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Edit</Tooltip>}>
                            <Button onClick={() => this.props.onEdit(this.props.ConditionalStyleCondition)}><Glyphicon glyph="edit" /></Button>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </Col>
                <Col md={1} >
                    <ButtonToolbar>
                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                            <Button onClick={() => this.props.onDelete(this.props.ConditionalStyleCondition)}><Glyphicon glyph="trash" /></Button>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </Col>
            </Row>
        </li>
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColumn(this.props.ConditionalStyleCondition, e.value);
    }

    private onColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeColour(this.props.ConditionalStyleCondition, Number.parseInt(e.value));
    }

}

interface ConditionalStyleConfigHeaderProps extends React.ClassAttributes<ConditionalStyleConfigHeader> {
}

export class ConditionalStyleConfigHeader extends React.Component<ConditionalStyleConfigHeaderProps, {}> {
    render(): any {
        return <Panel style={panelHeaderStyle} >
            <Row >
                <Col md={3} style={headerStyle}>Where Applied</Col>
                <Col md={3} style={headerStyle}>Style</Col>
                <Col md={4} style={headerStyle}>Expression</Col>
            </Row>
        </Panel>
    }
}

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}
