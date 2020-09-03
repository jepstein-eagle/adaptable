import * as React from 'react';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import * as FilterRedux from '../../../Redux/ActionsReducers/FilterRedux';
import * as GridRedux from '../../../Redux/ActionsReducers/GridRedux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { DataType, ColumnMenuTab } from '../../../PredefinedConfig/Common/Enums';
import { ListBoxFilterForm } from './ListBoxFilterForm';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { ButtonClose } from '../Buttons/ButtonClose';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ButtonClear } from '../Buttons/ButtonClear';
import { Waiting } from './Waiting';
import { ListBoxMenu } from './ListBoxMenu';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { FilterFormPanel } from '../Panels/FilterFormPanel';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { IUIPrompt } from '../../../Utilities/Interface/IMessage';
import HelpBlock from '../../../components/HelpBlock';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';
import AdaptableContext from '../../AdaptableContext';
import { Flex } from 'rebass';
import { ColumnFilter } from '../../../PredefinedConfig/FilterState';
import Radio from '../../../components/Radio';
import { PredicateDef } from '../../../PredefinedConfig/Common/Predicate';
import Helper from '../../../Utilities/Helpers/Helper';

interface FilterFormProps extends StrategyViewPopupProps<FilterFormComponent> {
  currentColumn: AdaptableColumn;
  adaptable: IAdaptable;
  columns: AdaptableColumn[];
  systemFilters: string[];
  columnFilters: ColumnFilter[];
  embedColumnMenu: boolean;
  showCloseButton: boolean;
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

    let existingColumnFilter = this.props.columnFilters.find(
      cf => cf.ColumnId == this.props.currentColumn.ColumnId
    );

    if (!existingColumnFilter) {
      existingColumnFilter = ObjectFactory.CreateColumnFilter(
        this.props.currentColumn.ColumnId,
        null,
        null
      );
    }

