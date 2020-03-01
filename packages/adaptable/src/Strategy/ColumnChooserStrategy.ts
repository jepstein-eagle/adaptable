import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ColumnChooserStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnChooserStrategyFriendlyName,
      ComponentName: ScreenPopups.ColumnChooserPopup,
      Icon: StrategyConstants.ColumnChooserGlyph,
    });
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    let baseMenuItems: AdaptableMenuItem[] = [];

    if (this.adaptable.isSelectable()) {
      if (this.canCreateColumnMenuItem(column, this.adaptable)) {
        baseMenuItems.push(
          this.createColumnMenuItemReduxAction(
            'Select Column',
            'tab-unselected',
            GridRedux.GridSelectColumn(column.ColumnId)
          )
        );
      }
    }
    if (this.canCreateColumnMenuItem(column, this.adaptable)) {
      baseMenuItems.push(
        this.createColumnMenuItemReduxAction(
          'Hide Column',
          'hide-column',
          GridRedux.GridHideColumn(column.ColumnId)
        )
      );
    }

    baseMenuItems.push(
      this.createColumnMenuItemShowPopup(
        'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
        ScreenPopups.ColumnChooserPopup,
        StrategyConstants.ColumnChooserGlyph
      )
    );
    return baseMenuItems;
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
