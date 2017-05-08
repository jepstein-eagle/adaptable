
import { ISearchService } from './Interface/ISearchService';
import { AdaptableBlotter } from '../../Vendors/Hypergrid/AdaptableBlotter';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, LeafExpressionOperator } from '../Enums';
import { QuickSearchState, AdvancedSearchState, GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { IAdvancedSearch } from '../Interface/IAdvancedSearchStrategy';

export class SearchServiceHyperGrid implements ISearchService {

    constructor(private blotter: AdaptableBlotter) {
        this.blotter.onGridDataBound().Subscribe((sender, eventText) => this.ApplySearchOnGrid())
    }


    public ApplySearchOnGrid(): void {
        this.blotter.ReindexAndRepaint()
    }


    public ApplySearchOnRow(rowIdentifier: string): void {
        this.blotter.ReindexAndRepaint()
    }

    public ApplySearchOnUserFilter(userFilterIds: string[]): void {
        this.blotter.ReindexAndRepaint()
    }


}
