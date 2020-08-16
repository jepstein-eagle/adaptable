import * as React from 'react';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import * as ColumnFilterRedux from '../../../Redux/ActionsReducers/ColumnFilterRedux';
import * as GridRedux from '../../../Redux/ActionsReducers/GridRedux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import {
  DataType,
  SortOrder,
  DistinctCriteriaPairValue,
  LeafExpressionOperator,
  ColumnMenuTab,
} from '../../../PredefinedConfig/Common/Enums';
import { ListBoxFilterForm } from './ListBoxFilterForm';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { ButtonClose } from '../Buttons/ButtonClose';
import { Expression, QueryRange } from '../../../PredefinedConfig/Common/Expression';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ButtonClear } from '../Buttons/ButtonClear';
import { Waiting } from './Waiting';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ListBoxMenu } from './ListBoxMenu';

import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { FilterFormPanel } from '../Panels/FilterFormPanel';
import { ButtonSave } from '../Buttons/ButtonSave';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { IUIPrompt } from '../../../Utilities/Interface/IMessage';
import HelpBlock from '../../../components/HelpBlock';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';
import AdaptableContext from '../../AdaptableContext';
import ListGroupItem from '../../../components/List/ListGroupItem';
import CheckBox from '../../../components/CheckBox';
import { Flex } from 'rebass';
import { ColumnFilter, FilterPredicate } from '../../../PredefinedConfig/FilterState';

interface FilterFormProps extends StrategyViewPopupProps<FilterFormComponent> {
  CurrentColumn: AdaptableColumn;
  Adaptable: IAdaptable;
  Columns: AdaptableColumn[];
  SystemFilters: string[];
  ColumnCategories: ColumnCategory[];
  ColumnFilters: ColumnFilter[];
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
  currentTab: 'values' | 'predicates';
}

