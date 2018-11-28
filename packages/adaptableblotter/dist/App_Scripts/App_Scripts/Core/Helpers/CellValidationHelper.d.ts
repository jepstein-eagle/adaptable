import { ICellValidationRule } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
export declare module CellValidationHelper {
    function createCellValidationDescription(cellValidationRule: ICellValidationRule, columns: IColumn[]): string;
}
