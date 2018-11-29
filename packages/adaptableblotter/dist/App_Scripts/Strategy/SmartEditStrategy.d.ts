import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { MathOperation } from '../Utilities/Enums';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy';
import { ICellInfo } from '../Core/Interface/Interfaces';
import { IPreviewInfo } from '../Core/Interface/IPreview';
export declare class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    private SmartEditState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    ApplySmartEdit(newValues: ICellInfo[]): void;
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
    private GetSmartEditState;
}
