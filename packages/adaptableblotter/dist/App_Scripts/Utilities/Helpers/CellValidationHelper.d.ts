import { ICellValidationRule } from '../../api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../api/Interface/IColumn';
export declare module CellValidationHelper {
    function createCellValidationDescription(cellValidationRule: ICellValidationRule, columns: IColumn[]): string;
}
