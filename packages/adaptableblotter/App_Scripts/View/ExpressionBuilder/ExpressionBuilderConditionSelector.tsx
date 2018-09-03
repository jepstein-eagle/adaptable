import * as React from "react";
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues'
import { ExpressionBuilderUserFilter } from './ExpressionBuilderUserFilter'
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges'
import { Well, HelpBlock, Tab, NavItem, Nav } from 'react-bootstrap';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';
import { DataType, ExpressionMode, DistinctCriteriaPairValue, SelectionMode, QueryBuildStatus, QueryTab, SortOrder } from '../../Core/Enums'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { IRawValueDisplayValuePair } from "../UIInterfaces";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { IUserFilter, IRange } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { Expression } from "../../Core/Api/Expression";
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";
import { Helper } from "../../Core/Helpers/Helper";
import { IBlotterApi } from "../../Core/Api/Interface/IBlotterApi";
import { Waiting } from "../Components/FilterForm/Waiting";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";


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
    ColumnValues: Array<any>
    SelectedColumnValues: Array<any>
    AllFilterExpresions: Array<string>
    SelectedFilterExpressions: Array<string>
    SelectedColumnRanges: Array<IRange>
    QueryBuildStatus: QueryBuildStatus
    ShowWaitingMessage: boolean
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
                ColumnValues: [],
                SelectedColumnValues: [],
                AllFilterExpresions: [],
                SelectedFilterExpressions: [],
                SelectedColumnRanges: [],
                QueryBuildStatus: this.props.QueryBuildStatus,
                ShowWaitingMessage: false
            };
        }
        else {


            let selectedColumnValues: Array<any>
            let selectedColumnFilterExpressions: Array<string>
            let selectedColumnRanges: Array<IRange>

            // get selectedcolumn values
            let keyValuePair = theProps.Expression.ColumnValueExpressions.find(x => x.ColumnId == theProps.SelectedColumnId)
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.ColumnValues
            }
            else {
                selectedColumnValues = []
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
                ColumnValues: this.state.ColumnValues, // we fill this later...
                SelectedColumnValues: selectedColumnValues,
                AllFilterExpresions: availableFilterExpressions,
                SelectedFilterExpressions: selectedColumnFilterExpressions,
                SelectedColumnRanges: selectedColumnRanges,
                QueryBuildStatus: this.props.QueryBuildStatus,
                ShowWaitingMessage: false
            };
        }
    }

    private buildColumnValuesState(): void {
        let shouldGetColumnValues: boolean = false;
        if (this.props.SelectedColumnId != this.state.SelectedColumnId) {
            shouldGetColumnValues = true;
        } else if (ArrayExtensions.IsNullOrEmpty(this.state.ColumnValues) && StringExtensions.IsNotNullOrEmpty(this.props.SelectedColumnId)) {
            shouldGetColumnValues = true;
        }

        if (shouldGetColumnValues) {

            let columnValuePairs: IRawValueDisplayValuePair[] = [];
            if (this.props.Blotter.BlotterOptions.getColumnValues != null) {
                this.setState({ ShowWaitingMessage: true });
                this.props.Blotter.BlotterOptions.getColumnValues(this.props.SelectedColumnId).
                    then(result => {
                        if (result == null) { // if nothing returned then default to normal
                            columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumnId, DistinctCriteriaPairValue.DisplayValue)
                            columnValuePairs = Helper.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue])
                            this.setState({ ColumnValues: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
                        } else { // get the distinct items and make sure within max items that can be displayed
                            let distinctItems = ArrayExtensions.RetrieveDistinct(result).slice(0, this.props.Blotter.BlotterOptions.maxColumnValueItemsDisplayed);
                            distinctItems.forEach(di => {
                                let displayValue = this.props.Blotter.getDisplayValueFromRawValue(this.props.SelectedColumnId, di) 
                                columnValuePairs.push({ RawValue: di, DisplayValue: displayValue });
                            })
                            this.setState({ ColumnValues: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
                            // set the UIPermittedValues for this column to what has been sent
                            this.props.Blotter.api.uiSetColumnPermittedValues(this.props.SelectedColumnId, distinctItems)
                        }
                    }, function (error) {
                        //    this.setState({ name: error });
                    });
            }
            else {
                columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumnId, DistinctCriteriaPairValue.DisplayValue)
                columnValuePairs = Helper.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue])
                this.setState({ ColumnValues: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
            }
        }
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__conditionselector"
        let column = (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnId)) ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId)
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

        let clearButton = <ButtonClear cssClassName={this.props.cssClassName + " pull-right "} onClick={() => this.onSelectedColumnChanged()}
            bsStyle={"default"}
            style={{ margin: "5px" }}
            size={"xsmall"}
            overrideDisableButton={this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn || this.state.QueryBuildStatus == QueryBuildStatus.SelectFurtherColumn}
            overrideText={"Clear"}
            overrideTooltip="Clear"
            DisplayMode="Text" />

        return <PanelWithButton cssClassName={cssClassName} headerText={panelHeader} bsStyle="info" style={{ height: '447px' }} button={clearButton}>

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
                    {this.state.ShowWaitingMessage ?
                        <Waiting WaitingMessage="Retrieving Column Values..." />
                        :
                        <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.props.SelectedColumnId]}
                            ColumnList={this.props.ColumnsList}
                            onColumnChange={columns => this.onColumnSelectChange(columns)}
                            SelectionMode={SelectionMode.Single} />
                    }
                </div>

                :
                <div>
                    {selectedColumn &&
                        <div>
                            {this.props.Blotter.BlotterOptions.columnValuesOnlyInQueries ?
                                <div>
                                    {this.state.ShowWaitingMessage ?
                                        <Waiting WaitingMessage="Retrieving Column Values..." />
                                        :
                                        <ExpressionBuilderColumnValues
                                            cssClassName={cssClassName}
                                            ColumnValues={this.state.ColumnValues}
                                            SelectedValues={this.state.SelectedColumnValues}
                                            onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}>
                                        </ExpressionBuilderColumnValues>
                                    }
                                </div>
                                :
                                <Tab.Container id="left-tabs-example" defaultActiveKey={this.props.SelectedTab} activeKey={this.props.SelectedTab} onSelect={() => this.onSelectTab()}  >
                                    <div>
                                        <Nav bsStyle="pills" >
                                            <NavItem eventKey={QueryTab.ColumnValue} onClick={() => this.onTabChanged(QueryTab.ColumnValue)} >Column Values</NavItem>
                                            <NavItem eventKey={QueryTab.Filter} onSelect={() => this.onTabChanged(QueryTab.Filter)} >Filters</NavItem>
                                            <NavItem eventKey={QueryTab.Range} onClick={() => this.onTabChanged(QueryTab.Range)} >Ranges</NavItem>
                                        </Nav>
                                        <Tab.Content animation>
                                            <Tab.Pane eventKey={QueryTab.ColumnValue} >
                                                {selectedColumn.DataType != DataType.Boolean &&
                                                    <div>
                                                        {this.state.ShowWaitingMessage ?
                                                            <Waiting WaitingMessage="Retrieving Column Values..." />
                                                            :
                                                            <ExpressionBuilderColumnValues
                                                                cssClassName={cssClassName}
                                                                ColumnValues={this.state.ColumnValues}
                                                                SelectedValues={this.state.SelectedColumnValues}
                                                                onColumnValuesChange={(selectedValues) => this.onSelectedColumnValuesChange(selectedValues)}>
                                                            </ExpressionBuilderColumnValues>
                                                        }
                                                    </div>

                                                }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={QueryTab.Filter} >
                                                <ExpressionBuilderUserFilter
                                                    cssClassName={cssClassName}
                                                    AvailableFilterNames={availableFilterNames}
                                                    SelectedFilterNames={this.state.SelectedFilterExpressions}
                                                    onFilterNameChange={(selectedValues) => this.onSelectedFiltersChanged(selectedValues)} >
                                                </ExpressionBuilderUserFilter>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={QueryTab.Range}  >
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

    onSelectedColumnValuesChange(selectedColumnValues: Array<any>) {
        let colValuesExpression = this.props.Expression.ColumnValueExpressions
        let valuesCol = colValuesExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
        if (valuesCol) {
            if (selectedColumnValues.length == 0) {
                let keyValuePairIndex = colValuesExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId)
                colValuesExpression.splice(keyValuePairIndex, 1)
            }
            else {
                valuesCol.ColumnValues = selectedColumnValues
            }
        }
        else {
            colValuesExpression.push({ ColumnId: this.props.SelectedColumnId, ColumnValues: selectedColumnValues })
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnValueExpressions: colValuesExpression }))
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
        this.props.onSelectedColumnChange(columns.length > 0 ? columns[0].ColumnId : "", QueryTab.ColumnValue)
    }

}