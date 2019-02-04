import { ApiBase } from "./ApiBase";
import { ICellValidationRule } from "../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { ICellValidationApi } from './Interface/ICellValidationApi';
export declare class CellValidationApi extends ApiBase implements ICellValidationApi {
    GetAll(): ICellValidationRule[];
    Add(cellValidationRule: ICellValidationRule): void;
    Delete(cellValidationRule: ICellValidationRule): void;
}
