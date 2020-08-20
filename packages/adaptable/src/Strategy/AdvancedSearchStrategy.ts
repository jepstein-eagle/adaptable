import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { AdvancedSearch } from '../PredefinedConfig/AdvancedSearchState';

export class AdvancedSearchStrategy extends AdaptableStrategyBase
  implements IAdvancedSearchStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.AdvancedSearchStrategyId,
      StrategyConstants.AdvancedSearchStrategyFriendlyName,
      StrategyConstants.AdvancedSearchGlyph,
      ScreenPopups.AdvancedSearchPopup,
      adaptable
    );
  }

  public getTeamSharingAction(): TeamSharingImportInfo<AdvancedSearch> {
    return {
      FunctionEntities: this.adaptable.api.advancedSearchApi.getAllAdvancedSearch(),
      AddAction: AdvancedSearchRedux.AdvancedSearchAdd,
      EditAction: AdvancedSearchRedux.AdvancedSearchEdit,
    };
  }

  public getSpecialColumnReferences(specialColumnId: string): string | undefined {
    // TODO:  Need to be able to search expressions for this column, but worth holding off until they have all been updated!
    return undefined;
  }
}
