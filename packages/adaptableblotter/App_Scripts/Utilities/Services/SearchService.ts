import { IAdaptableBlotter, ISearchChangedEventArgs } from '../../types';
import { ISearchService } from './Interface/ISearchService';
import * as StrategyConstants from '../Constants/StrategyConstants';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { SearchChangedTrigger, DisplayAction } from '../Enums';
import { IDataSource } from '../Interface/BlotterObjects/IDataSource';
import { IAdvancedSearch } from '../Interface/BlotterObjects/IAdvancedSearch';
import { IBlotterSearchState } from '../Interface/SearchChanged/IBlotterSearchState';
import { IBlotterSortState } from '../Interface/SearchChanged/IBlotterSortState';
import { ISearchChangedInfo } from '../Interface/SearchChanged/ISearchChangedInfo';
import { ISearchEventData } from '../Interface/SearchChanged/ISearchEventData';
import {
  ColumnFilterState,
  QuickSearchState,
  AdvancedSearchState,
  DataSourceState,
  UserFilterState,
  GridState,
} from '../../Redux/ActionsReducers/Interface/IState';
import StringExtensions from '../Extensions/StringExtensions';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { IQuickSearchStrategy } from '../../Strategy/Interface/IQuickSearchStrategy';
import { IRange } from '../Interface/Expression/IRange';
import RangeHelper from '../Helpers/RangeHelper';
import { Expression } from '../Expression';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import { IColumnSort } from '../Interface/IColumnSort';
import { LayoutHelper } from '../Helpers/LayoutHelper';
import { IColumn } from '../Interface/IColumn';

export class SearchService implements ISearchService {
  private blotter: IAdaptableBlotter;

  private advancedSearchState: AdvancedSearchState;
  private columnFilterState: ColumnFilterState;
  private dataSourceState: DataSourceState;
  private quickSearchState: QuickSearchState;
  private userFilterState: UserFilterState;
  private columnSorts: IColumnSort[];
  private columns: IColumn[];

  constructor(blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    this.blotter.adaptableBlotterStore.TheStore.subscribe(() => this.ListenToSearchStoreChanges());
  }

