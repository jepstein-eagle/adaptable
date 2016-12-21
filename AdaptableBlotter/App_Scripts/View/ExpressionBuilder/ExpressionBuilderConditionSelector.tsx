/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IExpressionRange } from '../../Core/Interface/IExpression'
import { PanelWithButton } from '../PanelWithButton'
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges'
import { ListGroupItem, ListGroup, Panel, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Button } from 'react-bootstrap';
import { Expression } from '../../Core/Expression/Expression';
import { ColumnType } from '../../Core/Enums'

interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>
    Blotter: IAdaptableBlotter
    Expression: Expression
    onExpressionChange: (Expression: Expression) => void
    onSelectedColumnChange: (ColumnName: string) => void
    SelectedColumnId: string
}

interface ExpressionBuilderConditionSelectorState {
    ColumnValues: Array<any>
    SelectedColumnValues: Array<any>
    SelectedColumnRanges: Array<IExpressionRange>
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
                SelectedColumnValues: [],
                SelectedColumnRanges: []
            };
        }
        else {
            let selectedColumnValues: Array<any>
            let selectedColumnRanges: Array<IExpressionRange>
            let keyValuePair = theProps.Expression.ColumnValuesExpression.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.Values
            }
            else {
                selectedColumnValues = []
            }
            let ranges = theProps.Expression.RangeExpression.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (ranges) {
                selectedColumnRanges = ranges.Ranges
            }
            else {
                selectedColumnRanges = []
            }
            return {
                ColumnValues: Array.from(new Set(theProps.Blotter.getColumnValueString(theProps.SelectedColumnId))),
                SelectedColumnValues: selectedColumnValues,
                SelectedColumnRanges: selectedColumnRanges
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

        let selectedColumnType: ColumnType = (this.props.SelectedColumnId == "select"  )? null: this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId).ColumnType;

        return <PanelWithButton headerText="Build Expression"
            buttonClick={() => this.props.onSelectedColumnChange("select")}
            buttonContent={"Add Condition"} bsStyle="primary" style={{ height: '575px' }}>
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
                        <Col xs={5}>
                            <ExpressionBuilderColumnValues ColumnValues={this.state.ColumnValues}
                                SelectedValues={this.state.SelectedColumnValues}
                                onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}
                                ColumnValuesDataType={selectedColumnType} >
                            </ExpressionBuilderColumnValues>
                        </Col>
                        <Col xs={7}>
                            <ExpressionBuilderRanges ColumnType={selectedColumnType}
                                Ranges={this.state.SelectedColumnRanges} onRangesChange={(ranges) => this.onSelectedColumnRangesChange(ranges)} >
                            </ExpressionBuilderRanges>
                        </Col>
                    </Row>
                </div>}
        </PanelWithButton>
    }
    onSelectedColumnRangesChange(newRanges: Array<IExpressionRange>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colRangesExpression = this.props.Expression.RangeExpression
        let rangesCol = colRangesExpression.find(x => x.ColumnName == this.props.SelectedColumnId)
        if (rangesCol) {
            if (newRanges.length == 0) {
                let keyValuePairIndex = colRangesExpression.findIndex(x => x.ColumnName == this.props.SelectedColumnId)
                colRangesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                rangesCol.Ranges = newRanges
            }
        }
        else {
            colRangesExpression.push({ ColumnName: this.props.SelectedColumnId, Ranges: newRanges })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { RangeExpression: colRangesExpression }))
        this.setState({ SelectedColumnRanges: newRanges } as ExpressionBuilderConditionSelectorState)
    }

    onSelectedColumnValuesChange(selectedValues: Array<any>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colValuesExpression = this.props.Expression.ColumnValuesExpression
        let keyValuePair = colValuesExpression.find(x => x.ColumnName == this.props.SelectedColumnId)
        if (keyValuePair) {
            if (selectedValues.length == 0) {
                let keyValuePairIndex = colValuesExpression.findIndex(x => x.ColumnName == this.props.SelectedColumnId)
                colValuesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                keyValuePair.Values = selectedValues
            }
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