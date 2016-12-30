/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IRangeExpression, INamedExpression } from '../../Core/Interface/IExpression'
import { PanelWithButton } from '../PanelWithButton'
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ExpressionBuilderNamed } from './ExpressionBuilderNamed'
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges'
import { ListGroupItem, ListGroup, Panel, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Button } from 'react-bootstrap';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ColumnType, ExpressionMode } from '../../Core/Enums'
import { FilterState } from '../../Redux/ActionsReducers/Interface/IState';


interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>
    Blotter: IAdaptableBlotter
    Expression: Expression
    ExpressionMode: ExpressionMode
    onExpressionChange: (Expression: Expression) => void
    onSelectedColumnChange: (ColumnName: string) => void
    SelectedColumnId: string
}

interface ExpressionBuilderConditionSelectorState {
    ColumnValues: Array<any>
    SelectedColumnValues: Array<any>
    NamedExpressions: Array<string>
    SelectedNamedExpresions: Array<string>
    SelectedColumnRanges: Array<IRangeExpression>
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
                NamedExpressions: [],
                SelectedNamedExpresions: [],
                SelectedColumnRanges: []
            };
        }
        else {
            let selectedColumnValues: Array<any>
            let selectedColumnNamedExpressions: Array<string>
            let selectedColumnRanges: Array<IRangeExpression>

            // get column values
            let keyValuePair = theProps.Expression.ColumnValuesExpressions.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.ColumnValues
            }
            else {
                selectedColumnValues = []
            }

            // get named expressions
            let namedExpressions = theProps.Expression.NamedExpressions.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (namedExpressions) {
                selectedColumnNamedExpressions = namedExpressions.Named;
            }
            else {
                selectedColumnNamedExpressions = []
            }

            // get ranges
            let ranges = theProps.Expression.RangeExpressions.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (ranges) {
                selectedColumnRanges = ranges.Ranges
            }
            else {
                selectedColumnRanges = []
            }
            return {
                ColumnValues: Array.from(new Set(theProps.Blotter.getColumnValueString(theProps.SelectedColumnId))),
                SelectedColumnValues: selectedColumnValues,
                NamedExpressions: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Filter.Filters.map(f => f.Uid),
                SelectedNamedExpresions: selectedColumnNamedExpressions,
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

        let selectedColumnType: ColumnType = (this.props.SelectedColumnId == "select") ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId).ColumnType;
        let selectedColumn: IColumn = (this.props.SelectedColumnId == "select") ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId);

        let hasConditions: boolean = this.state.SelectedColumnRanges.length > 0 || this.state.SelectedColumnValues.length > 0 || this.state.SelectedNamedExpresions.length > 0;
        let availableExpressionIds: string[] = this.state.NamedExpressions.filter(f => ExpressionHelper.ShouldShowNamedExpressionForColumn(f, selectedColumn, this.props.Blotter));
        let addConditionButtonDisabled: boolean = (this.props.ExpressionMode == ExpressionMode.SingleColumn) || (this.props.SelectedColumnId == "select") || (!hasConditions);
        let columnDropdownDisabled: boolean = (this.props.ExpressionMode == ExpressionMode.SingleColumn && this.props.SelectedColumnId != "select") || !addConditionButtonDisabled;

        return <PanelWithButton headerText="Build Expression"
            buttonClick={() => this.props.onSelectedColumnChange("select")} buttonDisabled={addConditionButtonDisabled}
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
                        <FormControl style={{ width: "Auto" }} componentClass="select" placeholder="select" value={this.props.SelectedColumnId} onChange={(x) => this.onColumnSelectChange(x)} disabled={columnDropdownDisabled} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl>
                    </Col>
                </FormGroup>
            </Form>
            {this.props.SelectedColumnId == "select" ? null :


                <div >
                    <Form horizontal>
                        <FormGroup controlId="formInlineCriteria">
                            <Col xs={3}>
                                <ControlLabel>Step 2: Create Criteria</ControlLabel>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Row >
                        <Col xs={4}>
                            <ExpressionBuilderColumnValues
                                ColumnValues={this.state.ColumnValues}
                                SelectedValues={this.state.SelectedColumnValues}
                                onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}
                                ColumnValuesDataType={selectedColumnType} >
                            </ExpressionBuilderColumnValues>
                        </Col>
                        <Col xs={4}>
                            <ExpressionBuilderNamed
                                NamedExpressions={ExpressionHelper.GetNamedExpressions(availableExpressionIds, this.props.Blotter)}
                                SelectedNamedExpressions={ExpressionHelper.GetNamedExpressions(this.state.SelectedNamedExpresions, this.props.Blotter)}
                                onNamedExpressionChange={(selectedValues) => this.onSelectedNamedExpressionsChange(selectedValues)} >
                            </ExpressionBuilderNamed>
                        </Col>
                        <Col xs={4}>
                            <ExpressionBuilderRanges
                                ColumnType={selectedColumnType}
                                Ranges={this.state.SelectedColumnRanges}
                                onRangesChange={(ranges) => this.onSelectedColumnRangesChange(ranges)} >
                            </ExpressionBuilderRanges>
                        </Col>
                    </Row>
                </div>}
        </PanelWithButton>
    }
    onSelectedColumnRangesChange(selectedRanges: Array<IRangeExpression>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colRangesExpression = this.props.Expression.RangeExpressions
        let rangesCol = colRangesExpression.find(x => x.ColumnName == this.props.SelectedColumnId)
        if (rangesCol) {
            if (selectedRanges.length == 0) {
                let keyValuePairIndex = colRangesExpression.findIndex(x => x.ColumnName == this.props.SelectedColumnId)
                colRangesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                rangesCol.Ranges = selectedRanges
            }
        }
        else {
            colRangesExpression.push({ ColumnName: this.props.SelectedColumnId, Ranges: selectedRanges })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { RangeExpressions: colRangesExpression }))
        this.setState({ SelectedColumnRanges: selectedRanges } as ExpressionBuilderConditionSelectorState)
    }

    onSelectedColumnValuesChange(selectedColumnValues: Array<any>) {
        let colValuesExpression = this.props.Expression.ColumnValuesExpressions
        let valuesCol = colValuesExpression.find(x => x.ColumnName == this.props.SelectedColumnId);
        if (valuesCol) {
            if (selectedColumnValues.length == 0) {
                let keyValuePairIndex = colValuesExpression.findIndex(x => x.ColumnName == this.props.SelectedColumnId)
                colValuesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                valuesCol.ColumnValues = selectedColumnValues
            }
        }
        else {
            colValuesExpression.push({ ColumnName: this.props.SelectedColumnId, ColumnValues: selectedColumnValues })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnValuesExpressions: colValuesExpression }))
        this.setState({ SelectedColumnValues: selectedColumnValues } as ExpressionBuilderConditionSelectorState)
    }

    onSelectedNamedExpressionsChange(selectedNamedExpressions: Array<INamedExpression>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let selectedNameExpressionUids: string[] = selectedNamedExpressions.map(s => s.Uid);
        let colNamedExpression = this.props.Expression.NamedExpressions
        let namedExpressionCol = colNamedExpression.find(x => x.ColumnName == this.props.SelectedColumnId)
        if (namedExpressionCol) {
            if (selectedNamedExpressions.length == 0) {
                let keyValuePairIndex = colNamedExpression.findIndex(x => x.ColumnName == this.props.SelectedColumnId)
                colNamedExpression.splice(keyValuePairIndex, 1)
            }
            else {
                namedExpressionCol.Named = selectedNameExpressionUids
            }
        }
        else {
            colNamedExpression.push({ ColumnName: this.props.SelectedColumnId, Named: selectedNameExpressionUids })
        }

        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { NamedExpressions: colNamedExpression }))
        this.setState({ SelectedNamedExpresions: selectedNameExpressionUids } as ExpressionBuilderConditionSelectorState)
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
