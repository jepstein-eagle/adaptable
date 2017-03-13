
import { ISearchService } from './Interface/ISearchService';
import { AdaptableBlotter } from '../../Vendors/Hypergrid/AdaptableBlotter';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, LeafExpressionOperator } from '../Enums';
import { QuickSearchState, AdvancedSearchState, GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { IAdvancedSearch } from '../Interface/IAdvancedSearchStrategy';

export class SearchServiceHyperGrid implements ISearchService {

    constructor(private blotter: IAdaptableBlotter) {
        this.blotter.onGridDataBound().Subscribe((sender, eventText) => this.ApplySearchOnGrid())
    }


    public ApplySearchOnGrid(): void {
        let theBlotterBypass: AdaptableBlotter = this.blotter as AdaptableBlotter
        theBlotterBypass.ReindexAndRepaint()
    }


    public ApplySearchOnRow(rowIdentifier: string): void {
        let theBlotterBypass: AdaptableBlotter = this.blotter as AdaptableBlotter
        theBlotterBypass.ReindexAndRepaint()
    }

    public ApplySearchOnUserFilter(userFilterIds: string[]): void {
        let theBlotterBypass: AdaptableBlotter = this.blotter as AdaptableBlotter
        theBlotterBypass.ReindexAndRepaint()
    }


}
