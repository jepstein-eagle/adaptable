
import { IDataChangingEvent } from './Interface/IAuditService';
import { IValidationService } from './Interface/IValidationService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LeafExpressionOperator } from '../Enums';
import { CellValidationState } from '../../Redux/ActionsReducers/Interface/IState';
import * as StrategyIds from '../Constants/StrategyIds'
import { IColumn } from '../Interface/IColumn';
import { ICellValidationRule } from '../Api/Interface/AdaptableBlotterObjects';
import { ExpressionHelper, IRangeEvaluation } from '../Helpers/ExpressionHelper';
import { ILoggingService } from './Interface/ILoggingService';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';

export class LoggingService implements ILoggingService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    // Bit pointless for now but will add some beef in 2.1...
    public LogMessage(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter: " + message, optionalParams)
        } else {
            console.log("Adaptable Blotter: " + message)
        }
    }
    public LogWarning(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn("Adaptable Blotter Warning: " + message, optionalParams)
        } else {
            console.warn("Adaptable Blotter Warning: " + message)
        }
    }
    public LogError(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error("Adaptable Blotter Error: " + message, optionalParams)
        } else {
            console.error("Adaptable Blotter Error: " + message)
        }
    }


}
