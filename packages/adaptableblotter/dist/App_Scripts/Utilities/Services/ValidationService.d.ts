import { IDataChangingEvent } from './Interface/IAuditService';
import { IValidationService } from './Interface/IValidationService';
import { ICellValidationRule } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
export declare class ValidationService implements IValidationService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    ValidateCellChanging(dataChangedEvent: IDataChangingEvent): ICellValidationRule[];
    private IsCellValidationRuleBroken;
    private GetCellValidationState;
}
