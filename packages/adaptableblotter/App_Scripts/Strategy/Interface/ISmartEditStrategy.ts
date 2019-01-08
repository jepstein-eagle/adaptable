import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { MathOperation } from '../../Utilities/Enums';
import { ICellInfo } from '../../Api/Interface/Interfaces';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';

export interface ISmartEditStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
    ApplySmartEdit(newValues: ICellInfo[]): void;
}

