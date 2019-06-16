import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IDataChangedInfo } from '../../Utilities/Interface/IDataChangedInfo';
import { ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import { IFlashingCell } from '../../PredefinedConfig/IUserState/FlashingCellState';

export class FlashingCellsStrategyHypergrid extends FlashingCellsStrategy
  implements IFlashingCellsStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
  }

  public initStyles(): void {
    // no implemenation as we handle data source changed
  }

  protected shouldHandleDataSourceChanged(): boolean {
    return true;
  }

  protected FlashCell(dataChangedInfo: IDataChangedInfo, flashingCell: IFlashingCell): void {
    let theBlotter = this.blotter as AdaptableBlotter;
    if (dataChangedInfo.OldValue == null) {
      // currently should never happen
      dataChangedInfo.OldValue = this.blotter.DataService.GetPreviousColumnValue(
        dataChangedInfo.ColumnId,
        dataChangedInfo.IdentifierValue,
        dataChangedInfo.NewValue,
        ChangeDirection.Ignore
      );
    }
    if (dataChangedInfo.OldValue != dataChangedInfo.NewValue) {
      var oldvalueNumber: Number = Number(dataChangedInfo.OldValue);
      var newValueNumber: Number = Number(dataChangedInfo.NewValue);

      var cellStyle: string =
        oldvalueNumber > newValueNumber ? flashingCell.DownColor : flashingCell.UpColor;
      theBlotter.addCellStyleHypergrid(
        dataChangedInfo.IdentifierValue,
        dataChangedInfo.ColumnId,
        { flashBackColor: cellStyle },
        flashingCell.FlashingCellDuration
      );
    }
  }
}
