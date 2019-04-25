import * as React from "react";
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ExpressionBuilderUserFilter } from './ExpressionBuilderUserFilter'
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges'
import {  HelpBlock, Tab, NavItem, Nav } from 'react-bootstrap';
import { FilterHelper } from '../../Utilities/Helpers/FilterHelper';
import { DataType, ExpressionMode, DistinctCriteriaPairValue, SelectionMode, QueryBuildStatus, QueryTab, SortOrder } from '../../Utilities/Enums'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import { IRawValueDisplayValuePair } from "../UIInterfaces";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IRange } from "../../Utilities/Interface/Expression/IRange";
import { Expression } from "../../Utilities/Expression";
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { Helper } from "../../Utilities/Helpers/Helper";
import { Waiting } from "../Components/FilterForm/Waiting";
import { IAdaptableBlotter } from "../../Utilities/Interface/IAdaptableBlotter";

export interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>
    Expression: Expression
    ExpressionMode: ExpressionMode
    onExpressionChange: (Expression: Expression) => void
    onSelectedColumnChange: (ColumnId: string, Tab: QueryTab) => void
    UserFilters: IUserFilter[]
    SystemFilters: string[]
    SelectedColumnId: string
    SelectedTab: QueryTab
    QueryBuildStatus: QueryBuildStatus
    cssClassName: string
    Blotter: IAdaptableBlotter
}

export interface ExpressionBuilderConditionSelectorState {
    SelectedColumnId: string
    ColumnRawValueDisplayValuePairs: IRawValueDisplayValuePair[]
    SelectedColumnDisplayValues: Array<any>
    AllFilterExpresions: Array<string>
    SelectedFilterExpressions: Array<string>
    SelectedColumnRanges: Array<IRange>
    QueryBuildStatus: QueryBuildStatus
    ShowWaitingMessage: boolean
    SelectedTab: QueryTab
}

export class ExpressionBuilderConditionSelector extends React.Component<ExpressionBuilderConditionSelectorProps, ExpressionBuilderConditionSelectorState> {


    constructor(props: ExpressionBuilderConditionSelectorProps) {
        super(props);
        this.state = this.buildState(this.props)
    }

    componentWillReceiveProps(nextProps: ExpressionBuilderConditionSelectorProps, nextContext: any) {
        this.setState(this.buildState(nextProps))
        this.buildColumnValuesState();
    }

    private buildState(theProps: ExpressionBuilderConditionSelectorProps): ExpressionBuilderConditionSelectorState {
        if (StringExtensions.IsNullOrEmpty(theProps.SelectedColumnId)) {
            return {
                SelectedColumnId: "",
                ColumnRawValueDisplayValuePairs: [],
                SelectedColumnDisplayValues: [],
                AllFilterExpresions: [],
                SelectedFilterExpressions: [],
                SelectedColumnRanges: [],
                QueryBuildStatus: this.props.QueryBuildStatus,
                ShowWaitingMessage: false,
                SelectedTab: this.props.SelectedTab
            };
        }
        else {
            if (this.state == null && this.props.ExpressionMode == ExpressionMode.SingleColumn) { // no state so we have come in with a column and nothing else
                return {
                    SelectedColumnId: theProps.SelectedColumnId,
                    ColumnRawValueDisplayValuePairs: [],
                    SelectedColumnDisplayValues: [],
                    AllFilterExpresions: [],
                    SelectedFilterExpressions: [],
                    SelectedColumnRanges: [],
                    QueryBuildStatus: QueryBuildStatus.ColumnSelected,
                    ShowWaitingMessage: false,
                    SelectedTab: QueryTab.ColumnValue
                };
            } else {
                let selectedColumnDisplayValues: Array<any>
                let selectedColumnFilterExpressions: Array<string>
                let selectedColumnRanges: Array<IRange>

                // get selected column values
                let keyValuePair = theProps.Expression.ColumnValueExpressions.find(x => x.ColumnId == theProps.SelectedColumnId)
                if (keyValuePair) {
                    selectedColumnDisplayValues = keyValuePair.ColumnDisplayValues
                }
                else {
                    selectedColumnDisplayValues = []
                }

                // get selected filter expressions
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
                let availableFilterExpressions: string[] = this.props.UserFilters.map(f => f.Name).concat(...this.props.SystemFilters.map(sf => sf));

                // get ranges
                let ranges = theProps.Expression.RangeExpressions.find(x => x.ColumnId == theProps.SelectedColumnId)
                selectedColumnRanges = (ranges) ? ranges.Ranges : []

                return {
                    SelectedColumnId: this.state.SelectedColumnId,
                    ColumnRawValueDisplayValuePairs: this.state.ColumnRawValueDisplayValuePairs, // we fill this later...
                    SelectedColumnDisplayValues: selectedColumnDisplayValues,
                    AllFilterExpresions: availableFilterExpressions,
                    SelectedFilterExpressions: selectedColumnFilterExpressions,
                    SelectedColumnRanges: selectedColumnRanges,
                    QueryBuildStatus: this.props.QueryBuildStatus,
                    ShowWaitingMessage: false,
                    SelectedTab: this.props.SelectedTab == null ? QueryTab.ColumnValue : this.props.SelectedTab
                };
            }
        }
    }

