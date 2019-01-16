import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IFlashingCell } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
export declare class FlashingCellStrategyagGrid extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    private currentFlashing;
    protected FlashCell(dataChangedInfo: IDataChangedInfo, flashingCell: IFlashingCell): void;
    protected InitState(): void;
}
