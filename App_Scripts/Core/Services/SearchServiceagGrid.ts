
import { ISearchService } from './Interface/ISearchService';
import { AdaptableBlotter } from '../../Vendors/agGrid/AdaptableBlotter';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, LeafExpressionOperator } from '../Enums';
import { QuickSearchState, AdvancedSearchState, GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { IAdvancedSearch } from '../Interface/IAdvancedSearchStrategy';

export class SearchServiceagGrid implements ISearchService {

    constructor(private blotter: AdaptableBlotter) {
        this.blotter.onGridDataBound().Subscribe((sender, eventText) => this.ApplySearchOnGrid())
    }

    public ApplySearchOnGrid(): void {
        this.blotter.applyColumnFilters()
        //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
        this.blotter.refreshView()
    }

    public ApplySearchOnRow(rowIdentifier: string): void {
        this.blotter.applyColumnFilters()
    }

    public ApplySearchOnUserFilter(userFilterIds: string[]): void {
        this.blotter.applyColumnFilters()
    }
}
