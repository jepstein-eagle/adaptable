import { IValidationService } from './Interface/IValidationService';
import { ICellValidationRule } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
export declare class ValidationService implements IValidationService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[];
    private IsCellValidationRuleBroken;
    private GetCellValidationState;
    private logAuditValidationEvent;
}
