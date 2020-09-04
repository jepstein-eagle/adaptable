import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as FilterRedux from '../../../Redux/ActionsReducers/FilterRedux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import Input from '../../../components/Input';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import AdaptableContext from '../../AdaptableContext';
import { AdaptableApi } from '../../../Api/AdaptableApi';
import { ColumnFilter } from '../../../PredefinedConfig/FilterState';
import OverlayTrigger from '../../../components/OverlayTrigger';
import SimpleButton from '../../../components/SimpleButton';
import Icon from '@mdi/react';
import { mdiFilterOutline, mdiClose } from '@mdi/js';
import { Flex, Box } from 'rebass';
import { ListBoxFilterForm } from './ListBoxFilterForm';
import { PredicateDef } from '../../../PredefinedConfig/Common/Predicate';
import { LogAdaptableError } from '../../../Utilities/Helpers/LoggingHelper';
import { IAdaptable } from '../../../types';

interface QuickFilterFormProps extends StrategyViewPopupProps<QuickFilterFormComponent> {
  api: AdaptableApi;
  adaptable: IAdaptable;
  currentColumn: AdaptableColumn;
  columnFilters: ColumnFilter[];
  onAddColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterAddAction;
  onEditColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterEditAction;
  onClearColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterClearAction;
}

export interface QuickFilterFormState {
  filter: ColumnFilter;
}

