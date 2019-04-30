import { ApiBase } from "./ApiBase";
import { ICellValidationRule } from "../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { ICellValidationApi } from './Interface/ICellValidationApi';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CellValidationApi extends ApiBase implements ICellValidationApi {
    getCellValidationState(): CellValidationState;
    getAllCellValidation(): ICellValidationRule[];
    addCellValidation(cellValidationRule: ICellValidationRule): void;
    deleteCellValidation(cellValidationRule: ICellValidationRule): void;
}
