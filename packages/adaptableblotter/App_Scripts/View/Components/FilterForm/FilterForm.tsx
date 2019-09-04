import * as React from 'react';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import * as ColumnFilterRedux from '../../../Redux/ActionsReducers/ColumnFilterRedux';
import * as UserFilterRedux from '../../../Redux/ActionsReducers/UserFilterRedux';
import * as GridRedux from '../../../Redux/ActionsReducers/GridRedux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { FilterHelper } from '../../../Utilities/Helpers/FilterHelper';
import {
  DataType,
  SortOrder,
  DistinctCriteriaPairValue,
  LeafExpressionOperator,
  ColumnMenuTab,
  AccessLevel,
} from '../../../PredefinedConfig/Common/Enums';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import { ColumnFilter } from '../../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression/QueryRange';
import { Helper } from '../../../Utilities/Helpers/Helper';
import { ListBoxFilterForm } from './ListBoxFilterForm';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { ButtonClose } from '../Buttons/ButtonClose';
import { Expression } from '../../../PredefinedConfig/Common/Expression/Expression';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ButtonClear } from '../Buttons/ButtonClear';
import { Waiting } from './Waiting';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ListBoxMenu } from './ListBoxMenu';

import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { FilterFormPanel } from '../Panels/FilterFormPanel';
import { ButtonSave } from '../Buttons/ButtonSave';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { IUIPrompt } from '../../../Utilities/Interface/IMessage';
import HelpBlock from '../../../components/HelpBlock';
import { NamedFilter } from '../../../PredefinedConfig/RunTimeState/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import { AdaptableBlotterMenuItem } from '../../../Utilities/MenuItem';

interface FilterFormProps extends StrategyViewPopupProps<FilterFormComponent> {
  CurrentColumn: IColumn;
  Blotter: IAdaptableBlotter;
  Columns: IColumn[];
  UserFilters: UserFilter[];
  SystemFilters: string[];
  NamedFilters: NamedFilter[];
  ColumnCategories: ColumnCategory[];
  ColumnFilters: ColumnFilter[];
  MenuItems: AdaptableBlotterMenuItem[];
  EmbedColumnMenu: boolean;
  ShowCloseButton: boolean;
  onClearColumnFilter: (columnfilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
  onAddColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterAddAction;
  onEditColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterEditAction;
  onSetColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterSetAction;
  onHideFilterForm: () => GridRedux.FilterFormHideAction;
  onMenuItemClick: (action: Redux.Action) => Redux.Action;
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
}

export interface FilterFormState {
  ColumnValuePairs: Array<IRawValueDisplayValuePair>;
  ShowWaitingMessage: boolean;
  SelectedTab: ColumnMenuTab;
  DistinctCriteriaPairValue: DistinctCriteriaPairValue;
  editedColumnFilter: ColumnFilter | undefined;
}

class FilterFormComponent extends React.Component<FilterFormProps, FilterFormState> {
  constructor(props: FilterFormProps) {
    super(props);

    let existingColumnFilter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );
    if (!existingColumnFilter) {
      existingColumnFilter = ObjectFactory.CreateColumnFilter(
        this.props.CurrentColumn.ColumnId,
        ExpressionHelper.CreateEmptyExpression()
      );
    }

