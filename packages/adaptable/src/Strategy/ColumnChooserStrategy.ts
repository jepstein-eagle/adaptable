import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { AccessLevel } from '../PredefinedConfig/EntitlementState';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.ColumnChooserStrategyId,
      StrategyConstants.ColumnChooserStrategyFriendlyName,
      StrategyConstants.ColumnChooserGlyph,
      ScreenPopups.ColumnChooserPopup,
      adaptable
    );
  }

  public getMinimumAccessLevelForMenu(): AccessLevel {
    return 'Full';
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    let returnColumnMenuItems: AdaptableMenuItem[] = [];
    if (this.canCreateMenuItem('Full')) {
      returnColumnMenuItems.push(
        this.createColumnMenuItemShowPopup(
          'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
          ScreenPopups.ColumnChooserPopup,
          StrategyConstants.ColumnChooserGlyph
        )
      );
      returnColumnMenuItems.push(
        this.createColumnMenuItemClickFunction('Select Column', 'tab-unselected', () => {
          this.adaptable.api.gridApi.selectColumn(column.ColumnId);
        })
      );
      returnColumnMenuItems.push(
        this.createColumnMenuItemClickFunction('Select Whole Grid', 'tab-unselected', () => {
          this.adaptable.api.gridApi.selectAll();
        })
      );
      if (this.canCreateMenuItem('Full') && column.Hideable) {
        returnColumnMenuItems.push(
          this.createColumnMenuItemClickFunction('Hide Column', 'hide-column', () => {
            this.adaptable.api.gridApi.hideColumn(column.ColumnId);
          })
        );
      }
    }

    return returnColumnMenuItems;
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    if (this.canCreateMenuItem('Full')) {
      return this.createMainMenuItemShowPopup({
        Label: 'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
        ComponentName: ScreenPopups.ColumnChooserPopup,
        Icon: StrategyConstants.ColumnChooserGlyph,
        PopupParams: popUpParams,
      });
    }
  }
}
