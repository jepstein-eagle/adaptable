import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { MathOperation } from '../Core/Enums';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy';
import { IPreviewInfo } from '../Core/Interface/IPreviewResult';
import { ICellInfo } from '../Core/Interface/Interfaces';
export declare class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    ApplySmartEdit(newValues: ICellInfo[]): void;
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
    private GetSmartEditState;
}
