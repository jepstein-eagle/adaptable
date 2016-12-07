
import { ISearchService } from './Interface/ISearchService';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, CellStyle, LeafExpressionOperator, ColumnType } from '../Enums';
import { ExpressionHelper, } from '../Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Expression/PredefinedExpressionHelper';
import { Expression } from '../Expression/Expression'
import { IExpressionRange } from '../Interface/IExpression';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { QuickSearchState } from '../../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Extensions'

// At the moment this only has a very rough implementation of Quick Search
// But like with .NET version in due course it will cover both Advanced and Quick Search and keep the 2 properly in sync
// e.g. at moment quick search unhides all rows but that wont work if we havea  quick search as well.
// Its using an Expression - rather than JQuery - though this means that it only works on string columns at present
export class SearchService implements ISearchService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public ApplyQuickSearchOnGrid(): void {
       
        let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0) {
            let rowIds: string[] = this.blotter.getAllRowIds();

            // first make sure they are all visible (as might have been hidden in a previous quick search)
            this.blotter.showRows(rowIds);

            if (StringExtensions.IsNotNullOrEmpty(this.GetQuickSearchState().QuickSearchText)) {
                let nonMatchingRowIds: string[] = [];

                // create all the column expressions that are required here, so dont do it for each row
                let searchExpressions: Expression[] = this.createSearchExpressions(columns);

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

  

    public ApplyQuickSearchOnRow(rowIdentifier: any): void {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
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
   
    private GetQuickSearchState(): QuickSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }


}
