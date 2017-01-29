import { IStrategy } from './IStrategy';
import { EditingRestrictionAction, ColumnType } from '../Enums';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'


export interface IEditingRestrictionStrategy extends IStrategy {
        OnCellChanging(dataChangingEvent: IDataChangedEvent): boolean
        CreateEmptyEditingRestriction(): IEditingRestriction
}

export interface IEditingRestriction {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        EditingRestrictionAction: EditingRestrictionAction;
        Description: string;
        ColumnType: ColumnType;
        HasExpression: boolean;
        OtherExpression: Expression;
}
