import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IEvent } from "../Interface/IEvent";
import { IBlotterApi } from "./Interface/IBlotterApi";
import { ISearchChangedEventArgs } from "./Interface/ServerSearch";
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import { ILayout, IAdaptableBlotterObject, IAdvancedSearch } from "./Interface/AdaptableBlotterObjects";
import { DEFAULT_LAYOUT } from "../Constants/GeneralConstants";
import * as StrategyNames from '../Constants/StrategyNames'

export abstract class BlotterApiBase implements IBlotterApi {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public setGridData(dataSource: any): void {      // no implementation     
    }

    // Layout api methods
    public selectLayout(layoutName: string): void {
        let layout: ILayout = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyNames.LayoutStrategyName)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(layoutName))
        }
    }

    public clearLayout(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
    }


    // Quick Search api methods
    public runQuickSearch(quickSearchText: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText))
    }

    public clearQuickSearch(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(QuickSearchRedux.QuickSearchApply(""))
    }


    // Data Source api methods
    public selectDataSource(dataSourceName: string): void {
        let dataSource: string = this.blotter.AdaptableBlotterStore.TheStore.getState().DataSource.DataSources.find(a => a == dataSourceName);
        if (this.checkItemExists(dataSource, dataSourceName, StrategyNames.DataSourceStrategyName)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(DataSourceRedux.DataSourceSelect(dataSource))
        }
    }

    public clearDataSource(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DataSourceRedux.DataSourceSelect(""))
    }


    // Advanced Search api methods
    public selectAdvancedSearch(advancedSearchName: string): void {
        let advancedSearch: IAdvancedSearch = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
        if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyNames.AdvancedSearchStrategyName)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName))
        }
    }

    public clearAdvancedSearch(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchSelect(""))
    }

    public addAdvancedSearch(advancedSearch: IAdvancedSearch): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch))
    }

    public editAdvancedSearch(advancedSearchName: string, advancedSearch: IAdvancedSearch): void {
        let searchIndex: number = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch))
    }

    public deleteAdvancedSearch(advancedSearchName: string): void {
        let searchToDelete = this.getAdvancedSearchByName(advancedSearchName)
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete))
    }

    public getCurentAdvancedSearch(): IAdvancedSearch {
        let currentAdvancedSearchName: string = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch
        return this.getAdvancedSearchByName(currentAdvancedSearchName)
    }

    public getAdvancedSearchByName(advancedSearchName: string): IAdvancedSearch {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    }


    // Events
    public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
        return this.blotter.SearchedChanged;
    }

    private checkItemExists(item: any, name: string, type: string): boolean {
        if (!item) {
            this.blotter.LoggingService.LogError("No " + type + " found with the name: " + name)
            return false;
        }
        return true;
    }
}
