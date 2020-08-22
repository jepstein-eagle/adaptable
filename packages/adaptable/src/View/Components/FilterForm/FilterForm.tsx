import * as React from 'react';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import * as FilterRedux from '../../../Redux/ActionsReducers/FilterRedux';
import * as GridRedux from '../../../Redux/ActionsReducers/GridRedux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import {
  DataType,
  SortOrder,
  CellValueType,
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
import Radio from '../../../components/Radio';

interface FilterFormProps extends StrategyViewPopupProps<FilterFormComponent> {
  CurrentColumn: AdaptableColumn;
  Adaptable: IAdaptable;
  Columns: AdaptableColumn[];
  SystemFilters: string[];
  ColumnCategories: ColumnCategory[];
  ColumnFilters: ColumnFilter[];
  EmbedColumnMenu: boolean;
  ShowCloseButton: boolean;
  onClearColumnFilter: (columnfilter: ColumnFilter) => FilterRedux.ColumnFilterClearAction;
  onAddColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterAddAction;
  onEditColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterEditAction;
  onSetColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterSetAction;
  onHideFilterForm: () => GridRedux.FilterFormHideAction;
  onMenuItemClick: (action: Redux.Action) => Redux.Action;
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
}

export interface FilterFormState {
  DistinctColumnValues: any[];
  ShowWaitingMessage: boolean;
  SelectedTab: ColumnMenuTab;
  // DistinctCriteriaPairValue: CellValueType;
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
    // if (!existingColumnFilter) {
    //   existingColumnFilter = ObjectFactory.CreateColumnFilter(
    //     this.props.CurrentColumn.ColumnId,
    //     null,
    //     null
    //   );
    // }

    this.state = {
      DistinctColumnValues: [],
      ShowWaitingMessage: false,
      SelectedTab: ColumnMenuTab.Filter,
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
      let existingColumnFilter = this.props.ColumnFilters.find(
        cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
      );

      let distinctColumnValues: any[] = this.props.Adaptable.api.columnApi.getDistinctValuesForColumn(
        this.props.CurrentColumn.ColumnId
      );
      distinctColumnValues = ArrayExtensions.sortArray(distinctColumnValues, SortOrder.Asc);

      this.setState({
        DistinctColumnValues: distinctColumnValues,
        ShowWaitingMessage: false,
        editedColumnFilter: existingColumnFilter,
      });
      // if (!existingColumnFilter) {
      //   existingColumnFilter = ObjectFactory.CreateColumnFilter(
      //     this.props.CurrentColumn.ColumnId,
      //     null,
      //     null
      //   );
      // }
    }
  }

  render(): any {
    let isFilterable: string = this.isFilterable();

    const columnPredicates = this.props.Adaptable.api.filterApi.getFilterPredicatesForColumn(
      this.props.CurrentColumn
    );

    let uiSelectedColumnValues =
      this.state.editedColumnFilter?.PredicateId === 'Values'
        ? this.state.editedColumnFilter.Inputs
        : [];

    let isEmptyFilter: boolean =
      this.state.editedColumnFilter === undefined ||
      this.state.editedColumnFilter.PredicateId === undefined;

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
                        ColumnDistinctValues={this.state.DistinctColumnValues}
                        DataType={this.props.CurrentColumn.DataType}
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
    const { editedColumnFilter } = this.state;
    const checked = editedColumnFilter.PredicateId === columnPredicate.id;

    return (
      <Flex key={index}>
        <Radio
          fontSize="12px"
          margin={1}
          flex={1}
          checked={checked}
          onChange={() => this.selectColumnPredicate(columnPredicate)}
        >
          {columnPredicate.name}
        </Radio>
        <Flex flex={1}>
          {checked &&
            columnPredicate.inputs &&
            columnPredicate.inputs.map((predicateInput, index) => (
              <input
                key={index}
                type={predicateInput.type}
                autoFocus={index === 0}
                value={editedColumnFilter.Inputs[index]}
                onChange={e => this.changeColumnPredicateInput(e, index)}
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

    editedColumnFilter.PredicateId = 'Values';
    editedColumnFilter.Inputs = columnValues;

    this.setState({ editedColumnFilter });
    this.persistFilter();
  }

  persistFilter(): void {
    const { editedColumnFilter } = this.state;

    //delete if empty
    if (editedColumnFilter.PredicateId === 'Values' && editedColumnFilter.Inputs.length === 0) {
      this.props.onClearColumnFilter(editedColumnFilter);
    } else {
      if (this.props.Adaptable.adaptableOptions!.filterOptions!.autoApplyFilter) {
        this.props.onSetColumnFilter(editedColumnFilter);
      }
    }
  }

  onClearFilter() {
    const { editedColumnFilter } = this.state;

    editedColumnFilter.PredicateId = undefined;
    editedColumnFilter.Inputs = undefined;

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

  selectColumnPredicate(predicate: FilterPredicate) {
    const { editedColumnFilter } = this.state;

    editedColumnFilter.PredicateId = predicate.id;
    editedColumnFilter.Inputs = (predicate.inputs || []).map(i => i.default ?? '');

    this.setState({ editedColumnFilter });
    this.persistFilter();
  }

  changeColumnPredicateInput(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const { editedColumnFilter } = this.state;

    editedColumnFilter.Inputs[index] = value;

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
      dispatch(FilterRedux.ColumnFilterClear(columnFilter)),
    onAddColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterAdd(columnFilter)),
    onEditColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterEdit(columnFilter)),
    onSetColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterSet(columnFilter)),
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onHideFilterForm: () => dispatch(GridRedux.FilterFormHide()),
  };
}

export let FilterForm = connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);

export const FilterFormReact = (FilterContext: IColumnFilterContext) => (
  <Provider store={FilterContext.Adaptable.adaptableStore.TheStore}>
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
