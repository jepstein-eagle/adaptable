/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IRangeExpression, IUserFilterExpression } from '../../Core/Interface/IExpression'
import { PanelWithButton } from '../PanelWithButton'
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ExpressionBuilderUserFilter } from './ExpressionBuilderUserFilter'
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges'
import { ListGroupItem, ListGroup, Panel, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ColumnType, ExpressionMode } from '../../Core/Enums'


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
    UserFilterExpresions: Array<string>
    SelectedUserFilterExpresions: Array<string>
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
                UserFilterExpresions: [],
                SelectedUserFilterExpresions: [],
                SelectedColumnRanges: []
            };
        }
        else {
            let selectedColumnValues: Array<any>
            let selectedColumnUserFilterExpressions: Array<string>
            let selectedColumnRanges: Array<IRangeExpression>

            // get column values
            let keyValuePair = theProps.Expression.ColumnValuesExpressions.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.ColumnValues
            }
            else {
                selectedColumnValues = []
            }

            // get user filter expressions
            let userFilterExpressions = theProps.Expression.UserFilterExpressions.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (userFilterExpressions) {
                selectedColumnUserFilterExpressions = userFilterExpressions.Named;
            }
            else {
                selectedColumnUserFilterExpressions = []
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
                ColumnValues: theProps.Blotter.getColumnValueDisplayValuePairDistinctList(theProps.SelectedColumnId),
                SelectedColumnValues: selectedColumnValues,
                UserFilterExpresions: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters.map(f => f.Uid),
                SelectedUserFilterExpresions: selectedColumnUserFilterExpressions,
                SelectedColumnRanges: selectedColumnRanges
            };
        }
    }

    componentWillReceiveProps(nextProps: ExpressionBuilderConditionSelectorProps, nextContext: any) {
        this.setState(this.buildState(nextProps))
    }

    render() {
        let optionColumns = this.props.ColumnsList.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        let selectedColumnType: ColumnType = (this.props.SelectedColumnId == "select") ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId).ColumnType;
        let selectedColumn: IColumn = (this.props.SelectedColumnId == "select") ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId);
        let isFilteredColumn: boolean =   this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters.find(cf=>cf.ColumnId== this.props.SelectedColumnId)!=null;;
        let filteredWarning: string = (this.props.SelectedColumnId != "select" && isFilteredColumn) ? "Column is currently in a filter so only filtered values are shown" : "";

        let hasConditions: boolean = this.state.SelectedColumnRanges.length > 0 || this.state.SelectedColumnValues.length > 0 || this.state.SelectedUserFilterExpresions.length > 0;
        let availableExpressionIds: string[] = this.state.UserFilterExpresions.filter(f => ExpressionHelper.ShouldShowUserFilterExpressionForColumn(f, selectedColumn, this.props.Blotter));
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
                    <Col xs={3}>
                        <FormControl style={{ width: "Auto" }} componentClass="select" placeholder="select" value={this.props.SelectedColumnId} onChange={(x) => this.onColumnSelectChange(x)} disabled={columnDropdownDisabled} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl>
                    </Col>
                    <Col xs={6}>
                        <FormGroup controlId="formValidationSuccess3" validationState="error">
                            <ControlLabel >{filteredWarning}</ControlLabel>
                        </FormGroup>
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
                            <ExpressionBuilderUserFilter
                                UserFilterExpressions={ExpressionHelper.GetUserFilterExpressions(availableExpressionIds, this.props.Blotter)}
                                SelectedUserFilterExpressions={ExpressionHelper.GetUserFilterExpressions(this.state.SelectedUserFilterExpresions, this.props.Blotter)}
                                onUserFilterExpressionChange={(selectedValues) => this.onSelectedUserFilterExpressionsChange(selectedValues)} >
                            </ExpressionBuilderUserFilter>
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

    onSelectedUserFilterExpressionsChange(selectedUserFilterExpressions: Array<IUserFilterExpression>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let selectedUserFilterExpressionUids: string[] = selectedUserFilterExpressions.map(s => s.Uid);
        let colUserFilterExpression = this.props.Expression.UserFilterExpressions
        let userFilterExpressionCol = colUserFilterExpression.find(x => x.ColumnName == this.props.SelectedColumnId)
        if (userFilterExpressionCol) {
            if (selectedUserFilterExpressions.length == 0) {
                let keyValuePairIndex = colUserFilterExpression.findIndex(x => x.ColumnName == this.props.SelectedColumnId)
                colUserFilterExpression.splice(keyValuePairIndex, 1)
            }
            else {
                userFilterExpressionCol.Named = selectedUserFilterExpressionUids
            }
        }
        else {
            colUserFilterExpression.push({ ColumnName: this.props.SelectedColumnId, Named: selectedUserFilterExpressionUids })
        }

        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { UserFilterExpressions: colUserFilterExpression }))
        this.setState({ SelectedUserFilterExpresions: selectedUserFilterExpressionUids } as ExpressionBuilderConditionSelectorState)
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
