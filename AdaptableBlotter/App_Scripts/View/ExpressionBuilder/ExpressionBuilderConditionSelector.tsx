/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IRangeExpression, IUserFilter } from '../../Core/Interface/IExpression'
import { PanelWithButton } from '../PanelWithButton'
import { IColumn, IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ExpressionBuilderUserFilter } from './ExpressionBuilderUserFilter'
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges'
import { Well, ListGroupItem, ListGroup, Panel, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterHelper } from '../../Core/Services/UserFilterHelper';
import { ColumnType, ExpressionMode, SortOrder, DistinctCriteriaPairValue } from '../../Core/Enums'
import { Helper } from '../../Core/Helper'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>
    Expression: Expression
    ExpressionMode: ExpressionMode
    onExpressionChange: (Expression: Expression) => void
    onSelectedColumnChange: (ColumnName: string) => void
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    UserFilters: IUserFilter[]
    SelectedColumnId: string
}

interface ExpressionBuilderConditionSelectorState {
    IsFirstTime: boolean
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

    componentWillReceiveProps(nextProps: ExpressionBuilderConditionSelectorProps, nextContext: any) {
        this.setState(this.buildState(nextProps))
    }

    private buildState(theProps: ExpressionBuilderConditionSelectorProps): ExpressionBuilderConditionSelectorState {
        if (theProps.SelectedColumnId == "select") {
            return {
                ColumnValues: [],
                SelectedColumnValues: [],
                UserFilterExpresions: [],
                SelectedUserFilterExpresions: [],
                SelectedColumnRanges: [],
                IsFirstTime: theProps.SelectedColumnId == "select"
                && ExpressionHelper.IsExpressionEmpty(theProps.Expression)
                && (this.state ? this.state.IsFirstTime : true)
            };
        }
        else {
            let selectedColumnValues: Array<any>
            let selectedColumnUserFilterExpressions: Array<string>
            let selectedColumnRanges: Array<IRangeExpression>

            // get column values
            let keyValuePair = theProps.Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.ColumnValues
            }
            else {
                selectedColumnValues = []
            }

            // get user filter expressions
            let userFilterExpressions = theProps.Expression.UserFilters.find(x => x.ColumnName == theProps.SelectedColumnId)
            if (userFilterExpressions) {
                selectedColumnUserFilterExpressions = userFilterExpressions.UserFilterUids;
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
                ColumnValues: this.props.getColumnValueDisplayValuePairDistinctList(theProps.SelectedColumnId, DistinctCriteriaPairValue.DisplayValue),
                SelectedColumnValues: selectedColumnValues,
                UserFilterExpresions: this.props.UserFilters.map(f => f.Uid),
                SelectedUserFilterExpresions: selectedColumnUserFilterExpressions,
                SelectedColumnRanges: selectedColumnRanges,
                IsFirstTime: theProps.SelectedColumnId == "select"
                && ExpressionHelper.IsExpressionEmpty(theProps.Expression)
                && (this.state ? this.state.IsFirstTime : true)
            };
        }
    }

    render() {

        let sortedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.ColumnsList, "FriendlyName")
        let optionColumns = sortedColumns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        let selectedColumnType: ColumnType = (this.props.SelectedColumnId == "select") ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId).ColumnType;
        let selectedColumn: IColumn = (this.props.SelectedColumnId == "select") ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId);
        let availableExpressionIds: string[] = this.state.UserFilterExpresions.filter(f => UserFilterHelper.ShowUserFilterForColumn(this.props.UserFilters, f, selectedColumn));

        let hasConditions: boolean = this.state.SelectedColumnRanges.length > 0 || this.state.SelectedColumnValues.length > 0 || this.state.SelectedUserFilterExpresions.length > 0;
        let addConditionButtonDisabled: boolean = !this.state.IsFirstTime && !hasConditions || (this.props.ExpressionMode == ExpressionMode.SingleColumn && !ExpressionHelper.IsExpressionEmpty(this.props.Expression));
        let columnDropdownDisabled: boolean = (this.props.ExpressionMode == ExpressionMode.SingleColumn && this.props.SelectedColumnId != "select") || !addConditionButtonDisabled;

        return <PanelWithButton headerText="Build Expression"
            buttonClick={() => this.onSelectedColumnChanged()} buttonDisabled={addConditionButtonDisabled}
            buttonContent={"Add Condition"} buttonStyle="info" bsStyle="primary" style={{ height: '575px' }}>
            <AdaptableBlotterForm horizontal>
                {this.state.IsFirstTime ?
                    <Well bsSize="small">Click 'Add Condition' button to start adding Column Conditions for the Expression.
                    <p />A Column Condition consists of <br />   (i) a Column and <br />   (ii) as many Criteria for that Column as you wish to create. <p />
                        <p />Criteria can include a mix of column values, column filters or ranges.<p />
                        {this.props.ExpressionMode == ExpressionMode.SingleColumn ?
                            "This Expression can only contain one Column Condition." : "The Expression can contain multiple Column Conditions."}
                    </Well>
                    :
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
                }
            </AdaptableBlotterForm>

            {this.props.SelectedColumnId == "select" ? null :

                <div >
                    <AdaptableBlotterForm horizontal>
                        <FormGroup controlId="formInlineCriteria">
                            <Col xs={3}>
                                <ControlLabel>Step 2: Create Criteria</ControlLabel>
                            </Col>
                        </FormGroup>
                    </AdaptableBlotterForm>
                    <Row >
                        <Col xs={4}>
                            <ExpressionBuilderColumnValues
                                ColumnValues={this.state.ColumnValues}
                                SelectedValues={this.state.SelectedColumnValues}
                                onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}>
                            </ExpressionBuilderColumnValues>
                        </Col>
                        <Col xs={4}>
                            <ExpressionBuilderUserFilter
                                UserFilterExpressions={UserFilterHelper.GetUserFilters(this.props.UserFilters, availableExpressionIds)}
                                SelectedUserFilterExpressions={UserFilterHelper.GetUserFilters(this.props.UserFilters, this.state.SelectedUserFilterExpresions)}
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

    onSelectedColumnChanged() {
        this.setState({ IsFirstTime: false } as ExpressionBuilderConditionSelectorState, () => this.props.onSelectedColumnChange("select"))
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
        let colValuesExpression = this.props.Expression.ColumnDisplayValuesExpressions
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
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnDisplayValuesExpressions: colValuesExpression }))
        this.setState({ SelectedColumnValues: selectedColumnValues } as ExpressionBuilderConditionSelectorState)
    }

    onSelectedUserFilterExpressionsChange(selectedUserFilterExpressions: Array<IUserFilter>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let selectedUserFilterExpressionUids: string[] = selectedUserFilterExpressions.map(s => s.Uid);
        let colUserFilterExpression = this.props.Expression.UserFilters
        let userFilterExpressionCol = colUserFilterExpression.find(x => x.ColumnName == this.props.SelectedColumnId)
        if (userFilterExpressionCol) {
            if (selectedUserFilterExpressions.length == 0) {
                let keyValuePairIndex = colUserFilterExpression.findIndex(x => x.ColumnName == this.props.SelectedColumnId)
                colUserFilterExpression.splice(keyValuePairIndex, 1)
            }
            else {
                userFilterExpressionCol.UserFilterUids = selectedUserFilterExpressionUids
            }
        }
        else {
            colUserFilterExpression.push({ ColumnName: this.props.SelectedColumnId, UserFilterUids: selectedUserFilterExpressionUids })
        }

        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { UserFilters: colUserFilterExpression }))
        this.setState({ SelectedUserFilterExpresions: selectedUserFilterExpressionUids } as ExpressionBuilderConditionSelectorState)
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSelectedColumnChange(e.value)
    }


}
