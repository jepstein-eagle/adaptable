import { IStrategy } from './IStrategy';
import { CellChangeType, CellValidationAction, ColumnType } from '../Enums';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { IRangeExpression } from '../Interface/IExpression';


export interface ICellValidationStrategy extends IStrategy {
        ValidateCellChange(dataChangingEvent: IDataChangedEvent): boolean
        CreateEmptyCellValidationRule(): ICellValidationRule
}

export interface ICellValidationRule {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        CellValidationAction: CellValidationAction;
        Description: string;
        ColumnType: ColumnType
}





