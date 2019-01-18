import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IFlashingCell } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
export declare class FlashingCellsStrategyHypergrid extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    protected shouldHandleDataSourceChanged(): boolean;
    protected FlashCell(dataChangedInfo: IDataChangedInfo, flashingCell: IFlashingCell): void;
}
