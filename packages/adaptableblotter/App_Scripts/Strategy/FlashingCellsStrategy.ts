import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux';
import { FlashingCellState, FlashingCell } from '../PredefinedConfig/FlashingCellState';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { DataChangedInfo } from '../BlotterOptions/CommonObjects/DataChangedInfo';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/menu';

export abstract class FlashingCellsStrategy extends AdaptableStrategyBase
  implements IFlashingCellsStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.FlashingCellsStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.FlashingCellsStrategyName,
      ComponentName: ScreenPopups.FlashingCellsPopup,
      Icon: StrategyConstants.FlashingCellGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      if (column.DataType == DataType.Number) {
        if (
          this.blotter.api.calculatedColumnApi
            .getAllCalculatedColumn()
            .find(c => c.ColumnId == column.ColumnId) == null
        ) {
          let flashingCell = this.blotter.api.flashingCellApi
            .getAllFlashingCell()
            .find(x => x.ColumnId == column.ColumnId);
          if (flashingCell && flashingCell.IsLive) {
            return this.createColumnMenuItemReduxAction(
              'Turn Flashing Cell Off',
              StrategyConstants.FlashingCellGlyph,
              FlashingCellsRedux.FlashingCellSelect(flashingCell)
            );
          } else {
            if (!flashingCell) {
              let flashingCellState: FlashingCellState = this.blotter.api.flashingCellApi.getFlashingCellState();
              flashingCell = ObjectFactory.CreateDefaultFlashingCell(
                column,
                flashingCellState.DefaultUpColor,
                flashingCellState.DefautDownColor,
                flashingCellState.DefaultDuration
              );
            }
            return this.createColumnMenuItemReduxAction(
              'Turn Flashing Cell On',
              StrategyConstants.FlashingCellGlyph,
              FlashingCellsRedux.FlashingCellSelect(flashingCell)
            );
          }
        }
      }
    }
  }

  public abstract initStyles(): void;
}
