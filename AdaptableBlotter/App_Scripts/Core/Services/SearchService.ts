
import { ISearchService } from './Interface/ISearchService';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, LeafExpressionOperator, ColumnType } from '../Enums';
import { ExpressionHelper, } from '../Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Expression/PredefinedExpressionHelper';
import { Expression } from '../Expression/Expression'
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { QuickSearchState, AdvancedSearchState, GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Extensions'
import { IAdvancedSearch } from '../Interface/IAdvancedSearchStrategy';

/* At the moment this uses Expressions - rather than JQuery - and works for both Advanced and Quick Search
Note:  Because Quick Search uses an expression - it only works on string columns at present - we can choose the operator but its always strings
See: 1561: Can only perform Quick Search on string columns

Becuase we are using Expressions on visible rows rather than JQuery on the data source it means that we have other bugs. eg.
1559:  Paging doesnt work properly in Kendo
*/

export class SearchService implements ISearchService {

    constructor(private blotter: IAdaptableBlotter) {
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.OnGridDataBound().Subscribe((sender, eventText) => this.ApplySearchOnGrid())
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
      
        let columns: IColumn[] = this.GetGridState().Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0) {

            // next get those rows which dont fit the search
            let nonMatchingRowIds: string[] = this.GetNonMatchingRows(rowIds, columns);

            // lastly hide the rows which dont fit the search
            this.blotter.hideRows(nonMatchingRowIds);
        }

    }


    public ApplySearchOnRow(rowIdentifier: string): void {
        let columns = this.GetGridState().Columns;
        let identifiers: string[] = [rowIdentifier];
        let nonMatchingRowIds: string[] = this.GetNonMatchingRows(identifiers, columns);

        // we should only get one or zero rows back
        let rowHasMatch: Boolean = nonMatchingRowIds.length == 0;
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

        if (userFiltersCurrentSearch.find(n =>userFilterIds.find(ne=>ne== n)!=null  )) {
            this.ApplySearchOnGrid();
        }
    }

    private GetNonMatchingRows(rowIdentifiers: string[], columns: IColumn[]): string[] {
        let nonMatchingRowIds: string[] = [];
        let quickSearchExpressions: Expression[] = this.createQuickSearchExpressions(columns);
        let advancedSearchExpressions: Expression[] = this.createAdvancedSearchExpressions();

        let hasQuickSearchExpression: boolean = quickSearchExpressions.length > 0;
        let hasAdvancedSearchExpression: boolean = advancedSearchExpressions.length > 0;

        // we only want to return non matching rows if we have at least one expression!
        if (hasQuickSearchExpression || hasAdvancedSearchExpression) {
            rowIdentifiers.forEach(rowId => {
                let rowHasMatch: Boolean = false;
                let isQuickSearchMatchSuccess: Boolean = true;
                let isAdvancedSearchMatchSuccess: Boolean = true;

                // check for quick search Expression
                if (hasQuickSearchExpression) {
                    isQuickSearchMatchSuccess = this.rowHasMatch(quickSearchExpressions, rowId, columns);
                    rowHasMatch = isQuickSearchMatchSuccess;
                }

                // check for advanced search Expression (unless quick search has been tested and already failed)
                if (hasAdvancedSearchExpression && isQuickSearchMatchSuccess) {
                    isAdvancedSearchMatchSuccess = this.rowHasMatch(advancedSearchExpressions, rowId, columns);
                    rowHasMatch = isQuickSearchMatchSuccess && isAdvancedSearchMatchSuccess;
                }

                if (!rowHasMatch) {
                    nonMatchingRowIds.push(rowId);
                }
            })
        }
        return nonMatchingRowIds;
    }

    private createAdvancedSearchExpressions(): Expression[] {
        let searchExpressions: Expression[] = [];
        let currentSearchId = this.GetAdvancedSearchState().CurrentAdvancedSearchId;
        if (currentSearchId != "") {
            let savedSearch: IAdvancedSearch = this.GetAdvancedSearchState().AdvancedSearches.find(s => s.Uid == currentSearchId);
            searchExpressions.push(savedSearch.Expression);
        }
        return searchExpressions;
    }



    private createQuickSearchExpressions(columns: IColumn[]): Expression[] {
        // going to cheat for the moment and use a predefined expression though might not be actually such a bad idea...
        // though I should probably create a proper expression the proper way...
        let searchExpressions: Expression[] = [];
        let quickSearchText: string = this.GetQuickSearchState().QuickSearchText;

        if (StringExtensions.IsNotNullOrEmpty(quickSearchText)) {
            let predefinedExpressionInfo: IPredefinedExpressionInfo =
                {
                    ColumnValues: null,
                    ExpressionRange: { Operator: this.GetQuickSearchState().QuickSearchOperator, Operand1: quickSearchText, Operand2: "" },
                    UserFilter: null
                };
            columns.filter(c => c.ColumnType == ColumnType.String).forEach(c => {
                let predefinedExpression: Expression = PredefinedExpressionHelper.CreatePredefinedExpression(c.ColumnId, predefinedExpressionInfo, this.blotter);
                searchExpressions.push(predefinedExpression);
            });
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
