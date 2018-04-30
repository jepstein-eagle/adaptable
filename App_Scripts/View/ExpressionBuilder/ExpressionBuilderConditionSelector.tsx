import * as React from "react";
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ExpressionBuilderUserFilter } from './ExpressionBuilderUserFilter'
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges'
import { Well, FormGroup, ControlLabel, Row, Col, HelpBlock, Tabs, Tab, Panel, NavItem, Nav } from 'react-bootstrap';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';
import { DataType, ExpressionMode, DistinctCriteriaPairValue, SelectionMode, QueryBuildStatus } from '../../Core/Enums'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { IRawValueDisplayValuePair } from "../UIInterfaces";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { ButtonCondition } from "../Components/Buttons/ButtonCondition";
import { IUserFilter, IRange } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { Expression } from "../../Core/Api/Expression";

export interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>
    Expression: Expression
    ExpressionMode: ExpressionMode
    onExpressionChange: (Expression: Expression) => void
    onSelectedColumnChange: (ColumnId: string) => void
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    UserFilters: IUserFilter[]
    SystemFilters: string[]
    SelectedColumnId: string
    QueryBuildStatus: QueryBuildStatus
    cssClassName: string

}

export interface ExpressionBuilderConditionSelectorState {
    ColumnValues: Array<any>
    SelectedColumnValues: Array<any>
    AllFilterExpresions: Array<string>
    SelectedFilterExpressions: Array<string>
    SelectedColumnRanges: Array<IRange>
    QueryBuildStatus: QueryBuildStatus
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
        if (StringExtensions.IsNullOrEmpty(theProps.SelectedColumnId)) {
            return {
                ColumnValues: [],
                SelectedColumnValues: [],
                AllFilterExpresions: [],
                SelectedFilterExpressions: [],
                SelectedColumnRanges: [],
                QueryBuildStatus: this.props.QueryBuildStatus
            };
        }
        else {
            let selectedColumnValues: Array<any>
            let selectedColumnFilterExpressions: Array<string>
            let selectedColumnRanges: Array<IRange>

            // get column values
            let keyValuePair = theProps.Expression.DisplayValueExpressions.find(x => x.ColumnId == theProps.SelectedColumnId)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.DisplayValues
            }
            else {
                selectedColumnValues = []
            }

            // get  filter expressions
            let filterExpressions = theProps.Expression.FilterExpressions.find(x => x.ColumnId == theProps.SelectedColumnId)
            selectedColumnFilterExpressions = []
            if (filterExpressions) {
                filterExpressions.Filters.forEach((fe: string) => {
                    // if its a userfilter add it to that list
                    let userFilter: IUserFilter = this.props.UserFilters.find(uf => uf.Name == fe);
                    if (userFilter) {
                        selectedColumnFilterExpressions.push(fe);
                    }
                    // if it is a system filter add it ot that list
                    let selectedSystemFilter: string = this.props.SystemFilters.find(sf => sf == fe);
                    if (selectedSystemFilter) {
                        selectedColumnFilterExpressions.push(fe);
                    }
                })
            }
            let combinedFilterExpressions: string[] = this.props.UserFilters.map(f => f.Name).concat(...this.props.SystemFilters.map(sf => sf));

            // get ranges
            let ranges = theProps.Expression.RangeExpressions.find(x => x.ColumnId == theProps.SelectedColumnId)
            selectedColumnRanges = (ranges) ? ranges.Ranges : []

