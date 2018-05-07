
import { IDataChangingEvent } from './Interface/IAuditService';
import { IValidationService } from './Interface/IValidationService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import {  LeafExpressionOperator } from '../Enums';
import { CellValidationState } from '../../Redux/ActionsReducers/Interface/IState';
import * as StrategyIds from '../Constants/StrategyIds'
import { IColumn } from '../Interface/IColumn';
import { ICellValidationRule } from '../Api/Interface/AdaptableBlotterObjects';
import { ExpressionHelper, IRangeEvaluation } from '../Helpers/ExpressionHelper';
import { IErrorService } from './Interface/IErrorService';

export class ErrorService implements IErrorService {

    constructor(private blotter: IAdaptableBlotter) {
    }

   // Bit pointless for now but will add some beef in 2.1...
    public LogError(errorMessage: string): void {
        console.log(errorMessage)
    }


}
