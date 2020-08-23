import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import RangeHelper from '../Utilities/Helpers/RangeHelper';
import { Expression, QueryRange } from '../PredefinedConfig/Common/Expression';
import ExpressionHelper from '../Utilities/Helpers/ExpressionHelper';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { DisplayAction, LeafExpressionOperator } from '../PredefinedConfig/Common/Enums';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.QuickSearchStrategyId,
      StrategyConstants.QuickSearchStrategyFriendlyName,
      StrategyConstants.QuickSearchGlyph,
      ScreenPopups.QuickSearchPopup,
      adaptable
    );
  }

  public createQuickSearchRange() {
    // if searchText is empty then set clear both types, otherwise set them
    if (StringExtensions.IsNullOrEmpty(this.adaptable.api.quickSearchApi.getQuickSearchValue())) {
      this.adaptable.adaptableStore.TheStore.dispatch(SystemRedux.QuickSearchClearRange());
    } else {
      let quickSearchRange: QueryRange = RangeHelper.CreateValueRangeFromOperand(
        this.adaptable.api.quickSearchApi.getQuickSearchValue()
      );
      this.adaptable.adaptableStore.TheStore.dispatch(
        SystemRedux.QuickSearchSetRange(quickSearchRange)
      );
    }
  }
}