            return {
                ColumnValues: this.props.getColumnValueDisplayValuePairDistinctList(theProps.SelectedColumnId, DistinctCriteriaPairValue.DisplayValue),
                SelectedColumnValues: selectedColumnValues,
                AllFilterExpresions: combinedFilterExpressions,
                SelectedFilterExpressions: selectedColumnFilterExpressions,
                SelectedColumnRanges: selectedColumnRanges,
                QueryBuildStatus: this.props.QueryBuildStatus
            };
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__conditionselector"
        let column = (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnId)) ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId)
        let selectedColumnDataType: DataType = column ? column.DataType : null
        let selectedColumn: IColumn = column;
        let selectedColumnFriendlyName: string = (selectedColumn) ? selectedColumn.FriendlyName : ""

        // get filter names
        // first system ones
        let availableFilterNames: string[] = []
        FilterHelper.GetSystemFiltersForColumn(selectedColumn, this.props.SystemFilters).forEach((sf: string) => {
            availableFilterNames.push(sf)
        })
        FilterHelper.GetUserFiltersForColumn(selectedColumn, this.props.UserFilters).forEach((uf: IUserFilter) => {
            availableFilterNames.push(uf.Name)
        })


        // get the help descriptions
        let firstTimeText: string = "Start creating the query by selecting a column below."

        let secondTimeText: string = "Select another column for the query."


        let selectedColumnText: string = "Build the Query: Use the tabs below to add column values, filters or ranges for this column as required."
        if (this.props.ExpressionMode == ExpressionMode.SingleColumn) {
            selectedColumnText += "This Query can only contain one Query Condition."
        }

        let panelHeader: string = (this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn) ? "Select a Column" : "Column: " + selectedColumnFriendlyName;

        return <PanelWithButton cssClassName={cssClassName} headerText={panelHeader} bsStyle="info" style={{ height: '427px' }}>


            {this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn || this.state.QueryBuildStatus == QueryBuildStatus.SelectFurtherColumn ?
                <div>
                    {this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn ?
                        <Well bsSize="small">
                            <HelpBlock>
                                {firstTimeText}
                            </HelpBlock>
                        </Well>
                        :
                        <Well bsSize="small">
                            <HelpBlock>
                                {secondTimeText}
                            </HelpBlock>
                        </Well>
                    }

                    <ColumnSelector  cssClassName={cssClassName} SelectedColumnIds={[this.props.SelectedColumnId]}
                        ColumnList={this.props.ColumnsList}
                        onColumnChange={columns => this.onColumnSelectChange(columns)}
                        SelectionMode={SelectionMode.Single} />
                </div>

                :
                <div>
                    {selectedColumn &&
                        <Tab.Container id="left-tabs-example" defaultActiveKey="columnValues">
                            <div>
                                <Nav bsStyle="pills" >
                                    <NavItem eventKey="columnValues" selected={true}>Column Values</NavItem>
                                    <NavItem eventKey="filters">Filters</NavItem>
                                    <NavItem eventKey="ranges">Ranges</NavItem>
                                </Nav>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey="columnValues">
                                        {selectedColumn.DataType != DataType.Boolean &&
                                            <ExpressionBuilderColumnValues
                                                cssClassName={cssClassName}
                                                ColumnValues={this.state.ColumnValues}
                                                SelectedValues={this.state.SelectedColumnValues}
                                                onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}>
                                            </ExpressionBuilderColumnValues>

                                        }
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="filters">
                                        <ExpressionBuilderUserFilter
                                            cssClassName={cssClassName}
                                            AvailableFilterNames={availableFilterNames}
                                            SelectedFilterNames={this.state.SelectedFilterExpressions}
                                            onFilterNameChange={(selectedValues) => this.onSelectedFiltersChanged(selectedValues)} >
                                        </ExpressionBuilderUserFilter>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="ranges">
                                        <ExpressionBuilderRanges
                                            cssClassName={cssClassName}
                                            SelectedColumn={selectedColumn}
                                            Ranges={this.state.SelectedColumnRanges}
                                            Columns={this.props.ColumnsList}
                                            onRangesChange={(ranges) => this.onSelectedColumnRangesChange(ranges)} >
                                        </ExpressionBuilderRanges>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
                    }
                </div>
            }
        </PanelWithButton>
    }



    onSelectedColumnChanged() {
        this.props.onSelectedColumnChange("")
    }

    onSelectedColumnRangesChange(selectedRanges: Array<IRange>) {

        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colRangesExpression = this.props.Expression.RangeExpressions
        let rangesCol = colRangesExpression.find(x => x.ColumnId == this.props.SelectedColumnId)
        if (rangesCol) {
            if (selectedRanges.length == 0) {
                let keyValuePairIndex = colRangesExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId)
                colRangesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                rangesCol.Ranges = selectedRanges
            }
        }
        else {
            colRangesExpression.push({ ColumnId: this.props.SelectedColumnId, Ranges: selectedRanges })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { RangeExpressions: colRangesExpression }))
        this.setState({ SelectedColumnRanges: selectedRanges } as ExpressionBuilderConditionSelectorState)
    }

    onSelectedColumnValuesChange(selectedColumnValues: Array<any>) {
        let colValuesExpression = this.props.Expression.DisplayValueExpressions
        let valuesCol = colValuesExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
        if (valuesCol) {
            if (selectedColumnValues.length == 0) {
                let keyValuePairIndex = colValuesExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId)
                colValuesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                valuesCol.DisplayValues = selectedColumnValues
            }
        }
        else {
            colValuesExpression.push({ ColumnId: this.props.SelectedColumnId, DisplayValues: selectedColumnValues })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { DisplayValueExpressions: colValuesExpression }))
        this.setState({ SelectedColumnValues: selectedColumnValues } as ExpressionBuilderConditionSelectorState)
    }

    onSelectedFiltersChanged(selectedFilters: Array<string>) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colUserFilterExpression = this.props.Expression.FilterExpressions
        let userFilterExpressionCol = colUserFilterExpression.find(x => x.ColumnId == this.props.SelectedColumnId)
        if (userFilterExpressionCol) {
            if (selectedFilters.length == 0) {
                let keyValuePairIndex = colUserFilterExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId)
                colUserFilterExpression.splice(keyValuePairIndex, 1)
            }
            else {
                userFilterExpressionCol.Filters = selectedFilters
            }
        }
        else {
            colUserFilterExpression.push({ ColumnId: this.props.SelectedColumnId, Filters: selectedFilters })
        }

        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { FilterExpressions: colUserFilterExpression }))
        this.setState({ SelectedFilterExpressions: selectedFilters } as ExpressionBuilderConditionSelectorState)
    }

    private onColumnSelectChange(columns: IColumn[]) {
        this.props.onSelectedColumnChange(columns.length > 0 ? columns[0].ColumnId : "")
    }


}

