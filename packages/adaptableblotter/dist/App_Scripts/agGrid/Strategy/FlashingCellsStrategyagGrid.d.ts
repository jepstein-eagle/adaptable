import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IFlashingCell } from "../../Utilities/Interface/BlotterObjects/IFlashingCell";
import { IDataChangedInfo } from '../../Utilities/Interface/IDataChangedInfo';
export declare class FlashingCellStrategyagGrid extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    private currentFlashing;
    protected shouldHandleDataSourceChanged(): boolean;
    protected FlashCell(dataChangedInfo: IDataChangedInfo, flashingCell: IFlashingCell): void;
    protected InitState(): void;
}