    this.state = {
      ColumnValuePairs: [],
      ShowWaitingMessage: false,
      SelectedTab: ColumnMenuTab.Filter,
      DistinctCriteriaPairValue: DistinctCriteriaPairValue.DisplayValue,
      editedColumnFilter: existingColumnFilter,
    };
  }
  componentDidMount() {
    if (this.props.CurrentColumn.DataType != DataType.Boolean) {
      let columnValuePairs: IRawValueDisplayValuePair[] = [];

      let existingColumnFilter = this.props.ColumnFilters.find(
        cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
      );
      if (!existingColumnFilter) {
        existingColumnFilter = ObjectFactory.CreateColumnFilter(
          this.props.CurrentColumn.ColumnId,
          ExpressionHelper.CreateEmptyExpression()
        );
      }

      if (this.props.Blotter.blotterOptions.queryOptions.getColumnValues != null) {
        this.setState({ ShowWaitingMessage: true });
        this.props.Blotter.blotterOptions.queryOptions
          .getColumnValues(this.props.CurrentColumn.ColumnId)
          .then(result => {
            if (result == null) {
              // if nothing returned then default to normal
              columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
                this.props.CurrentColumn.ColumnId,
                DistinctCriteriaPairValue.DisplayValue,
                false
              );
              columnValuePairs = ArrayExtensions.sortArrayWithProperty(
                SortOrder.Ascending,
                columnValuePairs,
                DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]
              );
              this.setState({
                ColumnValuePairs: columnValuePairs,
                ShowWaitingMessage: false,
                DistinctCriteriaPairValue: DistinctCriteriaPairValue.DisplayValue,
                editedColumnFilter: existingColumnFilter,
              });
            } else {
              // get the distinct items and make sure within max items that can be displayed
              let distinctItems = ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(
                0,
                this.props.Blotter.blotterOptions.queryOptions.maxColumnValueItemsDisplayed
              );
              distinctItems.forEach(distinctItem => {
                let displayValue =
                  result.DistinctCriteriaPairValue == DistinctCriteriaPairValue.DisplayValue
                    ? this.props.Blotter.getDisplayValueFromRawValue(
                        this.props.CurrentColumn.ColumnId,
                        distinctItem
                      )
                    : distinctItem;
                columnValuePairs.push({ RawValue: distinctItem, DisplayValue: displayValue });
              });
              let distinctCriteriaPairValue: DistinctCriteriaPairValue =
                result.DistinctCriteriaPairValue == DistinctCriteriaPairValue.RawValue
                  ? DistinctCriteriaPairValue.RawValue
                  : DistinctCriteriaPairValue.DisplayValue;
              this.setState({
                ColumnValuePairs: columnValuePairs,
                ShowWaitingMessage: false,
                DistinctCriteriaPairValue: distinctCriteriaPairValue,
                editedColumnFilter: existingColumnFilter,
              });
              // set the UIPermittedValues for this column to what has been sent
              this.props.Blotter.api.userInterfaceApi.setColumnPermittedValues(
                this.props.CurrentColumn.ColumnId,
                distinctItems
              );
            }
          });
      } else {
        columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
          this.props.CurrentColumn.ColumnId,
          DistinctCriteriaPairValue.DisplayValue,
          false
        );
        columnValuePairs = ArrayExtensions.sortArrayWithProperty(
          SortOrder.Ascending,
          columnValuePairs,
          DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]
        );
        this.setState({
          ColumnValuePairs: columnValuePairs,
          ShowWaitingMessage: false,
          DistinctCriteriaPairValue: DistinctCriteriaPairValue.DisplayValue,
          editedColumnFilter: existingColumnFilter,
        });
      }
    }
  }

  render(): any {
    let isFilterable: string = this.isFilterable();

    // get user filter expressions appropriate for this column
    let appropriateFilters: string[] = FilterHelper.GetUserFiltersForColumn(
      this.props.CurrentColumn,
      this.props.UserFilters
    )
      .map(uf => uf.Name)
      .concat(
        FilterHelper.GetNamedFiltersForColumn(
          this.props.CurrentColumn,
          this.props.NamedFilters,
          this.props.ColumnCategories
        ).map(nf => nf.Name)
      )
      .concat(
        FilterHelper.GetSystemFiltersForColumn(
          this.props.CurrentColumn,
          this.props.SystemFilters
        ).map(sf => sf)
      ); //.filter(u => FilterHelper.ShowUserFilterForColumn(this.props.UserFilterState.UserFilters, u.Name, this.props.CurrentColumn));

    let appropriateFilterItems: IRawValueDisplayValuePair[] = appropriateFilters.map(uf => {
      return { RawValue: uf, DisplayValue: uf };
    });

    // populate any missing arrays
    if (this.state.editedColumnFilter && this.state.editedColumnFilter.Filter) {
      if (ArrayExtensions.IsNull(this.state.editedColumnFilter.Filter.ColumnValueExpressions)) {
        this.state.editedColumnFilter.Filter.ColumnValueExpressions = [];
      }
      if (ArrayExtensions.IsNull(this.state.editedColumnFilter.Filter.FilterExpressions)) {
        this.state.editedColumnFilter.Filter.FilterExpressions = [];
      }
      if (ArrayExtensions.IsNull(this.state.editedColumnFilter.Filter.RangeExpressions)) {
        this.state.editedColumnFilter.Filter.RangeExpressions = [];
      }
    }

    let uiSelectedColumnValues: string[] =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues
        : [];

    let uiSelectedUserFilters =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.FilterExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.FilterExpressions[0].Filters
        : [];

    let uiSelectedRangeExpression: QueryRange =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.RangeExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.RangeExpressions[0].Ranges[0]
        : ExpressionHelper.CreateEmptyRange();

    let leafExpressionOperators = this.getLeafExpressionOperatorsForDataType(
      this.props.CurrentColumn.DataType
    );

    let isEmptyFilter: boolean =
      uiSelectedColumnValues.length == 0 &&
      uiSelectedUserFilters.length == 0 &&
      ExpressionHelper.IsEmptyRange(uiSelectedRangeExpression);

    let hasUserFilter: boolean = uiSelectedUserFilters.length > 0;

    let closeButton = (
      <ButtonClose
        onClick={() => this.onCloseForm()}
        tooltip={null}
        AccessLevel={AccessLevel.Full}
      />
    );

    let clearFilterButton = (
      <ButtonClear
        onClick={() => this.onClearFilter()}
        disabled={isEmptyFilter}
        tooltip={null}
        AccessLevel={AccessLevel.Full}
      ></ButtonClear>
    );

    let saveButton = (
      <ButtonSave
        onClick={() => this.onSaveFilter()}
        disabled={isEmptyFilter || hasUserFilter}
        tooltip={'Save as User Filter'}
        AccessLevel={AccessLevel.Full}
      ></ButtonSave>
    );

    return (
      <div>
        {StringExtensions.IsNullOrEmpty(isFilterable) ? (
          <FilterFormPanel
            style={panelStyle}
            ColumnMenuTab={this.state.SelectedTab}
            ColumnMenuTabChanged={e => this.onSelectTab(e)}
            IsAlwaysFilter={this.props.EmbedColumnMenu}
            clearFilterButton={clearFilterButton}
            saveButton={saveButton}
            closeButton={closeButton}
            showCloseButton={this.props.ShowCloseButton}
            autoApplyFilter={
              this.props.Blotter.blotterOptions.filterOptions!.autoApplyFilter ? true : false
            }
            applyFilterButtonDisabled={ExpressionHelper.IsEmptyExpression(
              this.state.editedColumnFilter!.Filter
            )}
            onFilterApplied={() => this.onFilterApplied()}
          >
            {this.state.SelectedTab == ColumnMenuTab.Menu ? (
              <ListBoxMenu
                MenuItems={this.props.MenuItems}
                onMenuItemClick={action => this.onMenuItemClick(action)}
              />
            ) : (
              <div>
                {this.state.ShowWaitingMessage ? (
                  <Waiting WaitingMessage="Retrieving Column Values..." />
                ) : (
                  <ListBoxFilterForm
                    CurrentColumn={this.props.CurrentColumn}
                    Columns={this.props.Columns}
                    ColumnValuePairs={this.state.ColumnValuePairs}
                    DataType={this.props.CurrentColumn.DataType}
                    DistinctCriteriaPairValue={this.state.DistinctCriteriaPairValue}
                    UiSelectedColumnValues={uiSelectedColumnValues}
                    UiSelectedUserFilters={uiSelectedUserFilters}
                    UiSelectedRange={uiSelectedRangeExpression}
                    UserFilters={appropriateFilterItems}
                    onColumnValueSelectedChange={list => this.onClickColumValue(list)}
                    onUserFilterSelectedChange={list => this.onClickUserFilter(list)}
                    Operators={leafExpressionOperators}
                    onCustomRangeExpressionChange={range => this.onSetCustomExpression(range)}
                  />
                )}
              </div>
            )}
          </FilterFormPanel>
        ) : (
          <HelpBlock>{isFilterable}</HelpBlock>
        )}
      </div>
    );
  }

  isFilterable(): string {
    if (!this.props.CurrentColumn.Filterable) {
      return 'Column is not filterable';
    }
    return '';
  }

  onSelectTab(tab: any): any {
    this.setState({ SelectedTab: tab } as FilterFormState);
  }

  getLeafExpressionOperatorsForDataType(dataType: DataType): LeafExpressionOperator[] {
    return ExpressionHelper.GetOperatorsForDataType(dataType);
  }

  onClickColumValue(columnValues: string[]) {
    let displayValues: string[] = [];
    let rawValues: string[] = [];

    columnValues.forEach(columnValue => {
      let columnValuePair: IRawValueDisplayValuePair =
        this.state.DistinctCriteriaPairValue == DistinctCriteriaPairValue.DisplayValue
          ? this.state.ColumnValuePairs.find(cvp => cvp.DisplayValue == columnValue)
          : this.state.ColumnValuePairs.find(cvp => cvp.RawValue == columnValue);
      if (columnValuePair) {
        // might not be if previous filter is not in current list
        displayValues.push(columnValuePair.DisplayValue);
        rawValues.push(columnValuePair.RawValue);
      }
    });

    let userFilters =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.FilterExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.FilterExpressions[0].Filters
        : [];

    let rangeExpressions =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.RangeExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.RangeExpressions[0].Ranges
        : [];

    this.persistFilter(displayValues, rawValues, userFilters, rangeExpressions);
  }

  onClickUserFilter(userFilters: string[]) {
    let columnDisplayValues =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues
        : [];

    let columnRawValues =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnRawValues
        : [];

    let rangeExpressions =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.RangeExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.RangeExpressions[0].Ranges
        : [];

    this.persistFilter(columnDisplayValues, columnRawValues, userFilters, rangeExpressions);
  }

  onSetCustomExpression(rangeExpression: QueryRange) {
    let userFilters =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.FilterExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.FilterExpressions[0].Filters
        : [];

    let columnDisplayValues =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues
        : [];

    let columnRawValues =
      this.state.editedColumnFilter &&
      this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
        ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnRawValues
        : [];

    if (rangeExpression == null) {
      this.persistFilter(columnDisplayValues, columnRawValues, userFilters, []);
    } else {
      this.persistFilter(columnDisplayValues, columnRawValues, userFilters, [rangeExpression]);
    }
  }

  persistFilter(
    columnDisplayValues: string[],
    columnRawValues: string[],
    userFilters: string[],
    rangeExpressions: QueryRange[]
  ): void {
    let expression: Expression;
    expression = ExpressionHelper.CreateSingleColumnExpression(
      this.props.CurrentColumn.ColumnId,
      columnDisplayValues,
      columnRawValues,
      userFilters,
      rangeExpressions
    );

    let columnFilter: ColumnFilter = this.state.editedColumnFilter;
    columnFilter.Filter = expression;

    this.setState({
      editedColumnFilter: columnFilter,
    });

    //delete if empty
    if (
      columnDisplayValues.length == 0 &&
      columnRawValues.length == 0 &&
      userFilters.length == 0 &&
      rangeExpressions.length == 0
    ) {
      this.props.onClearColumnFilter(columnFilter);
    } else {
      if (this.props.Blotter.blotterOptions!.filterOptions!.autoApplyFilter) {
        this.props.onSetColumnFilter(columnFilter);
      }
    }
  }

  onSaveFilter() {
    let prompt: IUIPrompt = {
      Header: 'Enter name for User Filter',
      Msg: '',
      ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(
        this.state.editedColumnFilter,
        ''
      ),
    };
    this.props.onShowPrompt(prompt);
  }

  onClearFilter() {
    this.persistFilter([], [], [], []);
  }

  onFilterApplied() {
    // do some existing or real
    this.props.onAddColumnFilter(this.state.editedColumnFilter);

    this.props.onHideFilterForm();
  }

  onCloseForm() {
    this.props.onHideFilterForm();
  }

  onMenuItemClick(action: Redux.Action): any {
    this.props.onMenuItemClick(action);
    this.props.onHideFilterForm();
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CurrentColumn: ownProps.CurrentColumn,
    Blotter: ownProps.Blotter,
    Columns: state.Grid.Columns,
    ColumnFilters: state.ColumnFilter.ColumnFilters,
    UserFilters: state.UserFilter.UserFilters,
    ColumnCategories: state.ColumnCategory.ColumnCategories,
    SystemFilters: state.SystemFilter.SystemFilters,
    NamedFilters: state.NamedFilter.NamedFilters,
    ShowCloseButton: ownProps.ShowCloseButton,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onMenuItemClick: (action: Redux.Action) => dispatch(action),
    onClearColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter)),
    onAddColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterAdd(columnFilter)),
    onEditColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterEdit(columnFilter)),
    onSetColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterSet(columnFilter)),
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onHideFilterForm: () => dispatch(GridRedux.FilterFormHide()),
  };
}

export let FilterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterFormComponent);

export const FilterFormReact = (FilterContext: IColumnFilterContext) => (
  <Provider store={FilterContext.Blotter.adaptableBlotterStore.TheStore}>
    <FilterForm
      Blotter={FilterContext.Blotter}
      CurrentColumn={FilterContext.Column}
      TeamSharingActivated={false}
      EmbedColumnMenu={FilterContext.Blotter.embedColumnMenu}
      ShowCloseButton={FilterContext.ShowCloseButton}
    />
  </Provider>
);

let panelStyle = {
  width: '235px',
};
