import * as React from 'react';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import {
  ExpressionBuilderColumnValues,
  ExpressionBuilderColumnValuesProps,
} from './ExpressionBuilderColumnValues';
import { ExpressionBuilderUserFilter } from './ExpressionBuilderUserFilter';
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges';
import SimpleButton from '../../components/SimpleButton';
import {
  DataType,
  ExpressionMode,
  DistinctCriteriaPairValue,
  SelectionMode,
  QueryBuildStatus,
  QueryTab,
  SortOrder,
} from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IRawValueDisplayValuePair } from '../UIInterfaces';
import { ColumnSelector } from '../Components/Selectors/ColumnSelector';
import {
  Expression,
  QueryRange,
  FilterExpression,
  RangeExpression,
} from '../../PredefinedConfig/Common/Expression';

import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

import { Waiting } from '../Components/FilterForm/Waiting';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { Box, Flex } from 'rebass';
import HelpBlock from '../../components/HelpBlock';
import { NamedFilter } from '../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';

export interface ExpressionBuilderConditionSelectorProps
  extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
  ColumnsList: Array<AdaptableColumn>;
  Expression: Expression;
  ExpressionMode: ExpressionMode;
  onExpressionChange: (Expression: Expression) => void;
  onSelectedColumnChange: (ColumnId: string, Tab: QueryTab) => void;
  UserFilters: UserFilter[];
  SystemFilters: string[];
  NamedFilters: NamedFilter[];
  ColumnCategories: ColumnCategory[];
  SelectedColumnId: string;
  SelectedTab: QueryTab;
  QueryBuildStatus: QueryBuildStatus;
  Adaptable: IAdaptable;
}

export interface ExpressionBuilderConditionSelectorState {
  SelectedColumnId: string;
  ColumnRawValueDisplayValuePairs: IRawValueDisplayValuePair[];
  SelectedColumnDisplayValues: Array<any>;
  AllFilterExpresions: Array<string>;
  SelectedFilterExpressions: Array<string>;
  SelectedColumnRanges: Array<QueryRange>;
  QueryBuildStatus: QueryBuildStatus;
  ShowWaitingMessage: boolean;
  SelectedTab: QueryTab;
}

export class ExpressionBuilderConditionSelector extends React.Component<
  ExpressionBuilderConditionSelectorProps,
  ExpressionBuilderConditionSelectorState
