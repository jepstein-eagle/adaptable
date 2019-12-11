import { ConditionalStyleState } from '../PredefinedConfig/ConditionalStyleState';
import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { DataChangedInfo } from '../BlotterOptions/CommonObjects/DataChangedInfo';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export abstract class ConditionalStyleStrategy extends AdaptableStrategyBase
  implements IConditionalStyleStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ConditionalStyleStrategyId, blotter);
    this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) =>
      this.handleDataSourceChanged(eventText)
    );
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ConditionalStyleStrategyName,
      ComponentName: ScreenPopups.ConditionalStylePopup,
      Icon: StrategyConstants.ConditionalStyleGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'style')) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: 'New',
        source: 'ColumnMenu',
      };
      return this.createColumnMenuItemShowPopup(
        'Create ' + StrategyConstants.ConditionalStyleStrategyName,
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
