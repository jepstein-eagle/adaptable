
import { ISearchService } from './Interface/ISearchService';
import { AdaptableBlotter } from '../../Hypergrid/AdaptableBlotter';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { MenuType, LeafExpressionOperator, ColumnType } from '../Enums';
import { ExpressionHelper, } from '../Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Expression/PredefinedExpressionHelper';
import { Expression } from '../Expression/Expression'
import { INamedExpression } from '../Interface/IExpression'
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { QuickSearchState, AdvancedSearchState, GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Extensions'
import { IAdvancedSearch } from '../Interface/IAdvancedSearchStrategy';

export class SearchServiceHyperGrid implements ISearchService {

    constructor(private blotter: IAdaptableBlotter) {
        this.blotter.OnGridDataBound().Subscribe((sender, eventText) => this.ApplySearchOnGrid())
    }


    public ApplySearchOnGrid(): void {
        let theBlotterBypass: AdaptableBlotter = this.blotter as AdaptableBlotter
        theBlotterBypass.ReindexAndRepaint()
    }


    public ApplySearchOnRow(rowIdentifier: string): void {
        let theBlotterBypass: AdaptableBlotter = this.blotter as AdaptableBlotter
        theBlotterBypass.ReindexAndRepaint()
    }

    public ApplySearchOnFilters(namedExpressionIds: string[]): void {
        let theBlotterBypass: AdaptableBlotter = this.blotter as AdaptableBlotter
        theBlotterBypass.ReindexAndRepaint()
    }


}
