import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnChooserStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnChooserStrategyName,
      ComponentName: ScreenPopups.ColumnChooserPopup,
      Icon: StrategyConstants.ColumnChooserGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    return this.createColumnMenuItemShowPopup(
      'Show ' + StrategyConstants.ColumnChooserStrategyName,
      ScreenPopups.ColumnChooserPopup,
      StrategyConstants.ColumnChooserGlyph
    );
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    return this.createMainMenuItemShowPopup({
      Label: 'Show ' + StrategyConstants.ColumnChooserStrategyName,
      ComponentName: ScreenPopups.ColumnChooserPopup,
      Icon: StrategyConstants.ColumnChooserGlyph,
      PopupParams: popUpParams,
    });
  }
}
