import { IValidationService } from './Interface/IValidationService';
import { ICellValidationRule } from "../Interface/BlotterObjects/ICellValidationRule";
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IDataChangedInfo } from '../Interface/IDataChangedInfo';
export declare class ValidationService implements IValidationService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[];
    private IsCellValidationRuleBroken;
    private GetCellValidationState;
    private logAuditValidationEvent;
}
