import { ICellValidationRule } from "../../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { CellValidationState } from '../../Redux/ActionsReducers/Interface/IState';
export interface ICellValidationApi {
    GetState(): CellValidationState;
    GetAll(): ICellValidationRule[];
    Add(cellValidationRule: ICellValidationRule): void;
    Delete(cellValidationRule: ICellValidationRule): void;
}
