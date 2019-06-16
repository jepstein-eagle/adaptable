import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';

export interface ISmartEditStrategy extends IStrategy {
  CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
  BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
  ApplySmartEdit(newValues: ICellInfo[]): void;
}
