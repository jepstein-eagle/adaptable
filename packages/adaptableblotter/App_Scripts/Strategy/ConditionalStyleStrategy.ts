import { ConditionalStyleState } from '../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';
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
      GlyphIcon: StrategyConstants.ConditionalStyleGlyph,
    });
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: 'New',
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
