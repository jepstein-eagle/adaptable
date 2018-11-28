import { IDataChangingEvent } from './Interface/IAuditService';
import { IValidationService } from './Interface/IValidationService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ICellValidationRule } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare class ValidationService implements IValidationService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    ValidateCellChanging(dataChangedEvent: IDataChangingEvent): ICellValidationRule[];
    private IsCellValidationRuleBroken;
    private GetCellValidationState;
}
