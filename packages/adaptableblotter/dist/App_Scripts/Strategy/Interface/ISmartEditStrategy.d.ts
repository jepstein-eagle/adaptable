import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { MathOperation } from '../../Core/Enums';
import { IPreviewInfo } from '../../Core/Interface/IPreview';
import { ICellInfo } from '../../Core/Interface/Interfaces';
export interface ISmartEditStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
    ApplySmartEdit(newValues: ICellInfo[]): void;
}
