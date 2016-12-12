
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


// At the moment this only has a very rough implementation of Quick Search
// But like with .NET version in due course it will cover both Advanced and Quick Search and keep the 2 properly in sync
// e.g. at moment quick search unhides all rows but that wont work if we havea  quick search as well.
// Its using an Expression - rather than JQuery - though this means that it only works on string columns at present
export class SearchService implements ISearchService {

    constructor(private blotter: IAdaptableBlotter) {
    }



    public ApplySearchOnGrid(): void {

        let columns: IColumn[] = this.GetGridState().Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0) {
            let rowIds: string[] = this.blotter.getAllRowIds();

            // first make sure they are all visible (as might have been hidden in a previous quick search)
            this.blotter.showRows(rowIds);

// Get the Search Expressions - from both Advanced and Quick Search
            let searchExpressions: Expression[] = this.createSearchExpressions(columns);

            if (searchExpressions.length > 0) {
                let nonMatchingRowIds: string[] = [];

                rowIds.forEach(rowId => {
                    let rowHasMatch: Boolean = this.rowHasMatch(searchExpressions, rowId, columns);
                    if (!rowHasMatch) {
                        nonMatchingRowIds.push(rowId);
                    }
                })
                this.blotter.hideRows(nonMatchingRowIds);
            }
        }
    }




    public ApplySearchOnRow(rowIdentifier: any): void {
        let columns = this.GetGridState().Columns;
        let searchExpressions: Expression[] = this.createSearchExpressions(columns);
        let identifiers: string[] = [];
        identifiers.push(rowIdentifier);
        let rowHasMatch: Boolean = this.rowHasMatch(searchExpressions, rowIdentifier, columns)
        if (rowHasMatch) {
            this.blotter.showRows(identifiers);
        } else {
            this.blotter.hideRows(identifiers);
        }
    }

    private createSearchExpressions(columns: IColumn[]): Expression[] {
        let searchExpressions: Expression[] = [];
        // first add Quick Search Expressions - create all column expressions that are required here, so dont do it for each row
        if (StringExtensions.IsNotNullOrEmpty(this.GetQuickSearchState().QuickSearchText)) {
            searchExpressions.push(...this.createQuickSearchExpressions(columns))
        }

        // now add Advancd Search Expressions
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