class QuickFilterFormComponent extends React.Component<QuickFilterFormProps, QuickFilterFormState> {
  private valuesDropdown?: { show: () => any; hide: () => any };
  constructor(props: QuickFilterFormProps) {
    super(props);
    this.state = {
      filter: this.getFilterFromProps(props),
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: QuickFilterFormProps) {
    this.setState({
      filter: this.getFilterFromProps(nextProps),
    });
  }
  getFilterFromProps(props: QuickFilterFormProps) {
    const filter = props.columnFilters.find(cf => cf.ColumnId == props.currentColumn.ColumnId);

    if (filter) return filter;

    if (!filter && props.currentColumn.DataType === 'Number') {
      return ObjectFactory.CreateColumnFilter(this.props.currentColumn.ColumnId, 'Equals', ['']);
    }

    if (!filter && props.currentColumn.DataType === 'String') {
      return ObjectFactory.CreateColumnFilter(this.props.currentColumn.ColumnId, 'Contains', ['']);
    }

    if (!filter && props.currentColumn.DataType === 'Date') {
      return ObjectFactory.CreateColumnFilter(this.props.currentColumn.ColumnId, 'On', ['']);
    }

    return ObjectFactory.CreateColumnFilter(this.props.currentColumn.ColumnId, null, null);
  }
  render(): any {
    const { filter } = this.state;

    const predicateDefs = this.props.api.filterApi.getFilterPredicateDefsForColumn(
      this.props.currentColumn
    );

    const activePredicateDef = this.props.api.predicateApi.getPredicateDefById(
      filter?.Predicate.PredicateId
    );

    if (!this.props.currentColumn || !this.props.currentColumn.Filterable) {
      return null;
    }

    return (
      <>
        <OverlayTrigger
          showEvent="mouseenter"
          hideEvent="mouseleave"
          alignHorizontal="left"
          targetOffset={10}
          hideDelay={300}
          render={() => (
            <Flex
              flexDirection="column"
              style={{
                fontSize: 'var(--ab-font-size-2)',
                border: '1px solid var(--ab-color-primarydark)',
                background: 'var(--ab-color-defaultbackground)',
                zIndex: 1000,
              }}
            >
              {filter?.Predicate.PredicateId && (
                <>
                  <SimpleButton p={2} variant="text" onClick={() => this.clearFilter()}>
                    <span style={{ width: 20, marginRight: 10 }}>
                      <Icon size="1rem" path={mdiClose} />
                    </span>
                    Clear
                  </SimpleButton>
                </>
              )}
              {predicateDefs.map(p => (
                <SimpleButton
                  key={p.id}
                  p={2}
                  variant="text"
                  tone={filter?.Predicate.PredicateId === p.id ? 'info' : 'none'}
                  onClick={() => this.selectColumnPredicate(p.id)}
                >
                  <span style={{ width: 20, marginRight: 10 }}>{this.renderPredicateIcon(p)}</span>
                  {p.label}
                </SimpleButton>
              ))}
            </Flex>
          )}
        >
          <SimpleButton style={{ borderRadius: 0, borderColor: 'var(--ab-color-primarydark)' }}>
            {this.renderPredicateIcon(activePredicateDef)}
          </SimpleButton>
        </OverlayTrigger>
        {filter?.Predicate.PredicateId === 'Values' && this.renderValuesDropdown(filter)}
        {filter?.Predicate.PredicateId !== 'Values' &&
          activePredicateDef &&
          activePredicateDef?.inputs === undefined && <Box p={1}>{activePredicateDef.label}</Box>}
        {activePredicateDef?.inputs?.map((predicateInput, index) => (
          <Input
            key={index}
            type={predicateInput.type === 'number' ? 'text' : predicateInput.type}
            autoFocus={index === 0}
            value={filter.Predicate.Inputs?.[index] ?? ''}
            onChange={(e: React.FormEvent) => this.changeColumnPredicateInput(e, index)}
            onKeyDownCapture={(e: React.KeyboardEvent) => {
              if (e.nativeEvent.key === 'Escape') {
                e.nativeEvent.preventDefault();
                e.nativeEvent.stopPropagation();
                this.clearFilter();
              }
            }}
            style={{
              flex: 1,
              minWidth: 0,
              padding: 'var(--ab-space-1)',
              borderRadius: 0,
              borderLeftWidth: 0,
            }}
          />
        ))}
      </>
    );
  }

  renderPredicateIcon(predicateDef: PredicateDef) {
    if (!predicateDef || !predicateDef.icon) {
      return <Icon size="1rem" path={mdiFilterOutline} />;
    }
    if ('text' in predicateDef.icon) {
      return <span>{predicateDef.icon.text}</span>;
    }
    if ('path' in predicateDef.icon) {
      return <Icon size="1rem" path={predicateDef.icon.path} />;
    }
  }

  renderValuesDropdown(filter: ColumnFilter) {
    let distinctColumnValues: any[] = this.props.api.columnApi.getDistinctDisplayValuesForColumn(
      this.props.currentColumn.ColumnId
    );

    return (
      <OverlayTrigger
        alignHorizontal="left"
        showEvent="mouseenter"
        hideEvent="mouseleave"
        hideDelay={300}
        ref={api => {
          this.valuesDropdown = api;
        }}
        render={() => (
          <Flex
            p={2}
            flexDirection="column"
            style={{
              fontSize: 'var(--ab-font-size-2)',
              border: '1px solid var(--ab-color-primarydark)',
              background: 'var(--ab-color-defaultbackground)',
              zIndex: 1000,
            }}
          >
            <Flex mb={2}>
              <SimpleButton onClick={() => this.clearFilter()}>Clear Filter</SimpleButton>
              {this.props.adaptable.adaptableOptions?.filterOptions?.autoApplyFilter == false && (
                <SimpleButton ml={2} onClick={() => this.updateFilter(this.state.filter)}>
                  Apply Filter
                </SimpleButton>
              )}
            </Flex>
            <ListBoxFilterForm
              currentColumn={this.props.currentColumn}
              columns={[]}
              columnDistinctValues={distinctColumnValues}
              dataType={this.props.currentColumn.DataType}
              uiSelectedColumnValues={this.state.filter.Predicate.Inputs}
              useVendorStyle={true}
              onColumnValueSelectedChange={list => this.onColumnValuesChange(list)}
            />
          </Flex>
        )}
      >
        <SimpleButton
          style={{
            flex: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            borderRadius: 0,
            borderLeftWidth: 0,
            borderColor: 'var(--ab-color-primarydark)',
          }}
        >
          {filter.Predicate.Inputs.join(', ') || 'Select Values'}
        </SimpleButton>
      </OverlayTrigger>
    );
  }

  onColumnValuesChange(columnValues: any[]) {
    const { filter } = this.state;

    filter.Predicate = { PredicateId: 'Values', Inputs: columnValues };

    if (this.props.adaptable.adaptableOptions?.filterOptions?.autoApplyFilter) {
      this.updateFilter(filter);
    } else {
      this.setState({ filter });
    }
  }

  selectColumnPredicate(predicateId: string) {
    const { filter } = this.state;
    const predicateDef = this.props.api.predicateApi.getPredicateDefById(predicateId);

    filter.Predicate = {
      PredicateId: predicateId,
      Inputs: (predicateDef.inputs ?? []).map(i => i.defaultValue ?? ''),
    };

    this.updateFilter(filter);

    if (predicateId === 'Values') {
      requestAnimationFrame(() => {
        if (this.valuesDropdown) {
          this.valuesDropdown.show();
        }
      });
    }
  }

  debouncedAddFilter = _.debounce(() => this.props.onAddColumnFilter(this.state.filter), 250);

  debouncedEditFilter = _.debounce(() => this.props.onEditColumnFilter(this.state.filter), 250);

  private updateFilter(filter: ColumnFilter) {
    this.setState({ filter });

    if (filter.Uuid) {
      // TODO debounce here?
      this.debouncedEditFilter();
      // this.props.onEditColumnFilter(filter);
    } else {
      // TODO debounce here?
      this.debouncedAddFilter();
      //  this.props.onAddColumnFilter(filter);
    }
  }

  changeColumnPredicateInput(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const predicateId = this.getPredicateIdForShortcutValue(value);

    if (predicateId) {
      this.selectColumnPredicate(predicateId);
    } else {
      const { filter } = this.state;
      filter.Predicate.Inputs = filter.Predicate.Inputs || [];
      filter.Predicate.Inputs[index] = value;
      this.updateFilter(filter);
    }
  }

  getPredicateIdForShortcutValue(value: string) {
    return this.props.api.filterApi.findPredicateDefByShortcut(value, this.props.currentColumn)?.id;
  }

  clearFilter() {
    const { filter } = this.state;
    this.props.onClearColumnFilter(filter);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<QuickFilterFormProps> {
  return {
    currentColumn: ownProps.currentColumn,
    columnFilters: state.Filter.ColumnFilters,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QuickFilterFormProps> {
  return {
    onAddColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterAdd(columnFilter)),
    onEditColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterEdit(columnFilter)),
    onClearColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterClear(columnFilter)),
  };
}

export let QuickFilterForm = connect(mapStateToProps, mapDispatchToProps)(QuickFilterFormComponent);

export const QuickFilterFormReact = (FilterContext: IColumnFilterContext) => (
  <Provider store={FilterContext.Adaptable.adaptableStore.TheStore}>
    <ThemeProvider theme={theme}>
      <AdaptableContext.Provider value={FilterContext.Adaptable}>
        <QuickFilterForm
          api={FilterContext.Adaptable.api}
          adaptable={FilterContext.Adaptable}
          currentColumn={FilterContext.Column}
          teamSharingActivated={false}
          embedColumnMenu={FilterContext.Adaptable.embedColumnMenu}
        />
      </AdaptableContext.Provider>
    </ThemeProvider>
  </Provider>
);
