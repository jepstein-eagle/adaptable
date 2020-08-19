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
import { DataType, LeafExpressionOperator } from '../../../PredefinedConfig/Common/Enums';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { RangeHelper } from '../../../Utilities/Helpers/RangeHelper';
import Input from '../../../components/Input';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { ThemeProvider, CSSProperties } from 'styled-components';
import theme from '../../../theme';
import AdaptableContext from '../../AdaptableContext';
import { AdaptableApi } from '../../../Api/AdaptableApi';
import { ColumnFilter, FilterPredicate } from '../../../PredefinedConfig/FilterState';
import DropdownButton from '../../../components/DropdownButton';
import OverlayTrigger from '../../../components/OverlayTrigger';
import SimpleButton from '../../../components/SimpleButton';
import Icon from '@mdi/react';
import { mdiFilterOutline, mdiClose } from '@mdi/js';
import { Flex, Box } from 'rebass';

/*
Rather than explain the code I will try to explain in an overview what this class is trying do.

It replaces the ag-Grid Filter bar providing our own custom implementation with wildcards

For current wildcards see: https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md

The main idea is that a user can create a Column Filter by hand.

By default it will be a 'Contains' Filter but we provide a number of wildcards (in the old Expression way of doing things, this was a Range Expression)

We first create a number of KeyValue pairs so we an match the wildcard string to the operator and we update teh QuickFilter as we go.

Note: The string is NOT saved and this is one way only. the Quick Filter bar does NOT show what is in the Filter - should it? Probably...

Just checked: the ag-Grid behaviour is really weird: (https://www.ag-grid.com/javascript-grid-floating-filters/)
a. if you do a Greater Than filter in the dropdown then the quick filter becomes greater than but there is no way to know
b.  if you do an In Rnage in the dropdown then the quick filter does indicate that but it becomes disabled and you cannot clear the filter easily

*/

interface QuickFilterFormProps extends StrategyViewPopupProps<QuickFilterFormComponent> {
  Api: AdaptableApi;
  CurrentColumn: AdaptableColumn;
  ColumnFilters: ColumnFilter[];
  onAddColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterAddAction;
  onEditColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterEditAction;
  onClearColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterClearAction;
}

export interface QuickFilterFormState {
  filter: ColumnFilter;
}

class QuickFilterFormComponent extends React.Component<QuickFilterFormProps, QuickFilterFormState> {
  render(): any {
    const filter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );

    const predicates = this.props.Api.filterApi.getFilterPredicatesForColumn(
      this.props.CurrentColumn
    );

    const activePredicate = predicates.find(p => p.id === filter?.PredicateId);

    return (
      this.props.CurrentColumn &&
      this.props.CurrentColumn.Filterable && (
        <>
          <OverlayTrigger
            showEvent="click"
            hideEvent="blur"
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
                {filter?.PredicateId && (
                  <>
                    <SimpleButton p={2} variant="text" onClick={() => this.clearColumnPredicate()}>
                      <span style={{ width: 20, marginRight: 10 }}>
                        <Icon size="1rem" path={mdiClose} />
                      </span>
                      Clear
                    </SimpleButton>
                  </>
                )}
                {predicates.map(p => (
                  <SimpleButton
                    key={p.id}
                    p={2}
                    variant="text"
                    tone={filter?.PredicateId === p.id ? 'info' : 'none'}
                    onClick={() => this.selectColumnPredicate(p.id)}
                  >
                    <span style={{ width: 20, marginRight: 10 }}>
                      {this.renderPredicateIcon(p)}
                    </span>
                    {p.name}
                  </SimpleButton>
                ))}
              </Flex>
            )}
          >
            <SimpleButton variant="text">{this.renderPredicateIcon(activePredicate)}</SimpleButton>
          </OverlayTrigger>
          {filter?.PredicateId === 'Values' && <div>{filter.Inputs.join(', ')}</div>}
          {filter?.PredicateId !== 'Values' &&
            activePredicate &&
            activePredicate?.inputs === undefined && <Box p={1}>{activePredicate.name}</Box>}
          {activePredicate?.inputs?.map((predicateInput, index) => (
            <input
              key={index}
              type={predicateInput.type}
              autoFocus={index === 0}
              value={filter.Inputs[index]}
              onChange={e => this.changeColumnPredicateInput(e, index)}
              style={{ flex: 1, width: 0, minWidth: 0 }}
            />
          ))}
        </>
      )
    );
  }
  renderPredicateIcon(predicate: FilterPredicate) {
    return predicate?.iconText ? (
      <span>{predicate?.iconText}</span>
    ) : (
      <Icon size="1rem" path={predicate?.iconPath || mdiFilterOutline} />
    );
  }
  selectColumnPredicate(predicateId: string) {
    console.log('predicateId', predicateId);

    const filter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );
    const predicate = this.props.Api.filterApi.getFilterPredicateById(predicateId);

    this.props.onClearColumnFilter(filter);

    if (predicate) {
      this.props.onAddColumnFilter({
        ColumnId: this.props.CurrentColumn.ColumnId,
        PredicateId: predicateId,
        Inputs: (predicate.inputs || []).map(i => i.default ?? ''),
      });
    }
  }

  clearColumnPredicate() {
    const filter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );

    this.props.onClearColumnFilter(filter);
  }

  changeColumnPredicateInput(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const filter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );
    filter.Inputs[index] = value;

    this.props.onEditColumnFilter(filter);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<QuickFilterFormProps> {
  return {
    CurrentColumn: ownProps.CurrentColumn,
    ColumnFilters: state.Filter.ColumnFilters,
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
  <Provider store={FilterContext.Adaptable.AdaptableStore.TheStore}>
    <ThemeProvider theme={theme}>
      <AdaptableContext.Provider value={FilterContext.Adaptable}>
        <QuickFilterForm
          Api={FilterContext.Adaptable.api}
          CurrentColumn={FilterContext.Column}
          TeamSharingActivated={false}
          EmbedColumnMenu={FilterContext.Adaptable.embedColumnMenu}
        />
      </AdaptableContext.Provider>
    </ThemeProvider>
  </Provider>
);
