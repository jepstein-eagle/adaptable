import { ConditionalStyleState } from '../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export abstract class ConditionalStyleStrategy extends AdaptableStrategyBase
  implements IConditionalStyleStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ConditionalStyleStrategyId, blotter);
    this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) =>
      this.handleDataSourceChanged(eventText)
    );
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ConditionalStyleStrategyName,
      ScreenPopups.ConditionalStylePopup,
      StrategyConstants.ConditionalStyleGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      this.createColumnMenuItemShowPopup(
        'Create ' + StrategyConstants.ConditionalStyleStrategyName,
        ScreenPopups.ConditionalStylePopup,
        StrategyConstants.ConditionalStyleGlyph,
        'New|' + column.ColumnId
      );
    }
  }

  // Called when a single piece of data changes, ie. usually the result of an inline edit
  protected abstract handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void;

  public abstract initStyles(): void;
}
