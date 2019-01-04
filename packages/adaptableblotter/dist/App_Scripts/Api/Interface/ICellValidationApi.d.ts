import { ICellValidationRule } from './IAdaptableBlotterObjects';
export interface ICellValidationApi {
    GetAll(): ICellValidationRule[];
    Add(cellValidationRule: ICellValidationRule): void;
    Delete(cellValidationRule: ICellValidationRule): void;
}
