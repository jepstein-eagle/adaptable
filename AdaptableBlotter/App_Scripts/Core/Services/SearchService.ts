
import { ISearchService } from './Interface/ISearchService';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, CellStyle, LeafExpressionOperator, ColumnType } from '../Enums';
import { ExpressionHelper, } from '../Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Expression/PredefinedExpressionHelper';
import { Expression } from '../Expression/Expression'
import { IExpressionRange } from '../Interface/IExpression';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { QuickSearchState, AdvancedSearchState, GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Extensions'
import { IAdvancedSearch } from '../Interface/IAdvancedSearchStrategy';

/* At the moment this uses Expressions - rather than JQuery - and works for both Advanced and Quick Search
Note:  Because Quick Search uses an expression - it only works on string columns at present - we can choose the operator but its always strings
*/

export class SearchService implements ISearchService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public ApplySearchOnGrid(): void {

        let columns: IColumn[] = this.GetGridState().Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0) {
            let rowIds: string[] = this.blotter.getAllRowIds();

            // first make sure they are all visible (as might have been hidden in a previous search)
            this.blotter.showRows(rowIds);

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

    private GetNonMatchingRows(rowIdentifiers: string[], columns: IColumn[]): string[] {
        let nonMatchingRowIds: string[] = [];
        let quickSearchExpressions: Expression[] = this.createQuickSearchExpressions(columns);
        let advancedSearchExpressions: Expression[] = this.createAdvancedSearchExpressions(columns);

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

    private createAdvancedSearchExpressions(columns: IColumn[]): Expression[] {
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
        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                Id: "QuickSearch", FriendlyName: "Quick Search Expression", CellStyle: CellStyle.GreenFont,
                Operator: this.GetQuickSearchState().QuickSearchOperator,
                Operand1: this.GetQuickSearchState().QuickSearchText, Operand2: ""
            };

        let searchExpressions: Expression[] = [];
        columns.filter(c => c.ColumnType == ColumnType.String).forEach(c => {
            let predefinedExpression: Expression = PredefinedExpressionHelper.CreatePredefinedExpression(c.ColumnId, predefinedExpressionInfo);
            searchExpressions.push(predefinedExpression);
        });
        return searchExpressions;
    }

    private rowHasMatch(searchExpressions: Expression[], rowId: any, columns: IColumn[]): Boolean {
        var matches: Boolean = false;
        searchExpressions.forEach(s => {
            if (!matches) {
                matches = ExpressionHelper.checkForExpression(s, rowId, columns, this.blotter, this.GetQuickSearchState().IsCaseSensitive);
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
