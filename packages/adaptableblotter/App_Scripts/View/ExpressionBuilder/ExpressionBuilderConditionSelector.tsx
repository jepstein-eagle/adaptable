import * as React from 'react';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ExpressionBuilderColumnValues } from './ExpressionBuilderColumnValues';
import { ExpressionBuilderUserFilter } from './ExpressionBuilderUserFilter';
import { ExpressionBuilderRanges } from './ExpressionBuilderRanges';
import { HelpBlock, Tab, NavItem, Nav } from 'react-bootstrap';
import { FilterHelper } from '../../Utilities/Helpers/FilterHelper';

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
import { Expression } from '../../PredefinedConfig/Common/Expression/Expression';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Helper } from '../../Utilities/Helpers/Helper';
import { Waiting } from '../Components/FilterForm/Waiting';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { QueryRange } from '../../PredefinedConfig/Common/Expression/QueryRange';
import { FilterExpression } from '../../PredefinedConfig/Common/Expression/FilterExpression';
import { RangeExpression } from '../../PredefinedConfig/Common/Expression/RangeExpression';
import { Box } from 'rebass';

export interface ExpressionBuilderConditionSelectorProps
  extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
  ColumnsList: Array<IColumn>;
  Expression: Expression;
  ExpressionMode: ExpressionMode;
  onExpressionChange: (Expression: Expression) => void;
  onSelectedColumnChange: (ColumnId: string, Tab: QueryTab) => void;
  UserFilters: UserFilter[];
  SystemFilters: string[];
  SelectedColumnId: string;
  SelectedTab: QueryTab;
  QueryBuildStatus: QueryBuildStatus;
  cssClassName: string;
  Blotter: IAdaptableBlotter;
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
    // this.state = this.buildState(this.props);
  }

  // componentWillReceiveProps(nextProps: ExpressionBuilderConditionSelectorProps, nextContext: any) {
  //   this.setState(this.buildState(nextProps));
  //   this.buildColumnValuesState();
  // }

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
      if (props.Blotter.blotterOptions.queryOptions.getColumnValues != null) {
        newState = { ShowWaitingMessage: true };
        props.Blotter.blotterOptions.queryOptions.getColumnValues(props.SelectedColumnId).then(
          result => {
            if (result == null) {
              // if nothing returned then default to normal
              columnValuePairs = props.Blotter.getColumnValueDisplayValuePairDistinctList(
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
              // get the distinct items and make sure within max items that can be displayed
              let distinctItems = ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(
                0,
                props.Blotter.blotterOptions.queryOptions.maxColumnValueItemsDisplayed
              );
              distinctItems.forEach(di => {
                let displayValue = props.Blotter.getDisplayValueFromRawValue(
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
              props.Blotter.api.userInterfaceApi.setColumnPermittedValues(
                props.SelectedColumnId,
                distinctItems
              );
            }
          },
          function() {
            //    this.setState({ name: error });
          }
        );
      } else {
        columnValuePairs = props.Blotter.getColumnValueDisplayValuePairDistinctList(
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

  render() {
    let cssClassName: string = this.props.cssClassName + '__conditionselector';
    let column = StringExtensions.IsNullOrEmpty(this.props.SelectedColumnId)
      ? null
      : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId);
    let selectedColumn: IColumn = column;
    let selectedColumnFriendlyName: string = selectedColumn ? selectedColumn.FriendlyName : '';

    // get filter names
    // first system filters
    let availableSystemFilterNames: string[] = FilterHelper.GetSystemFiltersForColumn(
      selectedColumn,
      this.props.SystemFilters
    ).map(sf => {
      return sf;
    });

    // then user filters
    let availableUserFilterNames: string[] = FilterHelper.GetUserFiltersForColumn(
      selectedColumn,
      this.props.UserFilters
    ).map(uf => {
      return uf.Name;
    });

    // get the help descriptions
    let firstTimeText: string = 'Start creating the query by selecting a column below.';
    let secondTimeText: string = 'Select another column for the query.';

    let panelHeader: string =
      this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn
        ? 'Select a Column'
        : 'Column: ' + selectedColumnFriendlyName;

    let clearButton = (
      <SimpleButton
        className={this.props.cssClassName + ' pull-right '}
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
        cssClassName={cssClassName}
        headerText={panelHeader}
        variant="default"
        button={clearButton}
        bodyProps={{
          padding: 0,
          paddingTop: 2,
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
          <div>
            {this.state.QueryBuildStatus == QueryBuildStatus.SelectFirstColumn ? (
              <HelpBlock>{firstTimeText}</HelpBlock>
            ) : (
              <HelpBlock>{secondTimeText}</HelpBlock>
            )}
            {this.state.ShowWaitingMessage ? (
              <Waiting WaitingMessage="Retrieving Column Values..." />
            ) : (
              <ColumnSelector
                cssClassName={cssClassName}
                SelectedColumnIds={[this.props.SelectedColumnId]}
                ColumnList={this.props.ColumnsList}
                onColumnChange={columns => this.onColumnSelectChange(columns)}
                SelectionMode={SelectionMode.Single}
              />
            )}
          </div>
        ) : (
          <div>
            {selectedColumn && (
              <div>
                {this.props.Blotter.blotterOptions.queryOptions.columnValuesOnlyInQueries ? (
                  <div>
                    {this.state.ShowWaitingMessage ? (
                      <Waiting WaitingMessage="Retrieving Column Values..." />
                    ) : (
                      <ExpressionBuilderColumnValues
                        cssClassName={cssClassName}
                        ColumnValues={this.state.ColumnRawValueDisplayValuePairs}
                        SelectedValues={this.state.SelectedColumnDisplayValues}
                        onColumnValuesChange={selectedValues =>
                          this.onSelectedColumnValuesChange(selectedValues)
                        }
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <Box marginBottom={2}>
                      <SimpleButton
                        onClick={() => this.onTabChanged(QueryTab.ColumnValue)}
                        marginRight={2}
                        tone="success"
                        tone={firstSelected ? 'success' : 'neutral'}
                        variant={firstSelected ? 'raised' : 'outlined'}
                      >
                        Column Values
                      </SimpleButton>
                      <SimpleButton
                        onClick={() => this.onTabChanged(QueryTab.Filter)}
                        marginRight={2}
                        tone="success"
                        tone={secondSelected ? 'success' : 'neutral'}
                        variant={secondSelected ? 'raised' : 'outlined'}
                      >
                        Filters
                      </SimpleButton>
                      <SimpleButton
                        tone={thirdSelected ? 'success' : 'neutral'}
                        onClick={() => this.onTabChanged(QueryTab.QueryRange)}
                        variant={thirdSelected ? 'raised' : 'outlined'}
                      >
                        Ranges
                      </SimpleButton>
                    </Box>
                    <div>
                      <div
                        style={{
                          display: firstSelected ? 'block' : 'none',
                        }}
                      >
                        {firstSelected && (
                          <div>
                            {this.state.ShowWaitingMessage ? (
                              <Waiting WaitingMessage="Retrieving Column Values..." />
                            ) : (
                              <ExpressionBuilderColumnValues
                                cssClassName={cssClassName}
                                ColumnValues={this.state.ColumnRawValueDisplayValuePairs}
                                SelectedValues={this.state.SelectedColumnDisplayValues}
                                onColumnValuesChange={selectedValues =>
                                  this.onSelectedColumnValuesChange(selectedValues)
                                }
                              />
                            )}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: secondSelected ? 'block' : 'none',
                        }}
                      >
                        {secondSelected && (
                          <ExpressionBuilderUserFilter
                            cssClassName={cssClassName}
                            AvailableSystemFilterNames={availableSystemFilterNames}
                            AvailableUserFilterNames={availableUserFilterNames}
                            SelectedFilterNames={this.state.SelectedFilterExpressions}
                            onFilterNameChange={selectedValues =>
                              this.onSelectedFiltersChanged(selectedValues)
                            }
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: thirdSelected ? 'block' : 'none',
                        }}
                      >
                        {thirdSelected && (
                          <ExpressionBuilderRanges
                            cssClassName={cssClassName}
                            SelectedColumn={selectedColumn}
                            Ranges={this.state.SelectedColumnRanges}
                            Columns={this.props.ColumnsList}
                            onRangesChange={ranges => this.onSelectedColumnRangesChange(ranges)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
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

  private onColumnSelectChange(columns: IColumn[]) {
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
