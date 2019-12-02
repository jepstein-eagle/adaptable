import { ISearchService } from './Interface/ISearchService';
import * as StrategyConstants from '../Constants/StrategyConstants';
import { SearchChangedTrigger, DisplayAction } from '../../PredefinedConfig/Common/Enums';
import { UserFilterState } from '../../PredefinedConfig/UserFilterState';
import { QuickSearchState } from '../../PredefinedConfig/QuickSearchState';
import { DataSourceState, DataSource } from '../../PredefinedConfig/DataSourceState';
import { ColumnFilterState } from '../../PredefinedConfig/ColumnFilterState';
import { AdvancedSearchState, AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import StringExtensions from '../Extensions/StringExtensions';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { IQuickSearchStrategy } from '../../Strategy/Interface/IQuickSearchStrategy';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { SearchChangedEventArgs } from '../../Api/Events/SearchChanged/SearchChangedEventArgs';
import { BlotterSearchState } from '../../Api/Events/SearchChanged/BlotterSearchState';
import { BlotterSortState } from '../../Api/Events/SearchChanged/BlotterSortState';
import { SearchChangedInfo } from '../../Api/Events/SearchChanged/SearchChangedInfo';
import { SearchEventData } from '../../Api/Events/SearchChanged/SearchEventData';
import BlotterHelper from '../Helpers/BlotterHelper';

export class SearchService implements ISearchService {
  private blotter: IAdaptableBlotter;

  private advancedSearchState: AdvancedSearchState;

  private columnFilterState: ColumnFilterState;

  private dataSourceState: DataSourceState;

  private quickSearchState: QuickSearchState;

  private userFilterState: UserFilterState;

  private columnSorts: ColumnSort[];

  private columns: AdaptableBlotterColumn[];

  constructor(blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    this.blotter.adaptableBlotterStore.TheStore.subscribe(() => this.listenToSearchStoreChanges());
  }

  protected listenToSearchStoreChanges(): void {
    if (this.blotter.isInitialised) {
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
          this.blotter.blotterOptions.generalOptions.serverSearchOption == 'AllSearchandSort'
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
          const quickSearchStrategy = this.blotter.strategies.get(
            StrategyConstants.QuickSearchStrategyId
          ) as IQuickSearchStrategy;
          quickSearchStrategy.createQuickSearchRange();
        }

        this.blotter.applyGridFiltering();
        this.blotter.redraw();

        if (
          this.blotter.blotterOptions.generalOptions.serverSearchOption == 'AllSearch' ||
          this.blotter.blotterOptions.generalOptions.serverSearchOption == 'AllSearchandSort'
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
          this.blotter.LayoutService.autoSaveLayout();
        }

        if (this.columns != this.getGridColumns()) {
          this.columns = this.getGridColumns();
          this.blotter.LayoutService.autoSaveLayout();
        }
      }
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

  private getGridColumns(): AdaptableBlotterColumn[] {
    return this.blotter.api.gridApi.getColumns();
  }

  private getGridColumnSorts(): ColumnSort[] {
    return this.blotter.api.gridApi.getColumnSorts();
  }

  /**
   * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
   * This is primarily to help users who want to run search on the server and so need to know what has changed
   * @param searchChangedTrigger function that triggered the event
   */
  publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void {
    if (this.blotter.isInitialised) {
      const currentDataSource: DataSource = this.blotter.api.dataSourceApi.getCurrentDataSource();
      const currentAdvancedSearch: AdvancedSearch = this.blotter.api.advancedSearchApi.getCurrentAdvancedSearch();

      // lets get the searchstate
      const blotterSearchState: BlotterSearchState = {
        dataSource: currentDataSource == null ? null : currentDataSource,
        advancedSearch: currentAdvancedSearch == null ? null : currentAdvancedSearch,
        quickSearch: this.blotter.api.quickSearchApi.getQuickSearchValue(),
        columnFilters: this.blotter.api.columnFilterApi.getAllColumnFilter(),
      };

      const blotterSortState: BlotterSortState = {
        columnSorts: this.blotter.api.gridApi.getColumnSorts(),
        customSorts: this.blotter.api.customSortApi.getAllCustomSort(),
      };

      const searchChangedInfo: SearchChangedInfo = {
        searchChangedTrigger,
        blotterSearchState,
        blotterSortState,
        searchAsAtDate: new Date(),
      };

      const searchChangedArgs: SearchChangedEventArgs = BlotterHelper.createFDC3Message(
        'Search Changed Args',
        searchChangedInfo
      );

      // now depprecated and shortly to be removed...
      this.blotter.api.eventApi._onSearchChanged.Dispatch(this.blotter, searchChangedArgs);
      // new way (and soon only way)
      this.blotter.api.eventApi.emit('SearchChanged', searchChangedArgs);
    }
  }
}
