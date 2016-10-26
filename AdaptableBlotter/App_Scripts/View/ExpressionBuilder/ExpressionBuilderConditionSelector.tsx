/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IExpression } from '../../Core/Interface/IExpression'
import { SingleListBox } from '../SingleListBox'
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ListGroupItem, ListGroup, Panel, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { ExpressionString } from '../../Core/Expression/ExpressionString';

interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>
    Blotter: IAdaptableBlotter
    Expression: ExpressionString
    onExpressionChange: (Expression: ExpressionString) => void
}

interface ExpressionBuilderConditionSelectorState {
    SelectedColumnId: string
    ColumnValues: Array<any>
    SelectedColumnValues: Array<any>
}

export class ExpressionBuilderConditionSelector extends React.Component<ExpressionBuilderConditionSelectorProps, ExpressionBuilderConditionSelectorState> {
    constructor() {
        super();
        this.state = { SelectedColumnId: "select", ColumnValues: [], SelectedColumnValues: [] }
    }
    render() {
        let optionColumns = this.props.ColumnsList.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })
        return <Panel header="Build Expression" bsStyle="primary">
            <Form inline>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Step 1: Select Column</ControlLabel>
                    {' '}
                    <FormControl componentClass="select" placeholder="select" value={this.state.SelectedColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                        <option value="select" key="select">Select a column</option>
                        {optionColumns}
                    </FormControl>
                </FormGroup>
            </Form>
            {this.state.SelectedColumnId == "select" ? null :
                <div>
                    <Form inline>
                        <FormGroup controlId="formInlineCriteria">
                            <ControlLabel>Step 2: Create Criteria</ControlLabel>
                        </FormGroup>
                    </Form>
                    <Row>
                        <Col xs={4}>
                            <ExpressionBuilderColumnValues ColumnValues={this.state.ColumnValues}
                                SelectedValues={this.state.SelectedColumnValues}
                                onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)} >
                            </ExpressionBuilderColumnValues>
                        </Col>
                        <Col xs={4}>
                            <Panel header="Predefined Filters" >
                            </Panel>
                        </Col>
                        <Col xs={4}>
                            <Panel header="Ranges" >
                            </Panel>
                        </Col>
                    </Row>
                </div>}
        </Panel>
    }

    onSelectedColumnValuesChange(selectedValues: Array<any>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colValuesExpression = this.props.Expression.ColumnValuesExpression
        let keyValuePair = colValuesExpression.find(x => x.ColumnName == this.state.SelectedColumnId)
        if (keyValuePair) {
            keyValuePair.Values = selectedValues
        }
        else {
            colValuesExpression.push({ ColumnName: this.state.SelectedColumnId, Values: selectedValues })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnValuesExpression: colValuesExpression }))
        this.setState({SelectedColumnValues: selectedValues} as ExpressionBuilderConditionSelectorState)
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.value == "select") {
            this.setState({
                ColumnValues: [],
                SelectedColumnId: e.value,
                SelectedColumnValues: []
            });
        }
        else {
            let selectedColumnValues: Array<any>
            let keyValuePair = this.props.Expression.ColumnValuesExpression.find(x => x.ColumnName == e.value)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.Values
            }
            else {
                selectedColumnValues = []
            }
            this.setState({
                ColumnValues: Array.from(new Set(this.props.Blotter.getColumnValueString(e.value))),
                SelectedColumnId: e.value,
                SelectedColumnValues: selectedColumnValues
            });
        }
    }
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}