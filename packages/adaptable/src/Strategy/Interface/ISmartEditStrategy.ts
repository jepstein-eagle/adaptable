import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';

export interface ISmartEditStrategy extends IStrategy {
  CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
  BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
  ApplySmartEdit(newValues: GridCell[]): void;
}
