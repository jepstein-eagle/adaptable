import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export abstract class FormatColumnStrategy extends AdaptableStrategyBase
  implements IFormatColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.FormatColumnStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.FormatColumnStrategyFriendlyName,
      ComponentName: ScreenPopups.FormatColumnPopup,
      Icon: StrategyConstants.FormatColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'style')) {
      let formatExists: boolean = ArrayExtensions.ContainsItem(
        this.adaptable.api.formatColumnApi.getAllFormatColumn().map(f => f.ColumnId),
        column.ColumnId
      );
      let label = formatExists ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: formatExists ? 'Edit' : 'New',
        source: 'ColumnMenu',
      };

      return this.createColumnMenuItemShowPopup(
        label + StrategyConstants.FormatColumnStrategyFriendlyName,
        ScreenPopups.FormatColumnPopup,
        StrategyConstants.FormatColumnGlyph,
        popupParam
      );
    }
  }

  public abstract initStyles(): void;
}