    this.state = {
      DistinctColumnValues: [],
      ShowWaitingMessage: false,
      SelectedTab: ColumnMenuTab.Filter,
      editedColumnFilter: existingColumnFilter,
      currentTab:
        existingColumnFilter &&
        existingColumnFilter.Predicate &&
        existingColumnFilter.Predicate.Id &&
        existingColumnFilter.Predicate.Id != 'Values'
          ? 'predicates'
          : 'values',
    };
  }

  componentDidMount() {
    if (this.props.currentColumn.DataType != DataType.Boolean) {
      let distinctColumnValues: any[] = this.props.adaptable.api.columnApi.getDistinctDisplayValuesForColumn(
        this.props.currentColumn.ColumnId
      );

      this.setState({
        DistinctColumnValues: distinctColumnValues,
        ShowWaitingMessage: false,
      });
    }
  }

  render(): any {
    let isFilterable: string = this.isFilterable();

    const predicateDefs = this.props.adaptable.api.filterApi.getFilterPredicateDefsForColumn(
      this.props.currentColumn
    );

    let uiSelectedColumnValues =
      this.state.editedColumnFilter?.Predicate?.Id === 'Values'
        ? this.state.editedColumnFilter.Predicate.Inputs
        : [];

    let isEmptyFilter: boolean =
      Helper.objectNotExists(this.state.editedColumnFilter) ||
      Helper.objectNotExists(this.state.editedColumnFilter.Predicate) ||
      Helper.objectNotExists(this.state.editedColumnFilter.Predicate.Id);

    let closeButton = (
      <ButtonClose onClick={() => this.onCloseForm()} tooltip={null} accessLevel={'Full'} />
    );

    let clearFilterButton = (
      <ButtonClear
        onClick={() => this.onClearFilter()}
        disabled={isEmptyFilter}
        tooltip={null}
        accessLevel={'Full'}
        showText={true}
        showIcon={false}
      ></ButtonClear>
    );

    const useVendorStyle = !!this.props.adaptable.adaptableOptions.filterOptions!
      .useVendorFilterFormStyle;

    return (
      <div>
        {StringExtensions.IsNullOrEmpty(isFilterable) ? (
          <FilterFormPanel
            style={panelStyle}
            ColumnMenuTab={this.state.SelectedTab}
            ColumnMenuTabChanged={e => this.onSelectTab(e)}
            IsAlwaysFilter={this.props.embedColumnMenu}
            clearFilterButton={clearFilterButton}
            //saveButton={saveButton} // removing in v.7 until we re-add User Filter
            closeButton={closeButton}
            showCloseButton={this.props.showCloseButton}
            autoApplyFilter={
              this.props.adaptable.adaptableOptions.filterOptions!.autoApplyFilter ? true : false
            }
            useVendorStyle={useVendorStyle}
            applyFilterButtonDisabled={isEmptyFilter}
            onFilterApplied={() => this.onFilterApplied()}
          >
            {this.state.SelectedTab == ColumnMenuTab.Menu ? (
              <ListBoxMenu
                MenuItems={this.props.adaptable.buildStandaloneColumnHeader(
                  this.props.currentColumn
                )}
                onMenuItemClick={menuItem => this.onMenuItemClick(menuItem)}
              />
            ) : (
              <div>
                <Radio
                  marginLeft={1}
                  flex={1}
                  checked={this.state.currentTab == 'values'}
                  onChange={() => this.setState({ currentTab: 'values' })}
                >
                  Column Values
                </Radio>
                <Radio
                  marginLeft={2}
                  flex={1}
                  checked={this.state.currentTab == 'predicates'}
                  onChange={() => this.setState({ currentTab: 'predicates' })}
                >
                  Filters
                </Radio>
                {/*
               <button onClick={() => this.setState({ currentTab: 'values' })}>Values</button>
              <button onClick={() => this.setState({ currentTab: 'predicates' })}>Filters</button>   */}

                {this.state.currentTab === 'values' && (
                  <div>
                    {this.state.ShowWaitingMessage ? (
                      <Waiting WaitingMessage="Retrieving Column Values..." />
                    ) : (
                      <ListBoxFilterForm
                        currentColumn={this.props.currentColumn}
                        columns={this.props.columns}
                        columnDistinctValues={this.state.DistinctColumnValues}
                        dataType={this.props.currentColumn.DataType}
                        uiSelectedColumnValues={uiSelectedColumnValues}
                        useVendorStyle={useVendorStyle}
                        onColumnValueSelectedChange={list => this.onColumnValuesChange(list)}
                      />
                    )}
                  </div>
                )}
                {this.state.currentTab === 'predicates' && (
                  <div>
                    {' '}
                    <hr></hr>
                    {predicateDefs
                      .filter(p => p.id != 'Values')
                      .map((predicateDef, index) =>
                        this.renderColumnPredicate(predicateDef, index)
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

  private renderColumnPredicate(predicateDef: PredicateDef, index: number): JSX.Element {
    const { editedColumnFilter } = this.state;
    const checked = editedColumnFilter?.Predicate?.Id === predicateDef.id;

    return (
      <Flex key={index}>
        <Radio
          fontSize={'var(--ab-font-size-2)'}
          margin={1}
          flex={1}
          checked={checked}
          onChange={() => this.selectColumnPredicate(predicateDef)}
        >
          {predicateDef.label}
        </Radio>
        <Flex flex={1}>
          {checked &&
            predicateDef.inputs &&
            predicateDef.inputs.map((predicateInput, index) => (
              <input
                key={index}
                type={predicateInput.type}
                autoFocus={index === 0}
                value={editedColumnFilter.Predicate.Inputs[index]}
                onChange={e => this.changeColumnPredicateInput(e, index)}
                style={{ flex: 1, width: 0, minWidth: 0, fontSize: 'var( --ab-font-size-1)' }}
              />
            ))}
        </Flex>
      </Flex>
    );
  }

  isFilterable(): string {
    if (!this.props.currentColumn.Filterable) {
      return 'Column is not filterable';
    }
    return '';
  }

  onSelectTab(tab: any): any {
    this.setState({ SelectedTab: tab } as FilterFormState);
  }

  onColumnValuesChange(columnValues: any[]) {
    const { editedColumnFilter } = this.state;

    editedColumnFilter.Predicate = {
      Id: 'Values',
      Inputs: columnValues,
    };

    this.setState({ editedColumnFilter });
    this.persistFilter();
  }

  persistFilter(): void {
    const { editedColumnFilter } = this.state;

    //delete if empty
    if (
      editedColumnFilter.Predicate === undefined ||
      (editedColumnFilter.Predicate.Id === 'Values' &&
        editedColumnFilter.Predicate.Inputs.length === 0)
    ) {
      this.props.onClearColumnFilter(editedColumnFilter);
    } else {
      if (this.props.adaptable.adaptableOptions!.filterOptions!.autoApplyFilter) {
        this.props.onSetColumnFilter(editedColumnFilter);
      }
    }
  }

  onClearFilter() {
    const { editedColumnFilter } = this.state;

    editedColumnFilter.Predicate = undefined;

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

  selectColumnPredicate(predicateDef: PredicateDef) {
    const { editedColumnFilter } = this.state;

    editedColumnFilter.Predicate = {
      Id: predicateDef.id,
      Inputs: (predicateDef.inputs ?? []).map(i => i.defaultValue ?? ''),
    };

    this.setState({ editedColumnFilter });
    this.persistFilter();
  }

  changeColumnPredicateInput(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const { editedColumnFilter } = this.state;

    editedColumnFilter.Predicate.Inputs[index] = value;

    this.setState({ editedColumnFilter });

    if (this.props.adaptable.adaptableOptions!.filterOptions!.autoApplyFilter) {
      this.props.onSetColumnFilter(editedColumnFilter);
    }
    // this.props.onSetColumnFilter(editedColumnFilter);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FilterFormProps> {
  return {
    currentColumn: ownProps.currentColumn,
    adaptable: ownProps.adaptable,
    columns: state.Grid.Columns,
    columnFilters: state.Filter.ColumnFilters,
    systemFilters: state.Filter.SystemFilters,
    showCloseButton: ownProps.showCloseButton,
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
          adaptable={FilterContext.Adaptable}
          currentColumn={FilterContext.Column}
          teamSharingActivated={false}
          embedColumnMenu={FilterContext.Adaptable.embedColumnMenu}
          showCloseButton={FilterContext.ShowCloseButton}
        />
      </AdaptableContext.Provider>
    </ThemeProvider>
  </Provider>
);
