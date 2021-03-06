import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux';
import { FlashingCellState, FlashingCell } from '../PredefinedConfig/FlashingCellState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export abstract class FlashingCellsStrategy extends AdaptableStrategyBase
  implements IFlashingCellsStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.FlashingCellsStrategyId,
      StrategyConstants.FlashingCellsStrategyFriendlyName,
      StrategyConstants.FlashingCellGlyph,
      ScreenPopups.FlashingCellsPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && column.DataType == 'Number') {
      if (
        this.adaptable.api.calculatedColumnApi
          .getAllCalculatedColumn()
          .find(c => c.ColumnId == column.ColumnId) == null
      ) {
        let flashingCell = this.adaptable.api.flashingCellApi
          .getAllFlashingCell()
          .find(x => x.ColumnId == column.ColumnId);
        if (flashingCell && flashingCell.IsLive) {
          return [
            this.createColumnMenuItemReduxAction(
              'Turn Flashing Cell Off',
              StrategyConstants.FlashingCellGlyph,
              FlashingCellsRedux.FlashingCellSelect(flashingCell)
            ),
          ];
        } else {
          if (!flashingCell) {
            let flashingCellState: FlashingCellState = this.adaptable.api.flashingCellApi.getFlashingCellState();
            flashingCell = ObjectFactory.CreateDefaultFlashingCell(
              column,
              flashingCellState.DefaultUpColor,
              flashingCellState.DefautDownColor,
              flashingCellState.DefaultDuration
            );
          }
          return [
            this.createColumnMenuItemReduxAction(
              'Turn Flashing Cell On',
              StrategyConstants.FlashingCellGlyph,
              FlashingCellsRedux.FlashingCellSelect(flashingCell)
            ),
          ];
        }
      }
    }
  }

  public getSpecialColumnReferences(specialColumnId: string, references: string[]): void {
    let flashingCells: FlashingCell[] = this.adaptable.api.flashingCellApi
      .getAllFlashingCell()
      .filter((fc: FlashingCell) => fc.ColumnId == specialColumnId);
    if (ArrayExtensions.IsNotNullOrEmpty(flashingCells)) {
      references.push(flashingCells.length + ' Flashing Cells');
    }
  }

  public abstract initStyles(): void;
}