  protected ListenToSearchStoreChanges(): void {
    // Fire Search Changed for Advanced Search (if ServerSearchOption is not 'None')
    if (this.advancedSearchState != this.getAdvancedSearchState()) {
      this.advancedSearchState = this.getAdvancedSearchState();
      if (this.blotter.blotterOptions.generalOptions!.serverSearchOption != 'None') {
        this.publishSearchChanged(SearchChangedTrigger.AdvancedSearch);
      }
    }

    // Fire Search Changed for ColumnFilter (if ServerSearchOption is set too All Search)
    if (this.columnFilterState != this.getColumnFilterState()) {
      this.columnFilterState = this.getColumnFilterState();

      setTimeout(() => this.blotter.applyGridFiltering(), 5);
      if (
        this.blotter.blotterOptions.generalOptions!.serverSearchOption == 'AllSearch' ||
        'AllSearchandSort'
      ) {
        this.publishSearchChanged(SearchChangedTrigger.ColumnFilter);
      }
    }

    // Fire Search Changed for Data Source in all circumstances (as only makes sense on the server)
    if (this.dataSourceState != this.getDataSourceState()) {
      this.dataSourceState = this.getDataSourceState();
      this.publishSearchChanged(SearchChangedTrigger.DataSource);
    }

    // Fire Search Changed for Quick Search (if ServerSearchOption is set too All Search)
    if (this.quickSearchState != this.getQuickSearchState()) {
      this.quickSearchState = this.getQuickSearchState();

      // if not highlighting cell then lets tell quick search strategy to create a range
      if (this.quickSearchState.DisplayAction != DisplayAction.HighlightCell) {
        this.createQuickSearchRange();
      }

      this.blotter.applyGridFiltering();
      this.blotter.redraw();

      if (
        this.blotter.blotterOptions.generalOptions.serverSearchOption == 'AllSearch' ||
        'AllSearchandSort'
      ) {
        this.publishSearchChanged(SearchChangedTrigger.QuickSearch);
      }
    }

    // Fire Search Changed for User Filter (if ServerSearchOption is not 'None')
    if (this.userFilterState != this.getUserFilterState()) {
      this.userFilterState = this.getUserFilterState();

      setTimeout(() => this.blotter.applyGridFiltering(), 5);
      if (this.blotter.blotterOptions.generalOptions.serverSearchOption != 'None') {
        // we cannot stop all extraneous publishing (e.g. we publish if the changed user filter is NOT being used)
        // but we can at least ensure that we only publish IF there are live searches or column filters
        if (
          StringExtensions.IsNotNullOrEmpty(
            this.blotter.api.advancedSearchApi.getCurrentAdvancedSearchName()
          ) ||
          ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.columnFilterApi.getAllColumnFilter())
        ) {
          this.publishSearchChanged(SearchChangedTrigger.UserFilter);
        }
      }

      // Do Column Sorts and Columns Separately
      if (
        !ArrayExtensions.areArraysEqualWithOrderandProperties(
          this.columnSorts,
          this.getGridColumnSorts()
        )
      ) {
        this.columnSorts = this.getGridColumnSorts();

        if (this.blotter.blotterOptions.generalOptions.serverSearchOption == 'AllSearchandSort') {
          this.publishSearchChanged(SearchChangedTrigger.Sort);
        }
        LayoutHelper.autoSaveLayout(this.blotter);
      }

      if (this.columns != this.getGridColumns()) {
        this.columns = this.getGridColumns();
        LayoutHelper.autoSaveLayout(this.blotter);
      }
    }
  }

  public createQuickSearchRange() {
    // if searchText is empty then set clear both types, otherwise set them
    if (StringExtensions.IsNullOrEmpty(this.quickSearchState.QuickSearchText)) {
      this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchClearRange());
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.QuickSearchClearVisibleColumnExpressions()
      );
    } else {
      let quickSearchRange: IRange = RangeHelper.CreateValueRangeFromOperand(
        this.quickSearchState.QuickSearchText
      );
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.QuickSearchSetRange(quickSearchRange)
      );

      // we just create expressions for the visible columns - in the Blotter we will check for those missing;
      // we dont keep this updated - just set once as good for majority of use cases
      let quickSearchVisibleColumnExpressions: Expression[] = [];
      for (let column of this.blotter.api.gridApi.getVisibleColumns()) {
        if (RangeHelper.IsColumnAppropriateForRange(quickSearchRange.Operator, column)) {
          let quickSearchVisibleColumnExpression: Expression = ExpressionHelper.CreateSingleColumnExpression(
            column.ColumnId,
            null,
            null,
            null,
            [quickSearchRange]
          );
          quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression);
        }
      }
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.QuickSearchSetVisibleColumnExpressions(quickSearchVisibleColumnExpressions)
      );
    }
  }

  private getAdvancedSearchState(): AdvancedSearchState {
    return this.blotter.api.advancedSearchApi.getAdvancedSearchState();
  }

  private getColumnFilterState(): ColumnFilterState {
    return this.blotter.api.columnFilterApi.getColumnFilterState();
  }
  private getDataSourceState(): DataSourceState {
    return this.blotter.api.dataSourceApi.getDataSourceState();
  }
  private getQuickSearchState(): QuickSearchState {
    return this.blotter.api.quickSearchApi.getQuickSearchState();
  }
  private getUserFilterState(): UserFilterState {
    return this.blotter.api.userFilterApi.getUserFilterState();
  }

  private getGridColumns(): IColumn[] {
    return this.blotter.api.gridApi.getColumns();
  }

  private getGridColumnSorts(): IColumnSort[] {
    return this.blotter.api.gridApi.getColumnSorts();
  }

  /**
   * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
   * This is primarily to help users who want to run search on the server and so need to know what has changed
   * @param searchChangedTrigger function that triggered the event
   */
  publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void {
    if (this.blotter.isInitialised) {
      let currentDataSource: IDataSource = this.blotter.api.dataSourceApi.getCurrentDataSource();
      let currentAdvancedSearch: IAdvancedSearch = this.blotter.api.advancedSearchApi.getCurrentAdvancedSearch();

      // lets get the searchstate
      let blotterSearchState: IBlotterSearchState = {
        dataSource: currentDataSource == null ? null : currentDataSource,
        advancedSearch: currentAdvancedSearch == null ? null : currentAdvancedSearch,
        quickSearch: this.blotter.api.quickSearchApi.getQuickSearchValue(),
        columnFilters: this.blotter.api.columnFilterApi.getAllColumnFilter(),
      };

      let blotterSortState: IBlotterSortState = {
        columnSorts: this.blotter.api.gridApi.getColumnSorts(),
        customSorts: this.blotter.api.customSortApi.getAllCustomSort(),
      };

      let searchChangedInfo: ISearchChangedInfo = {
        searchChangedTrigger: searchChangedTrigger,
        blotterSearchState: blotterSearchState,
        blotterSortState: blotterSortState,
        searchAsAtDate: new Date(),
      };

      let searchEventData: ISearchEventData = {
        name: 'Adaptable Blotter',
        type: 'Search Args',
        id: searchChangedInfo,
      };

      let searchChangedArgs: ISearchChangedEventArgs = {
        object: 'fdc3-context',
        definition: 'https://fdc3.org/context/1.0.0/',
        version: '1.0.0',
        data: [searchEventData],
      };
      this.blotter.api.eventApi._onSearchedChanged.Dispatch(this.blotter, searchChangedArgs);
    }
  }
}
