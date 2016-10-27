/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IExpression } from '../../Core/Interface/IExpression'
import { SingleListBox } from '../SingleListBox'
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ListGroupItem, ListGroup, Panel, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col,Button } from 'react-bootstrap';
import { ExpressionString } from '../../Core/Expression/ExpressionString';

interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>
    Blotter: IAdaptableBlotter
    Expression: ExpressionString
    onExpressionChange: (Expression: ExpressionString) => void
    onSelectedColumnChange: (ColumnName: string) => void
    SelectedColumnId: string
}

interface ExpressionBuilderConditionSelectorState {
    ColumnValues: Array<any>
    SelectedColumnValues: Array<any>
}

export class ExpressionBuilderConditionSelector extends React.Component<ExpressionBuilderConditionSelectorProps, ExpressionBuilderConditionSelectorState> {
    constructor(props: ExpressionBuilderConditionSelectorProps) {
        super(props);
        this.state = this.buildState(this.props)
    }
    private buildState(theProps: ExpressionBuilderConditionSelectorProps): ExpressionBuilderConditionSelectorState {
        if (theProps.SelectedColumnId == "select") {
            return {
                ColumnValues: [],
                SelectedColumnValues: []
            };
        }
        else {
            let selectedColumnValues: Array<any>
            let keyValuePair = theProps.Expression.ColumnValuesExpression.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.Values
            }
            else {
                selectedColumnValues = []
            }
            return {
                ColumnValues: Array.from(new Set(theProps.Blotter.getColumnValueString(theProps.SelectedColumnId))),
                SelectedColumnValues: selectedColumnValues
            };
        }
    }
    componentWillReceiveProps(nextProps: ExpressionBuilderConditionSelectorProps, nextContext: any) {
        this.setState(this.buildState(nextProps))
    }

    render() {
        let optionColumns = this.props.ColumnsList.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })
        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                <Col xs={7}>Build Expression</Col>
                <Col xs={5}>
                    <Button onClick={() => this.props.onSelectedColumnChange("select")} style={{float: 'right'}}>
                        Add Condition
                    </Button>
                </Col>
            </Row>
        </Form>;
        return <Panel header={header} bsStyle="primary" style={{ height: '575px' }}>
            <Form horizontal>
                <FormGroup controlId="formInlineName">
                    <Col xs={3}>
                        {this.props.SelectedColumnId == "select" ?
                            <ControlLabel>Step 1: Select Column</ControlLabel> :
                            <div style={{ paddingTop: '7px' }}>Step 1: Select Column</div>
                        }
                    </Col>
                    <Col xs={9}>
                        <FormControl style={{ width: "Auto" }} componentClass="select" placeholder="select" value={this.props.SelectedColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl>
                    </Col>
                </FormGroup>
            </Form>
            {this.props.SelectedColumnId == "select" ? null :
                <div>
                    <Form horizontal>
                        <FormGroup controlId="formInlineCriteria">
                            <Col xs={3}>
                                <ControlLabel>Step 2: Create Criteria</ControlLabel>
                            </Col>
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
        let keyValuePair = colValuesExpression.find(x => x.ColumnName == this.props.SelectedColumnId)
        if (keyValuePair) {
            keyValuePair.Values = selectedValues
        }
        else {
            colValuesExpression.push({ ColumnName: this.props.SelectedColumnId, Values: selectedValues })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnValuesExpression: colValuesExpression }))
        this.setState({ SelectedColumnValues: selectedValues } as ExpressionBuilderConditionSelectorState)
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSelectedColumnChange(e.value)
    }
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}