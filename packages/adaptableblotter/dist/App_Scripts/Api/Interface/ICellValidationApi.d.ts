import { ICellValidationRule } from "../../Utilities/Interface/BlotterObjects/ICellValidationRule";
export interface ICellValidationApi {
    GetAll(): ICellValidationRule[];
    Add(cellValidationRule: ICellValidationRule): void;
    Delete(cellValidationRule: ICellValidationRule): void;
}