> {
  constructor(props: ExpressionBuilderConditionSelectorProps) {
    super(props);
  }

  static getDerivedStateFromProps(
    props: ExpressionBuilderConditionSelectorProps,
    state: ExpressionBuilderConditionSelectorState
  ) {
    state = {
      ...state,
      ...ExpressionBuilderConditionSelector.buildState(props, state),
    };
    return {
      ...state,
      ...ExpressionBuilderConditionSelector.buildColumnValuesState(props, state),
    };
  }

  private static buildState(
    theProps: ExpressionBuilderConditionSelectorProps,
    state: ExpressionBuilderConditionSelectorState
  ): ExpressionBuilderConditionSelectorState {
    if (StringExtensions.IsNullOrEmpty(theProps.SelectedColumnId)) {
      return {
        SelectedColumnId: '',
        ColumnRawValueDisplayValuePairs: [],
        SelectedColumnDisplayValues: [],
        AllFilterExpresions: [],
        SelectedFilterExpressions: [],
        SelectedColumnRanges: [],
        QueryBuildStatus: theProps.QueryBuildStatus,
        ShowWaitingMessage: false,
        SelectedTab: theProps.SelectedTab,
      };
    } else {
      if (state == null && theProps.ExpressionMode == ExpressionMode.SingleColumn) {
        // no state so we have come in with a column and nothing else
        return {
          SelectedColumnId: theProps.SelectedColumnId,
          ColumnRawValueDisplayValuePairs: [],
          SelectedColumnDisplayValues: [],
          AllFilterExpresions: [],
          SelectedFilterExpressions: [],
          SelectedColumnRanges: [],
          QueryBuildStatus: QueryBuildStatus.ColumnSelected,
          ShowWaitingMessage: false,
          SelectedTab: QueryTab.ColumnValue,
        };
      } else {
        let selectedColumnDisplayValues: Array<any>;
        let selectedColumnFilterExpressions: Array<string>;
        let selectedColumnRanges: Array<QueryRange>;

        // get selected column values
        let keyValuePair = theProps.Expression.ColumnValueExpressions.find(
          x => x.ColumnId == theProps.SelectedColumnId
        );
        if (keyValuePair) {
          selectedColumnDisplayValues = keyValuePair.ColumnDisplayValues;
        } else {
          selectedColumnDisplayValues = [];
        }

        // get selected filter expressions
        let filterExpression: FilterExpression = null;
        if (ArrayExtensions.IsNotNullOrEmpty(theProps.Expression.FilterExpressions)) {
          filterExpression = theProps.Expression.FilterExpressions.find(
            x => x.ColumnId == theProps.SelectedColumnId
          );
        }
        selectedColumnFilterExpressions = [];
        if (filterExpression) {
          filterExpression.Filters.forEach((fe: string) => {
            // if its a userfilter add it to that list
            let userFilter: UserFilter = theProps.UserFilters.find(uf => uf.Name == fe);
            if (userFilter) {
              selectedColumnFilterExpressions.push(fe);
            }
            // if it is a system filter add it ot that list
            let selectedSystemFilter: string = theProps.SystemFilters.find(sf => sf == fe);
            if (selectedSystemFilter) {
              selectedColumnFilterExpressions.push(fe);
            }
          });
        }
        let availableFilterExpressions: string[] = theProps.UserFilters.map(f => f.Name).concat(
          ...theProps.SystemFilters.map(sf => sf)
        );

        // get ranges
        let range: RangeExpression = null;
        if (ArrayExtensions.IsNotNullOrEmpty(theProps.Expression.RangeExpressions)) {
          range = theProps.Expression.RangeExpressions.find(
            x => x.ColumnId == theProps.SelectedColumnId
          );
        }
        selectedColumnRanges = range ? range.Ranges : [];

        return {
          SelectedColumnId: state.SelectedColumnId,
          ColumnRawValueDisplayValuePairs: state.ColumnRawValueDisplayValuePairs, // we fill this later...
          SelectedColumnDisplayValues: selectedColumnDisplayValues,
          AllFilterExpresions: availableFilterExpressions,
          SelectedFilterExpressions: selectedColumnFilterExpressions,
          SelectedColumnRanges: selectedColumnRanges,
          QueryBuildStatus: theProps.QueryBuildStatus,
          ShowWaitingMessage: false,
          SelectedTab: theProps.SelectedTab == null ? QueryTab.ColumnValue : theProps.SelectedTab,
        };
      }
    }
  }

  private static buildColumnValuesState(
    props: ExpressionBuilderConditionSelectorProps,
    state: ExpressionBuilderConditionSelectorState
  ): any {
    let shouldGetColumnValues: boolean = false;
    if (props.SelectedColumnId != state.SelectedColumnId) {
      shouldGetColumnValues = true;
    } else if (
      ArrayExtensions.IsNullOrEmpty(state.ColumnRawValueDisplayValuePairs) &&
      StringExtensions.IsNotNullOrEmpty(props.SelectedColumnId)
    ) {
      shouldGetColumnValues = true;
    }

    let newState = {};

    if (shouldGetColumnValues) {
      let columnValuePairs: IRawValueDisplayValuePair[] = [];

      /*
        NOTE: We have a big bug here.  If we try to get the values from the function provided by the dev (see below)
        then we never seem to reload the page with the new state and so the listbox is never populated and the waiting message is never removed
      */

      // There are 2 ways to get column values to show in the dropdown
      // 1. By invoking the function provided by the dev at design-time in getColumnValues property of Query Options
      // Note: if we invoke this function and the result is null then we get the distinct values for the column
      // 2. If the property above is not set then instead, we get the distinct values for the column

      if (props.Adaptable.adaptableOptions.queryOptions.getColumnValues != null) {
        // The dev has provided us with a function to call that will retrieve the column values

        newState = { ShowWaitingMessage: true };
      } else {
        // the developer hasnt given us a property that we need to invoke to get column values, so lets get the distinct values for the column instead
        columnValuePairs = props.Adaptable.getColumnValueDisplayValuePairDistinctList(
          props.SelectedColumnId,
          DistinctCriteriaPairValue.DisplayValue,
          false
        );
        columnValuePairs = ArrayExtensions.sortArrayWithProperty(
          SortOrder.Ascending,
          columnValuePairs,
          DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]
        );
        newState = {
          ...newState,
          ColumnRawValueDisplayValuePairs: columnValuePairs,
          ShowWaitingMessage: false,
          SelectedColumnId: props.SelectedColumnId,
        };
      }
    }
    return newState;
  }

  componentDidMount() {
    if (this.props.Adaptable!.adaptableOptions.queryOptions.getColumnValues) {
      this.setStateForColumnValues();
    }
  }

  setStateForColumnValues(props = this.props) {
    this.lazyLoadColumnValues(props).then(state => {
      this.setState(state);
    });
  }

  componentDidUpdate(_prevState: any, prevProps: any) {
    if (
      this.props.SelectedColumnId != prevProps.SelectedColumnId &&
      this.props.Adaptable!.adaptableOptions.queryOptions.getColumnValues
    ) {
      this.setStateForColumnValues();
    }
  }

  lazyLoadColumnValues = async (props: ExpressionBuilderConditionSelectorProps) => {
    return props
      .Adaptable!.adaptableOptions.queryOptions.getColumnValues(props.SelectedColumnId)
      .then(result => {
        let newState = {};
        let columnValuePairs: IRawValueDisplayValuePair[] = [];
        // we have got the result back from the function we've invoked; if the return value is null then lets get distinct values instead
        if (result == null) {
          //  nothing returned so get the distinct column values via Adaptable method
          columnValuePairs = props.Adaptable.getColumnValueDisplayValuePairDistinctList(
            props.SelectedColumnId,
            DistinctCriteriaPairValue.DisplayValue,
            false
          );
          columnValuePairs = ArrayExtensions.sortArrayWithProperty(
            SortOrder.Ascending,
            columnValuePairs,
            DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]
          );
          newState = {
            ...newState,
            ColumnRawValueDisplayValuePairs: columnValuePairs,
            ShowWaitingMessage: false,
            SelectedColumnId: props.SelectedColumnId,
          };
        } else {
          // we have return values from our function so lets populate the state with them
          // make sure that we only return within max items that can be displayed
          let distinctItems = ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(
            0,
            props.Adaptable.adaptableOptions.queryOptions.maxColumnValueItemsDisplayed
          );
          distinctItems.forEach(di => {
            let displayValue = props.Adaptable.getDisplayValueFromRawValue(
              props.SelectedColumnId,
              di
            );
            columnValuePairs.push({ RawValue: di, DisplayValue: displayValue });
          });
          newState = {
            ...newState,
            ColumnRawValueDisplayValuePairs: columnValuePairs,
            ShowWaitingMessage: false,
            SelectedColumnId: props.SelectedColumnId,
          };
          // set the UIPermittedValues for this column to what has been sent
          props.Adaptable.api.userInterfaceApi.setColumnPermittedValues(
            props.SelectedColumnId,
            distinctItems
          );
        }
        return newState;
      });
  };

  render() {
    let column = StringExtensions.IsNullOrEmpty(this.props.SelectedColumnId)
      ? null
      : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId);
    let selectedColumn: AdaptableColumn = column;
    let selectedColumnFriendlyName: string = selectedColumn ? selectedColumn.FriendlyName : '';

    // get filter names
    // first system filters
    let availableSystemFilterNames: string[] = this.props.Adaptable.FilterService.GetSystemFiltersForColumn(
      selectedColumn,
      this.props.SystemFilters
    ).map(sf => {
      return sf;
    });

    // then user filters
    let availableUserFilterNames: string[] = this.props.Adaptable.FilterService.GetUserFiltersForColumn(
      selectedColumn,
      this.props.UserFilters
    ).map(uf => {
      return uf.Name;
    });

    // then named filters
    let availableNamedFilterNames: string[] = this.props.Adaptable.FilterService.GetNamedFiltersForColumn(
      selectedColumn,
      this.props.NamedFilters,
      this.props.ColumnCategories
    ).map(uf => {
      return uf.Name;
    });

    // get the help descriptions
    let firstTimeText: string = 'Start creating the query by selecting a column';
    let secondTimeText: string = 'Select another column for the query.';

    let panelHeader: string =
      this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn
        ? 'Select a Column'
        : 'Column: ' + selectedColumnFriendlyName;

    let clearButton = (
      <SimpleButton
        onClick={() => this.onSelectedColumnChanged()}
        disabled={
          this.props.ExpressionMode == ExpressionMode.SingleColumn ||
          this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn ||
          this.state.QueryBuildStatus == QueryBuildStatus.SelectFurtherColumn
        }
        tooltip="Clear"
        variant="text"
      >
        Clear
      </SimpleButton>
    );

    const firstSelected =
      selectedColumn &&
      selectedColumn.DataType != DataType.Boolean &&
      this.state.SelectedTab == QueryTab.ColumnValue;
    const secondSelected = this.state.SelectedTab == QueryTab.Filter;
    const thirdSelected = this.state.SelectedTab == QueryTab.QueryRange;
    return (
      <PanelWithButton
        headerText={panelHeader}
        variant="default"
        button={clearButton}
        bodyScroll={false}
        bodyProps={{
          padding: 0,
          style: {
            display: 'flex',
            flexFlow: 'column',
          },
        }}
        style={{
          flex: '1 0 0%',
          marginRight: 'var(--ab-space-2)',
        }}
      >
        {this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn ||
        this.state.QueryBuildStatus == QueryBuildStatus.SelectFurtherColumn ? (
          <div style={{ marginLeft: 2, marginRight: 2 }}>
            {this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn ? (
              <HelpBlock marginBottom={2} marginTop={2}>
                {firstTimeText}
              </HelpBlock>
            ) : (
              <HelpBlock marginBottom={2} marginTop={2}>
                {secondTimeText}
              </HelpBlock>
            )}
            {this.state.ShowWaitingMessage ? (
              <Waiting WaitingMessage="Retrieving Column Values..." />
            ) : (
              <ColumnSelector
                SelectedColumnIds={[this.props.SelectedColumnId]}
                ColumnList={this.props.ColumnsList}
                onColumnChange={columns => this.onColumnSelectChange(columns)}
                SelectionMode={SelectionMode.Single}
              />
            )}
          </div>
        ) : (
          <Flex flex={1} flexDirection="column">
            {selectedColumn && (
              <>
                {this.props.Adaptable.adaptableOptions.queryOptions.columnValuesOnlyInQueries ? (
                  <>
                    {this.state.ShowWaitingMessage ? (
                      <Waiting WaitingMessage="Retrieving Column Values..." />
                    ) : (
                      <ExpressionBuilderColumnValues
                        ColumnValues={this.state.ColumnRawValueDisplayValuePairs}
                        SelectedValues={this.state.SelectedColumnDisplayValues}
                        onColumnValuesChange={selectedValues =>
                          this.onSelectedColumnValuesChange(selectedValues)
                        }
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Box marginBottom={2} marginTop={2}>
                      <SimpleButton
                        onClick={() => this.onTabChanged(QueryTab.ColumnValue)}
                        marginRight={2}
                        tone={(firstSelected ? 'accent' : 'neutral') as 'accent' | 'neutral'}
                        variant={firstSelected ? 'raised' : 'outlined'}
                      >
                        Column Values
                      </SimpleButton>
                      <SimpleButton
                        onClick={() => this.onTabChanged(QueryTab.Filter)}
                        marginRight={2}
                        tone={(secondSelected ? 'accent' : 'neutral') as 'accent' | 'neutral'}
                        variant={secondSelected ? 'raised' : 'outlined'}
                      >
                        Filters
                      </SimpleButton>
                      <SimpleButton
                        tone={thirdSelected ? 'accent' : ('neutral' as 'accent' | 'neutral')}
                        onClick={() => this.onTabChanged(QueryTab.QueryRange)}
                        variant={thirdSelected ? 'raised' : 'outlined'}
                      >
                        Ranges
                      </SimpleButton>
                    </Box>

                    {firstSelected ? (
                      <>
                        {this.state.ShowWaitingMessage ? (
                          <Waiting WaitingMessage="Retrieving Column Values..." />
                        ) : (
                          <ExpressionBuilderColumnValues
                            ColumnValues={this.state.ColumnRawValueDisplayValuePairs}
                            SelectedValues={this.state.SelectedColumnDisplayValues}
                            onColumnValuesChange={selectedValues =>
                              this.onSelectedColumnValuesChange(selectedValues)
                            }
                          />
                        )}
                      </>
                    ) : null}

                    {secondSelected ? (
                      <ExpressionBuilderUserFilter
                        AvailableSystemFilterNames={availableSystemFilterNames}
                        AvailableUserFilterNames={availableUserFilterNames}
                        AvailableNamedFilterNames={availableNamedFilterNames}
                        SelectedFilterNames={this.state.SelectedFilterExpressions}
                        onFilterNameChange={selectedValues =>
                          this.onSelectedFiltersChanged(selectedValues)
                        }
                      />
                    ) : null}

                    {thirdSelected ? (
                      <ExpressionBuilderRanges
                        SelectedColumn={selectedColumn}
                        Ranges={this.state.SelectedColumnRanges}
                        Columns={this.props.ColumnsList}
                        onRangesChange={ranges => this.onSelectedColumnRangesChange(ranges)}
                      />
                    ) : null}
                  </>
                )}
              </>
            )}
          </Flex>
        )}
      </PanelWithButton>
    );
  }

  onSelectTab(): any {
    // empty
  }

  onTabChanged(tab: QueryTab): any {
    this.props.onSelectedColumnChange(this.props.SelectedColumnId, tab);
  }

  onSelectedColumnChanged() {
    this.props.onSelectedColumnChange('', QueryTab.ColumnValue);
  }

  onSelectedColumnRangesChange(selectedRanges: Array<QueryRange>) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let colRangesExpression = this.props.Expression.RangeExpressions;

    let rangeExpression: RangeExpression = null;
    if (ArrayExtensions.IsNotNullOrEmpty(colRangesExpression)) {
      rangeExpression = colRangesExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
    }
    if (rangeExpression) {
      if (selectedRanges.length == 0) {
        let keyValuePairIndex = colRangesExpression.findIndex(
          x => x.ColumnId == this.props.SelectedColumnId
        );
        colRangesExpression.splice(keyValuePairIndex, 1);
      } else {
        rangeExpression.Ranges = selectedRanges;
      }
    } else {
      colRangesExpression.push({ ColumnId: this.props.SelectedColumnId, Ranges: selectedRanges });
    }
    this.props.onExpressionChange(
      Object.assign({}, this.props.Expression, { RangeExpressions: colRangesExpression })
    );
    this.setState({
      SelectedColumnRanges: selectedRanges,
    } as ExpressionBuilderConditionSelectorState);
  }

  onSelectedColumnValuesChange(selectedColumnDisplayValues: Array<any>) {
    let colValuesExpression = this.props.Expression.ColumnValueExpressions;
    let columnRawValues: any[] = this.getRawValuesForDisplayValues(selectedColumnDisplayValues);
    let valuesCol = colValuesExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
    if (valuesCol) {
      if (selectedColumnDisplayValues.length == 0) {
        let keyValuePairIndex = colValuesExpression.findIndex(
          x => x.ColumnId == this.props.SelectedColumnId
        );
        colValuesExpression.splice(keyValuePairIndex, 1);
      } else {
        valuesCol.ColumnDisplayValues = selectedColumnDisplayValues;
        valuesCol.ColumnRawValues = columnRawValues;
      }
    } else {
      colValuesExpression.push({
        ColumnId: this.props.SelectedColumnId,
        ColumnDisplayValues: selectedColumnDisplayValues,
        ColumnRawValues: columnRawValues,
      });
    }
    this.props.onExpressionChange(
      Object.assign({}, this.props.Expression, { ColumnValueExpressions: colValuesExpression })
    );
    this.setState({
      SelectedColumnDisplayValues: selectedColumnDisplayValues,
    } as ExpressionBuilderConditionSelectorState);
  }

  onSelectedFiltersChanged(selectedFilters: Array<string>) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let colUserFilterExpression = this.props.Expression.FilterExpressions;
    if (ArrayExtensions.IsNullOrEmpty(colUserFilterExpression)) {
      colUserFilterExpression = [];
    }
    let userFilterExpressionCol = colUserFilterExpression.find(
      x => x.ColumnId == this.props.SelectedColumnId
    );
    if (userFilterExpressionCol) {
      if (selectedFilters.length == 0) {
        let keyValuePairIndex = colUserFilterExpression.findIndex(
          x => x.ColumnId == this.props.SelectedColumnId
        );
        colUserFilterExpression.splice(keyValuePairIndex, 1);
      } else {
        userFilterExpressionCol.Filters = selectedFilters;
      }
    } else {
      colUserFilterExpression.push({
        ColumnId: this.props.SelectedColumnId,
        Filters: selectedFilters,
      });
    }

    this.props.onExpressionChange(
      Object.assign({}, this.props.Expression, { FilterExpressions: colUserFilterExpression })
    );
    this.setState({
      SelectedFilterExpressions: selectedFilters,
    } as ExpressionBuilderConditionSelectorState);
  }

  private onColumnSelectChange(columns: AdaptableColumn[]) {
    this.props.onSelectedColumnChange(
      columns.length > 0 ? columns[0].ColumnId : '',
      QueryTab.ColumnValue
    );
  }

  private getRawValuesForDisplayValues(selectedColumnDisplayValues: any[]): any[] {
    let columnRawValues: any[] = [];
    selectedColumnDisplayValues.forEach(scv => {
      let rawValueDisplayValuePair: IRawValueDisplayValuePair = this.state.ColumnRawValueDisplayValuePairs.find(
        rvdv => rvdv.DisplayValue == scv
      );
      if (rawValueDisplayValuePair) {
        columnRawValues.push(rawValueDisplayValuePair.RawValue);
      }
    });
    return columnRawValues;
  }
}
