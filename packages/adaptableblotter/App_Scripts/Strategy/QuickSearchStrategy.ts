import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState'
import { SearchChangedTrigger, StateChangedTrigger, DisplayAction } from '../Utilities/Enums';
import { IRange } from '../Utilities/Interface/Expression/IRange';
import { RangeHelper } from '../Utilities/Helpers/RangeHelper';
import { Expression } from '../Utilities/Expression';
import { ExpressionHelper } from '../Utilities/Helpers/ExpressionHelper';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    protected quickSearchState: QuickSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.QuickSearchStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.QuickSearchStrategyName, ScreenPopups.QuickSearchPopup, StrategyConstants.QuickSearchGlyph);
    }

    protected InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();

            // if not highlighting cell then lets create a range 
            if (this.quickSearchState.DisplayAction != DisplayAction.HighlightCell) {
                // if searchText is empty then set clear both types, otherwise set them
                if (StringExtensions.IsNullOrEmpty(this.quickSearchState.QuickSearchText)) {  
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchClearRange());
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchClearVisibleColumnExpressions());
                } else {
                    let quickSearchRange: IRange = RangeHelper.CreateValueRangeFromOperand(this.quickSearchState.QuickSearchText);
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchSetRange(quickSearchRange));

                    // we just create expressions for the visible columns - in the Blotter we will check for those missing;
                    // we dont keep this updated - just set once as good for majority of use cases
                    let quickSearchVisibleColumnExpressions: Expression[] = [];
                    for (let column of this.blotter.api.gridApi.getVisibleColumns()) {
                        if (RangeHelper.IsColumnAppropriateForRange(quickSearchRange.Operator, column)) {
                            let quickSearchVisibleColumnExpression: Expression = ExpressionHelper.CreateSingleColumnExpression(column.ColumnId, null, null, null, [quickSearchRange])
                            quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression);
                        }
                    }
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchSetVisibleColumnExpressions(quickSearchVisibleColumnExpressions));
                }
            }

            this.blotter.applyGridFiltering();
            this.blotter.redraw();

            if (this.blotter.BlotterOptions.generalOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishSearchChanged(SearchChangedTrigger.QuickSearch)
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.QuickSearch, this.quickSearchState)
            }

        }
    }
    protected GetQuickSearchState(): QuickSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }


}