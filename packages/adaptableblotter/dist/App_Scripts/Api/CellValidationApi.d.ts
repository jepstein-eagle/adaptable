import { ApiBase } from "./ApiBase";
import { ICellValidationRule } from './Interface/IAdaptableBlotterObjects';
export interface ICellValidationApi {
    GetAll(): ICellValidationRule[];
    Add(cellValidationRule: ICellValidationRule): void;
    Delete(cellValidationRule: ICellValidationRule): void;
}
export declare class CellValidationApi extends ApiBase implements ICellValidationApi {
    GetAll(): ICellValidationRule[];
    Add(cellValidationRule: ICellValidationRule): void;
    Delete(cellValidationRule: ICellValidationRule): void;
}
