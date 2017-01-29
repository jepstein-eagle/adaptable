import { IStrategy } from './IStrategy';
import { EditingRestrictionAction, ColumnType } from '../Enums';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'


export interface IEditingRestrictionStrategy extends IStrategy {
        OnCellChanging(dataChangingEvent: IDataChangedEvent): boolean
        CreateEmptyEditingRestrictionRule(): IEditingRestrictionRule
}

export interface IEditingRestrictionRule {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        EditingRestrictionAction: EditingRestrictionAction;
        Description: string;
        ColumnType: ColumnType;
        HasOtherExpression: boolean;
        OtherExpression: Expression;
}
