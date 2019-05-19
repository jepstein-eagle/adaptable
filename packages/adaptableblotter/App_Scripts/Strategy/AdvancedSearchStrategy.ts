import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState';
import { SearchChangedTrigger } from '../Utilities/Enums';

export class AdvancedSearchStrategy extends AdaptableStrategyBase
  implements IAdvancedSearchStrategy {
  private AdvancedSearchState: AdvancedSearchState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.AdvancedSearchStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.AdvancedSearchStrategyName,
      ScreenPopups.AdvancedSearchPopup,
      StrategyConstants.AdvancedSearchGlyph
    );
  }

  // Not sure we need this.  i wonder if the store shoud do this...?
  protected InitState() {
    if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
      this.AdvancedSearchState = this.GetAdvancedSearchState();

      if (this.blotter.blotterOptions.generalOptions!.serverSearchOption != 'None') {
        if (this.blotter.isInitialised) {
          this.publishSearchChanged(SearchChangedTrigger.AdvancedSearch);
        }
      }
    }
  }

  private GetAdvancedSearchState(): AdvancedSearchState {
    return this.blotter.api.advancedSearchApi.getAdvancedSearchState();
  }
}