    private buildColumnValuesState(): void {
        let shouldGetColumnValues: boolean = false;
        if (this.props.SelectedColumnId != this.state.SelectedColumnId) {
            shouldGetColumnValues = true;
        } else if (ArrayExtensions.IsNullOrEmpty(this.state.ColumnRawValueDisplayValuePairs) && StringExtensions.IsNotNullOrEmpty(this.props.SelectedColumnId)) {
            shouldGetColumnValues = true;
        }

        if (shouldGetColumnValues) {

            let columnValuePairs: IRawValueDisplayValuePair[] = [];
            if (this.props.Blotter.blotterOptions.queryOptions.getColumnValues != null) {
                this.setState({ ShowWaitingMessage: true });
                this.props.Blotter.blotterOptions.queryOptions.getColumnValues(this.props.SelectedColumnId).
                    then(result => {
                        if (result == null) { // if nothing returned then default to normal
                            columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumnId, DistinctCriteriaPairValue.DisplayValue, false)
                            columnValuePairs = ArrayExtensions.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue])
                            this.setState({ ColumnRawValueDisplayValuePairs: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
                        } else { // get the distinct items and make sure within max items that can be displayed
                            let distinctItems = ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(0, this.props.Blotter.blotterOptions.queryOptions.maxColumnValueItemsDisplayed);
                            distinctItems.forEach(di => {
                                let displayValue = this.props.Blotter.getDisplayValueFromRawValue(this.props.SelectedColumnId, di)
                                columnValuePairs.push({ RawValue: di, DisplayValue: displayValue });
                            })
                            this.setState({ ColumnRawValueDisplayValuePairs: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
                            // set the UIPermittedValues for this column to what has been sent
                            this.props.Blotter.api.userInterfaceApi.SetColumnPermittedValues(this.props.SelectedColumnId, distinctItems)
                        }
                    }, function () {
                        //    this.setState({ name: error });
                    });
            }
            else {
                columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumnId, DistinctCriteriaPairValue.DisplayValue, false)
                columnValuePairs = ArrayExtensions.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue])
                this.setState({ ColumnRawValueDisplayValuePairs: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
            }
        }
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__conditionselector"
        let column = (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnId)) ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId)
        let selectedColumn: IColumn = column;
        let selectedColumnFriendlyName: string = (selectedColumn) ? selectedColumn.FriendlyName : ""

        // get filter names
        // first system filters
        let availableSystemFilterNames: string[] =        FilterHelper.GetSystemFiltersForColumn(selectedColumn, this.props.SystemFilters).map(sf => {
           return sf;
        })

        // then user filters
        let availableUserFilterNames: string[]=  FilterHelper.GetUserFiltersForColumn(selectedColumn, this.props.UserFilters).map(uf=>{
            return uf.Name
        })
       

        // get the help descriptions
        let firstTimeText: string = "Start creating the query by selecting a column below."
        let secondTimeText: string = "Select another column for the query."

        let panelHeader: string = (this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn) ? "Select a Column" : "Column: " + selectedColumnFriendlyName;

        let clearButton = <ButtonClear cssClassName={this.props.cssClassName + " pull-right "} onClick={() => this.onSelectedColumnChanged()}
            bsStyle={"default"}
            style={{ margin: "5px" }}
            size={"xsmall"}
            overrideDisableButton={this.props.ExpressionMode == ExpressionMode.SingleColumn || this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn || this.state.QueryBuildStatus == QueryBuildStatus.SelectFurtherColumn}
            overrideText={"Clear"}
            overrideTooltip="Clear"
            DisplayMode="Text" />

        return <PanelWithButton cssClassName={cssClassName} headerText={panelHeader} bsStyle="info" style={{ height: '447px' }} button={clearButton}>

            {this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn || this.state.QueryBuildStatus == QueryBuildStatus.SelectFurtherColumn ?
                <div>
                    {this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn ?
                            <HelpBlock>
                                {firstTimeText}
                            </HelpBlock>
                         :
                            <HelpBlock>
                                {secondTimeText}
                            </HelpBlock>
                    }
                    {this.state.ShowWaitingMessage ?
                        <Waiting WaitingMessage="Retrieving Column Values..." />
                        :
                        <ColumnSelector cssClassName={cssClassName}
                            SelectedColumnIds={[this.props.SelectedColumnId]}
                            ColumnList={this.props.ColumnsList}
                            onColumnChange={columns => this.onColumnSelectChange(columns)}
                            SelectionMode={SelectionMode.Single} />
                    }
                </div>

                :
                <div>
                    {selectedColumn &&
                        <div>
                            {this.props.Blotter.blotterOptions.queryOptions.columnValuesOnlyInQueries ?
                                <div>
                                    {this.state.ShowWaitingMessage ?
                                        <Waiting WaitingMessage="Retrieving Column Values..." />
                                        :
                                        <ExpressionBuilderColumnValues
                                            cssClassName={cssClassName}
                                            ColumnValues={this.state.ColumnRawValueDisplayValuePairs}
                                            SelectedValues={this.state.SelectedColumnDisplayValues}
                                            onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}>
                                        </ExpressionBuilderColumnValues>
                                    }
                                </div>
                                :
                                <Tab.Container id="left-tabs-example" defaultActiveKey={this.state.SelectedTab} activeKey={this.state.SelectedTab} onSelect={() => this.onSelectTab()}  >
                                    <div>
                                        <Nav bsStyle="pills" >
                                            <NavItem eventKey={QueryTab.ColumnValue} onClick={() => this.onTabChanged(QueryTab.ColumnValue)} >Column Values</NavItem>
                                            <NavItem eventKey={QueryTab.Filter} onSelect={() => this.onTabChanged(QueryTab.Filter)} >Filters</NavItem>
                                            <NavItem eventKey={QueryTab.Range} onClick={() => this.onTabChanged(QueryTab.Range)} >Ranges</NavItem>
                                        </Nav>
                                        <Tab.Content animation>
                                            <Tab.Pane eventKey={QueryTab.ColumnValue} >
                                                {selectedColumn.DataType != DataType.Boolean && this.state.SelectedTab == QueryTab.ColumnValue &&
                                                    <div>
                                                        {this.state.ShowWaitingMessage ?
                                                            <Waiting WaitingMessage="Retrieving Column Values..." />
                                                            :
                                                            <ExpressionBuilderColumnValues
                                                                cssClassName={cssClassName}
                                                                ColumnValues={this.state.ColumnRawValueDisplayValuePairs}
                                                                SelectedValues={this.state.SelectedColumnDisplayValues}
                                                                onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}>
                                                            </ExpressionBuilderColumnValues>
                                                        }
                                                    </div>

                                                }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={QueryTab.Filter} >
                                                {this.state.SelectedTab == QueryTab.Filter &&
                                                    <ExpressionBuilderUserFilter
                                                        cssClassName={cssClassName}
                                                        AvailableSystemFilterNames={availableSystemFilterNames}
                                                        AvailableUserFilterNames={availableUserFilterNames}
                                                        SelectedFilterNames={this.state.SelectedFilterExpressions}
                                                        onFilterNameChange={(selectedValues) => this.onSelectedFiltersChanged(selectedValues)} >
                                                    </ExpressionBuilderUserFilter>
                                                }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={QueryTab.Range}  >
                                                {this.state.SelectedTab == QueryTab.Range &&
                                                    <ExpressionBuilderRanges
                                                        cssClassName={cssClassName}
                                                        SelectedColumn={selectedColumn}
                                                        Ranges={this.state.SelectedColumnRanges}
                                                        Columns={this.props.ColumnsList}
                                                        onRangesChange={(ranges) => this.onSelectedColumnRangesChange(ranges)} >
                                                    </ExpressionBuilderRanges>
                                                }
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
                            }
                        </div>
                    }
                </div>
            }
        </PanelWithButton>
    }

    onSelectTab(): any {
        // empty
    }

    onTabChanged(tab: QueryTab): any {
        this.props.onSelectedColumnChange(this.props.SelectedColumnId, tab)
    }

    onSelectedColumnChanged() {
        this.props.onSelectedColumnChange("", QueryTab.ColumnValue)
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

    onSelectedColumnValuesChange(selectedColumnDisplayValues: Array<any>) {
        let colValuesExpression = this.props.Expression.ColumnValueExpressions
        let columnRawValues: any[] = this.getRawValuesForDisplayValues(selectedColumnDisplayValues)
        let valuesCol = colValuesExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
        if (valuesCol) {
            if (selectedColumnDisplayValues.length == 0) {
                let keyValuePairIndex = colValuesExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId)
                colValuesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                valuesCol.ColumnDisplayValues = selectedColumnDisplayValues;
                valuesCol.ColumnRawValues = columnRawValues;
            }
        }
        else {
            colValuesExpression.push({ ColumnId: this.props.SelectedColumnId, ColumnDisplayValues: selectedColumnDisplayValues, ColumnRawValues: columnRawValues })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnValueExpressions: colValuesExpression }))
        this.setState({ SelectedColumnDisplayValues: selectedColumnDisplayValues } as ExpressionBuilderConditionSelectorState)
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
        this.props.onSelectedColumnChange(columns.length > 0 ? columns[0].ColumnId : "", QueryTab.ColumnValue)
    }

    private getRawValuesForDisplayValues(selectedColumnDisplayValues: any[]): any[] {
        let columnRawValues: any[] = []
        selectedColumnDisplayValues.forEach(scv => {
            let rawValueDisplayValuePair: IRawValueDisplayValuePair = this.state.ColumnRawValueDisplayValuePairs.find(rvdv => rvdv.DisplayValue == scv);
            if (rawValueDisplayValuePair) {
                columnRawValues.push(rawValueDisplayValuePair.RawValue)
            }
        })
        return columnRawValues;
    }
}