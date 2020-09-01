import * as DeepDiff from 'deep-diff';
import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as FilterRedux from '../../../Redux/ActionsReducers/FilterRedux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { Expression, QueryRange } from '../../../PredefinedConfig/Common/Expression';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import {
  DataType,
  LeafExpressionOperator,
  SortOrder,
} from '../../../PredefinedConfig/Common/Enums';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { RangeHelper } from '../../../Utilities/Helpers/RangeHelper';
import Input from '../../../components/Input';
import { ThemeProvider, CSSProperties } from 'styled-components';
import theme from '../../../theme';
import AdaptableContext from '../../AdaptableContext';
import { AdaptableApi } from '../../../Api/AdaptableApi';
import { ColumnFilter } from '../../../PredefinedConfig/FilterState';
import DropdownButton from '../../../components/DropdownButton';
import OverlayTrigger from '../../../components/OverlayTrigger';
import SimpleButton from '../../../components/SimpleButton';
import Icon from '@mdi/react';
import { mdiFilterOutline, mdiClose } from '@mdi/js';
import { Flex, Box } from 'rebass';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';
import { ListBoxFilterForm } from './ListBoxFilterForm';
import { PredicateDef } from '../../../PredefinedConfig/Common/Predicate';

interface QuickFilterFormProps extends StrategyViewPopupProps<QuickFilterFormComponent> {
  api: AdaptableApi;
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
  }
  render(): any {
    const { filter } = this.state;

    const predicateDefs = this.props.api.filterApi.getFilterPredicateDefsForColumn(
      this.props.currentColumn
    );

    const activePredicateDef = this.props.api.predicateApi.getPredicateDefById(
      filter?.Predicate.Id
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
                borderRadius: 'var(--ab__border-radius)',
                background: 'var(--ab-color-primarylight)',
                zIndex: 1000,
              }}
            >
              {filter?.Predicate.Id && (
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
                  tone={filter?.Predicate.Id === p.id ? 'info' : 'none'}
                  onClick={() => this.selectColumnPredicate(p.id)}
                >
                  <span style={{ width: 20, marginRight: 10 }}>{this.renderPredicateIcon(p)}</span>
                  {p.name}
                </SimpleButton>
              ))}
            </Flex>
          )}
        >
          <SimpleButton>{this.renderPredicateIcon(activePredicateDef)}</SimpleButton>
        </OverlayTrigger>
        {filter?.Predicate.Id === 'Values' && this.renderValuesDropdown(filter)}
        {filter?.Predicate.Id !== 'Values' &&
          activePredicateDef &&
          activePredicateDef?.inputs === undefined && <Box p={1}>{activePredicateDef.name}</Box>}
        {activePredicateDef?.inputs?.map((predicateInput, index) => (
          <Input
            key={index}
            type={predicateInput.type === 'number' ? 'text' : predicateInput.type}
            autoFocus={index === 0}
            value={filter.Predicate.Inputs[index]}
            onChange={(e: React.FormEvent) => this.changeColumnPredicateInput(e, index)}
            onKeyDownCapture={(e: React.KeyboardEvent) => {
              if (e.nativeEvent.key === 'Escape') {
                e.nativeEvent.preventDefault();
                e.nativeEvent.stopPropagation();
                this.clearFilter();
              }
            }}
            style={{ flex: 1, width: 0, minWidth: 0 }}
          />
        ))}
      </>
    );
  }

  renderPredicateIcon(predicateDef: PredicateDef) {
    if (!predicateDef) {
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
              borderRadius: 'var(--ab__border-radius)',
              background: 'white',
              zIndex: 1000,
            }}
          >
            <Flex mb={2}>
              <SimpleButton
                onClick={() => {
                  requestAnimationFrame(() => {
                    if (this.valuesDropdown) {
                      this.valuesDropdown.hide();
                    }
                  });
                }}
              >
                Close
              </SimpleButton>
              <SimpleButton onClick={() => this.clearFilter()}>Clear Filter</SimpleButton>
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
          }}
        >
          {filter.Predicate.Inputs.join(', ') || 'Select Values'}
        </SimpleButton>
      </OverlayTrigger>
    );
  }

  onColumnValuesChange(columnValues: any[]) {
    const { filter } = this.state;

    filter.Predicate = { Id: 'Values', Inputs: columnValues };
    this.updateFilter(filter);
  }

  selectColumnPredicate(predicateId: string) {
    const { filter } = this.state;
    const predicateDef = this.props.api.predicateApi.getPredicateDefById(predicateId);

    filter.Predicate = {
      Id: predicateId,
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

  private updateFilter(filter: ColumnFilter) {
    this.setState({ filter });

    // if (filter.Predicate.Inputs?.some(input => StringExtensions.IsNullOrEmpty(input))) {
    //   return;
    // }

    if (filter.Uuid) {
      // TODO debounce here?
      this.props.onEditColumnFilter(filter);
    } else {
      // TODO debounce here?
      this.props.onAddColumnFilter(filter);
    }
  }

  changeColumnPredicateInput(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const predicateId = this.getPredicateIdForShortcutValue(value);

    if (predicateId) {
      this.selectColumnPredicate(predicateId);
    } else {
      const { filter } = this.state;
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
          currentColumn={FilterContext.Column}
          teamSharingActivated={false}
          embedColumnMenu={FilterContext.Adaptable.embedColumnMenu}
        />
      </AdaptableContext.Provider>
    </ThemeProvider>
  </Provider>
);
