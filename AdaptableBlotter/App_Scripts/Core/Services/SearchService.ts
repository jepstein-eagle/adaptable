
import { ISearchService } from './Interface/ISearchService';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, LeafExpressionOperator, ColumnType, QuickSearchDisplayType } from '../Enums';
import { ExpressionHelper, } from '../Expression/ExpressionHelper';
import { Expression } from '../Expression/Expression'
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { QuickSearchState, AdvancedSearchState, GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Extensions'
import { IAdvancedSearch } from '../Interface/IAdvancedSearchStrategy';
import { IRangeExpression } from '../Interface/IExpression';

/* At the moment this uses Expressions - rather than JQuery - for Advanced Search
Becuase we are using Expressions on visible rows rather than JQuery on the data source it means that we have other bugs. eg.
1559:  Paging doesnt work properly in Kendo
*/

export class SearchService implements ISearchService {

    constructor(private blotter: IAdaptableBlotter) {
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.onGridDataBound().Subscribe((sender, eventText) => this.ApplySearchOnGrid())
    }

    private handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        if (StringExtensions.IsNotNullOrEmpty(this.GetQuickSearchState().QuickSearchText) ||
            StringExtensions.IsNotNullOrEmpty(this.GetAdvancedSearchState().CurrentAdvancedSearchId)) {
            this.ApplySearchOnRow(dataChangedEvent.IdentifierValue);
        }
    }

    public ApplySearchOnGrid(): void {

        let rowIds: string[] = this.blotter.getAllRowIds();

        // first make sure they are all visible (as might have been hidden in a previous search)
        this.blotter.showRows(rowIds);
        // always do this or only if colouring? but then what if did colour and no longer do so???
        this.blotter.removeAllCellStylesWithRegex(new RegExp("^Ab-QuickSearch"));


        let columns: IColumn[] = this.GetGridState().Columns.filter(c=>c.Visible);
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0) {

            // next get those rows which dont fit the search
            let matchingRowIds: string[] = this.GetMatchingRows(rowIds, columns);
            let nonMatchingRowIds: string[] = rowIds.filter(r => matchingRowIds.indexOf(r) < 0);

            // lastly hide the rows which dont fit the search
            this.blotter.hideRows(nonMatchingRowIds);
        }
    }


    public ApplySearchOnRow(rowIdentifier: string): void {
        let columns = this.GetGridState().Columns;
        let identifiers: string[] = [rowIdentifier];
        let matchingRowIds: string[] = this.GetMatchingRows(identifiers, columns);

        // we should only get one or zero rows back
        let rowHasMatch: Boolean = matchingRowIds.length > 0;
        if (rowHasMatch) {
            this.blotter.showRows(identifiers);
        } else {
            this.blotter.hideRows(identifiers);
        }
    }

    public ApplySearchOnUserFilter(userFilterIds: string[]): void {
        let advancedSearchExpressions: Expression[] = this.createAdvancedSearchExpressions();
        let userFiltersCurrentSearch: string[] = [];

        advancedSearchExpressions.forEach(a => {
            a.UserFilters.forEach(n => {
                userFiltersCurrentSearch.push(...n.UserFilterUids);
            })
        })

        if (userFiltersCurrentSearch.find(n => userFilterIds.find(ne => ne == n) != null)) {
            this.ApplySearchOnGrid();
        }
    }

    private GetMatchingRows(rowIdentifiers: string[], columns: IColumn[]): string[] {
        let matchingRowIds: string[] = [];
        let advancedSearchExpressions: Expression[] = this.createAdvancedSearchExpressions();

        let hasAdvancedSearchExpression: boolean = advancedSearchExpressions.length > 0;
        let hasQuickSearchText: boolean = StringExtensions.IsNotNullOrEmpty(this.GetQuickSearchState().QuickSearchText);

        let quickSearchMatchingIds: string[] = [];
        let advancedSearchMatchingIds: string[] = [];

        // first evaluate if we have quick search text
        if (hasQuickSearchText) {
            quickSearchMatchingIds.push(...this.blotter.getQuickSearchRowIds(rowIdentifiers));

            if (hasAdvancedSearchExpression) {
                quickSearchMatchingIds.forEach(id => {
                    if (this.rowHasMatch(advancedSearchExpressions, id, columns)) {
                        advancedSearchMatchingIds.push(id);
                    }
                })
                return advancedSearchMatchingIds;
            } else {
                return quickSearchMatchingIds;
            }
        } else {    // no quick search text so if we have advanced search lets do that
            if (hasAdvancedSearchExpression) {
                rowIdentifiers.forEach(rowId => {
                    if (this.rowHasMatch(advancedSearchExpressions, rowId, columns)) {
                        advancedSearchMatchingIds.push(rowId);
                    }
                })
                return advancedSearchMatchingIds;
            } else {   // we have neither quick search nor expression so just return all the row identifiers
                return rowIdentifiers;
            }
        }
    }

    private createAdvancedSearchExpressions(): Expression[] {
        let searchExpressions: Expression[] = [];
        let currentSearchId = this.GetAdvancedSearchState().CurrentAdvancedSearchId;
        if (StringExtensions.IsNotNullOrEmpty(currentSearchId)) {
            let savedSearch: IAdvancedSearch = this.GetAdvancedSearchState().AdvancedSearches.find(s => s.Uid == currentSearchId);
            searchExpressions.push(savedSearch.Expression);
        }
        return searchExpressions;
    }

    private rowHasMatch(searchExpressions: Expression[], rowId: any, columns: IColumn[]): Boolean {
        var matches: Boolean = false;
        searchExpressions.forEach(s => {
            if (!matches) {
                matches = ExpressionHelper.checkForExpression(s, rowId, columns, this.blotter);
            }
        })
        return matches;
    }

    private GetGridState(): GridState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid
    }

    private GetQuickSearchState(): QuickSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }


}
