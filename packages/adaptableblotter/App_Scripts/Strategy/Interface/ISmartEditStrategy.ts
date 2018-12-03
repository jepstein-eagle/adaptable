import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { MathOperation } from '../../Utilities/Enums';
import { IPreviewInfo } from '../../api/Interface/IPreview';
import { ICellInfo } from '../../api/Interface/Interfaces';

export interface ISmartEditStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
    ApplySmartEdit(newValues: ICellInfo[]): void;
}

