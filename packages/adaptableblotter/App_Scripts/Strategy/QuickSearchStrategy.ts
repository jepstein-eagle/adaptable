import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import RangeHelper from '../Utilities/Helpers/RangeHelper';
import { Expression, QueryRange } from '../PredefinedConfig/Common/Expression';
import ExpressionHelper from '../Utilities/Helpers/ExpressionHelper';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { DisplayAction, LeafExpressionOperator } from '../PredefinedConfig/Common/Enums';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/Menu';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.QuickSearchStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.QuickSearchStrategyName,
      ComponentName: ScreenPopups.QuickSearchPopup,
      Icon: StrategyConstants.QuickSearchGlyph,
    });
  }

  public createQuickSearchRange() {
    // if searchText is empty then set clear both types, otherwise set them
    if (StringExtensions.IsNullOrEmpty(this.blotter.api.quickSearchApi.getQuickSearchValue())) {
      this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchClearRange());
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.QuickSearchClearVisibleColumnExpressions()
      );
    } else {
      let quickSearchRange: QueryRange = RangeHelper.CreateValueRangeFromOperand(
        this.blotter.api.quickSearchApi.getQuickSearchValue()
      );
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.QuickSearchSetRange(quickSearchRange)
      );

      // we just create expressions for the visible columns - in the Blotter we will check for those missing;
      // we dont keep this updated - just set once as good for majority of use cases
      let quickSearchVisibleColumnExpressions: Expression[] = [];
      for (let column of this.blotter.api.gridApi.getVisibleColumns()) {
        if (
          RangeHelper.IsColumnAppropriateForRange(
            quickSearchRange.Operator as LeafExpressionOperator,
            column
          )
        ) {
          let quickSearchVisibleColumnExpression: Expression = ExpressionHelper.CreateSingleColumnExpression(
            column.ColumnId,
            null,
            null,
            null,
            [quickSearchRange]
          );
          quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression);
        }
      }
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.QuickSearchSetVisibleColumnExpressions(quickSearchVisibleColumnExpressions)
      );
    }
  }
}
