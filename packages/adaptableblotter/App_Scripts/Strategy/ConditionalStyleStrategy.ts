import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export abstract class ConditionalStyleStrategy extends AdaptableStrategyBase
  implements IConditionalStyleStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ConditionalStyleStrategyId, adaptable);
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      this.handleDataSourceChanged(dataChangedInfo);
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ConditionalStyleStrategyFriendlyName,
      ComponentName: ScreenPopups.ConditionalStylePopup,
      Icon: StrategyConstants.ConditionalStyleGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'style')) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: 'New',
        source: 'ColumnMenu',
      };
      return this.createColumnMenuItemShowPopup(
        'Create ' + StrategyConstants.ConditionalStyleStrategyFriendlyName,
        ScreenPopups.ConditionalStylePopup,
        StrategyConstants.ConditionalStyleGlyph,
        popupParam
      );
    }
  }

  // Called when a single piece of data changes, ie. usually the result of an inline edit
  protected abstract handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void;

  public abstract initStyles(): void;
}
