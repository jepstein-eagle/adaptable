import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.ColumnChooserStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnChooserStrategyFriendlyName,
      ComponentName: ScreenPopups.ColumnChooserPopup,
      Icon: StrategyConstants.ColumnChooserGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    return this.createColumnMenuItemShowPopup(
      'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
      ScreenPopups.ColumnChooserPopup,
      StrategyConstants.ColumnChooserGlyph
    );
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    return this.createMainMenuItemShowPopup({
      Label: 'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
      ComponentName: ScreenPopups.ColumnChooserPopup,
      Icon: StrategyConstants.ColumnChooserGlyph,
      PopupParams: popUpParams,
    });
  }
}
