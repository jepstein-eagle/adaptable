"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const Enums_1 = require("../Utilities/Enums");
const RangeHelper_1 = require("../Utilities/Helpers/RangeHelper");
const ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
class QuickSearchStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.QuickSearchStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.QuickSearchStrategyName, ScreenPopups.QuickSearchPopup, StrategyConstants.QuickSearchGlyph);
    }
    InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();
            // if not highlighting cell then lets create a range 
            if (this.quickSearchState.DisplayAction != Enums_1.DisplayAction.HighlightCell) {
                // if searchText is empty then set clear both types, otherwise set them
                if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.quickSearchState.QuickSearchText)) {
                    this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchClearRange());
                    this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchClearVisibleColumnExpressions());
                }
                else {
                    let quickSearchRange = RangeHelper_1.RangeHelper.CreateValueRangeFromOperand(this.quickSearchState.QuickSearchText);
                    this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchSetRange(quickSearchRange));
                    // we just create expressions for the visible columns - in the Blotter we will check for those missing;
                    // we dont keep this updated - just set once as good for majority of use cases
                    let quickSearchVisibleColumnExpressions = [];
                    for (let column of this.blotter.api.gridApi.getVisibleColumns()) {
                        if (RangeHelper_1.RangeHelper.IsColumnAppropriateForRange(quickSearchRange.Operator, column)) {
                            let quickSearchVisibleColumnExpression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(column.ColumnId, null, null, null, [quickSearchRange]);
                            quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression);
                        }
                    }
                    this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchSetVisibleColumnExpressions(quickSearchVisibleColumnExpressions));
                }
            }
            this.blotter.applyGridFiltering();
            this.blotter.redraw();
            if (this.blotter.blotterOptions.generalOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishSearchChanged(Enums_1.SearchChangedTrigger.QuickSearch);
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.QuickSearch, this.quickSearchState);
            }
        }
    }
    GetQuickSearchState() {
        return this.blotter.adaptableBlotterStore.TheStore.getState().QuickSearch;
    }
}
exports.QuickSearchStrategy = QuickSearchStrategy;
