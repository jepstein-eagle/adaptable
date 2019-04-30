import { ICellValidationRule } from "../../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { CellValidationState } from '../../Redux/ActionsReducers/Interface/IState';
export interface ICellValidationApi {
    getCellValidationState(): CellValidationState;
    getAllCellValidation(): ICellValidationRule[];
    addCellValidation(cellValidationRule: ICellValidationRule): void;
    deleteCellValidation(cellValidationRule: ICellValidationRule): void;
}