const panelStyle = {
  width: 235,
};

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
      currentTab: 'values',
    };
  }

  // TODO impl and call this to sync when column filters are cleared (eg: from toolbar)
  // syncColumnFilter() {
  //   let existingColumnFilter = this.props.ColumnFilters.find(
  //     cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
  //   );
  //   if (!existingColumnFilter) {
  //     existingColumnFilter = ObjectFactory.CreateColumnFilter(
  //       this.props.CurrentColumn.ColumnId,
  //       ExpressionHelper.CreateEmptyExpression()
  //     );
  //   }

  //   this.setState({
  //     editedColumnFilter: existingColumnFilter,
  //   });
  // }

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

      if (this.props.Adaptable.adaptableOptions.queryOptions.getColumnValues != null) {
        this.setState({ ShowWaitingMessage: true });
        this.props.Adaptable.adaptableOptions.queryOptions
          .getColumnValues(this.props.CurrentColumn.ColumnId)
          .then(result => {
            if (result == null) {
              // if nothing returned then default to normal
              columnValuePairs = this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(
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
                this.props.Adaptable.adaptableOptions.queryOptions.maxColumnValueItemsDisplayed
              );
              distinctItems.forEach(distinctItem => {
                let displayValue =
                  result.DistinctCriteriaPairValue == DistinctCriteriaPairValue.DisplayValue
                    ? this.props.Adaptable.getDisplayValueFromRawValue(
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
              this.props.Adaptable.api.userInterfaceApi.setColumnPermittedValues(
                this.props.CurrentColumn.ColumnId,
                distinctItems
              );
            }
          });
      } else {
        columnValuePairs = this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(
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

    const columnPredicates = this.props.Adaptable.api.systemFilterApi.getFilterPredicatesForColumn(
      this.props.CurrentColumn
    );

    let uiSelectedColumnValues = this.state.editedColumnFilter?.Values || [];
    let uiSelectedColumnPredicates = this.state.editedColumnFilter?.Predicates || [];
    let isEmptyFilter: boolean =
      uiSelectedColumnValues.length == 0 && uiSelectedColumnPredicates.length === 0;

    let closeButton = (
      <ButtonClose onClick={() => this.onCloseForm()} tooltip={null} AccessLevel={'Full'} />
    );

    let clearFilterButton = (
      <ButtonClear
        onClick={() => this.onClearFilter()}
        disabled={isEmptyFilter}
        tooltip={null}
        AccessLevel={'Full'}
      />
    );

    let saveButton = (
      <ButtonSave
        onClick={() => {}}
        disabled={true}
        tooltip={'Save as User Filter'}
        AccessLevel={'Full'}
      />
    );

    const useVendorStyle = !!this.props.Adaptable.adaptableOptions.filterOptions!
      .useVendorFilterFormStyle;

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
              this.props.Adaptable.adaptableOptions.filterOptions!.autoApplyFilter ? true : false
            }
            useVendorStyle={useVendorStyle}
            applyFilterButtonDisabled={isEmptyFilter}
            onFilterApplied={() => this.onFilterApplied()}
          >
            {this.state.SelectedTab == ColumnMenuTab.Menu ? (
              <ListBoxMenu
                MenuItems={this.props.Adaptable.buildStandaloneColumnHeader(
                  this.props.CurrentColumn
                )}
                onMenuItemClick={menuItem => this.onMenuItemClick(menuItem)}
              />
            ) : (
              <div>
                <button onClick={() => this.setState({ currentTab: 'values' })}>Values</button>
                <button onClick={() => this.setState({ currentTab: 'predicates' })}>Filters</button>
                {this.state.currentTab === 'values' && (
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
                        useVendorStyle={useVendorStyle}
                        onColumnValueSelectedChange={list => this.onColumnValuesChange(list)}
                      />
                    )}
                  </div>
                )}
                {this.state.currentTab === 'predicates' && (
                  <div>
                    {columnPredicates.map((columnPredicate, index) =>
                      this.renderColumnPredicate(columnPredicate, index)
                    )}
                  </div>
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

  private renderColumnPredicate(columnPredicate: FilterPredicate, index: number): JSX.Element {
    const predicate = this.state.editedColumnFilter.Predicates?.find(
      item => item.PredicateId === columnPredicate.id
    );
    return (
      <Flex key={index}>
        <CheckBox
          variant="agGrid"
          fontSize="12px"
          margin={1}
          flex={1}
          checked={predicate !== undefined}
          onChange={checked => this.toggleColumnPredicate(checked, columnPredicate)}
        >
          {columnPredicate.name}
        </CheckBox>
        <Flex flex={1}>
          {predicate !== undefined &&
            columnPredicate.inputs &&
            columnPredicate.inputs.map((predicateInput, index) => (
              <input
                key={index}
                type={predicateInput.type}
                value={predicate.Inputs[index]}
                onChange={e => this.changeColumnPredicateInput(e, columnPredicate, index)}
                style={{ flex: 1, width: 0, minWidth: 0 }}
              />
            ))}
        </Flex>
      </Flex>
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

  getLeafExpressionOperatorsForDataType(
    dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown'
  ): LeafExpressionOperator[] {
    return ExpressionHelper.GetOperatorsForDataType(dataType);
  }

  onColumnValuesChange(columnValues: any[]) {
    const { editedColumnFilter } = this.state;
    editedColumnFilter.Values = columnValues;
    this.setState({ editedColumnFilter });

    this.persistFilter();
  }

  persistFilter(): void {
    const { editedColumnFilter } = this.state;

    //delete if empty
    if (editedColumnFilter.Values?.length == 0 && editedColumnFilter.Predicates?.length == 0) {
      this.props.onClearColumnFilter(editedColumnFilter);
    } else {
      if (this.props.Adaptable.adaptableOptions!.filterOptions!.autoApplyFilter) {
        this.props.onSetColumnFilter(editedColumnFilter);
      }
    }
  }

  onClearFilter() {
    const { editedColumnFilter } = this.state;
    editedColumnFilter.Values = [];
    editedColumnFilter.Predicates = [];
    this.setState({ editedColumnFilter });

    this.persistFilter();
  }

  onFilterApplied() {
    // do some existing or real
    this.props.onAddColumnFilter(this.state.editedColumnFilter);

    this.props.onHideFilterForm();
  }

  onCloseForm() {
    this.props.onHideFilterForm();
  }

  onMenuItemClick(menuItem: AdaptableMenuItem): any {
    //action: Redux.Action
    if (menuItem.ReduxAction) {
      this.props.onMenuItemClick(menuItem.ReduxAction);
    }
    if (menuItem.ClickFunction) {
      menuItem.ClickFunction();
    }
    this.props.onHideFilterForm();
  }

  toggleColumnPredicate(checked: boolean, predicate: FilterPredicate) {
    const { editedColumnFilter } = this.state;

    editedColumnFilter.Predicates = editedColumnFilter.Predicates || [];

    if (checked) {
      editedColumnFilter.Predicates = [
        ...editedColumnFilter.Predicates,
        {
          PredicateId: predicate.id,
          Inputs: (predicate.inputs || []).map(i => i.default ?? ''),
        },
      ];
    } else {
      editedColumnFilter.Predicates = editedColumnFilter.Predicates.filter(
        p => p.PredicateId !== predicate.id
      );
    }

    this.setState({ editedColumnFilter });
    this.persistFilter();
  }

  changeColumnPredicateInput(e: React.FormEvent, predicate: FilterPredicate, index: number) {
    const { value } = e.target as HTMLInputElement;
    const { editedColumnFilter } = this.state;

    editedColumnFilter.Predicates.find(p => p.PredicateId === predicate.id).Inputs[index] = value;

    this.setState({ editedColumnFilter });
    this.props.onSetColumnFilter(editedColumnFilter);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FilterFormProps> {
  return {
    CurrentColumn: ownProps.CurrentColumn,
    Adaptable: ownProps.Adaptable,
    Columns: state.Grid.Columns,
    ColumnFilters: state.Filter.ColumnFilters,
    ColumnCategories: state.ColumnCategory.ColumnCategories,
    SystemFilters: state.Filter.SystemFilters,
    ShowCloseButton: ownProps.ShowCloseButton,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FilterFormProps> {
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

export let FilterForm = connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);

export const FilterFormReact = (FilterContext: IColumnFilterContext) => (
  <Provider store={FilterContext.Adaptable.AdaptableStore.TheStore}>
    <ThemeProvider theme={theme}>
      <AdaptableContext.Provider value={FilterContext.Adaptable}>
        <FilterForm
          Adaptable={FilterContext.Adaptable}
          CurrentColumn={FilterContext.Column}
          TeamSharingActivated={false}
          EmbedColumnMenu={FilterContext.Adaptable.embedColumnMenu}
          ShowCloseButton={FilterContext.ShowCloseButton}
        />
      </AdaptableContext.Provider>
    </ThemeProvider>
  </Provider>
);
