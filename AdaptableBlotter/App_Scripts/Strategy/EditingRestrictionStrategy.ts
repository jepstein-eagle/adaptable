import { IEditingRestrictionStrategy, IEditingRestriction } from '../Core/Interface/IEditingRestrictionStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType, EditingRestrictionAction, LeafExpressionOperator } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { EditingRestrictionState } from '../Redux/ActionsReducers/Interface/IState';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IRangeExpression } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'


export class EditingRestrictionStrategy extends AdaptableStrategyBase implements IEditingRestrictionStrategy {
    private menuItemConfig: IMenuItem;
    private EditingRestrictions: IEditingRestriction[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.EditingRestrictionStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Editing Restrictions", this.Id, 'EditingRestrictionConfig', MenuType.Configuration, "flag");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        //          this.blotter.OnGridSave().Subscribe((sender, gridSaveInfo) => this.CheckGridSaveInfo(gridSaveInfo))
    }

    InitState() {
        if (this.EditingRestrictions != this.GetEditingRestrictionState().EditingRestrictions) {
            this.EditingRestrictions = this.GetEditingRestrictionState().EditingRestrictions;
        }
    }

    public OnCellChanging(dataChangedEvent: IDataChangedEvent): boolean {
        let editingRestrictions = this.EditingRestrictions.filter(v => v.ColumnId == dataChangedEvent.ColumnName);
        if (editingRestrictions.length > 0) {
            let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

            // first do restrictions which prevent edit
            for (let editingRestriction of editingRestrictions.filter(v => v.EditingRestrictionAction == EditingRestrictionAction.Prevent)) {
                let hasFailed: boolean = this.IsEditingRestrictionRequired(editingRestriction, dataChangedEvent, columns);
                if (hasFailed) {
                    alert("Editing Restriction: " + editingRestriction.Description + this.getExpressionDescription(editingRestriction, columns))
                    return false;
                }
            }
            // then do restrictions which show a warning 
            for (let editingRestriction of editingRestrictions.filter(v => v.EditingRestrictionAction == EditingRestrictionAction.Warning)) {
                let hasFailed: boolean = this.IsEditingRestrictionRequired(editingRestriction, dataChangedEvent, columns);
                if (hasFailed) {
                    if (!confirm("Editing Restriction: " + editingRestriction.Description + this.getExpressionDescription(editingRestriction, columns) + " has failed.  Do you want to continue?")) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private IsEditingRestrictionRequired(editingRestriction: IEditingRestriction, dataChangedEvent: IDataChangedEvent, columns: IColumn[]): boolean {
        // first see if the Expression has passed (if there is one)
        if (editingRestriction.HasOtherExpression) {
            let isExpressionValid = ExpressionHelper.checkForExpression(editingRestriction.OtherExpression, dataChangedEvent.IdentifierValue, columns, this.blotter);
            if (!isExpressionValid) {
                return false;
            }
        }

        // if its any just get out before evaluating anything else
        if (editingRestriction.RangeExpression.Operator == LeafExpressionOperator.All) {
            return true;
        }

        // taken primarily from IsSatisfied in expresion - wonder if we can use that fully?
        let operand1: any;
        let operand2: any;
        let newValue: any;
        switch (editingRestriction.ColumnType) {
            case ColumnType.Date:
                operand1 = Date.parse(editingRestriction.RangeExpression.Operand1)
                if (editingRestriction.RangeExpression.Operand2 != "") {
                    operand2 = Date.parse(editingRestriction.RangeExpression.Operand2)
                }
                newValue = dataChangedEvent.NewValue.setHours(0, 0, 0, 0)
                break
            case ColumnType.Number:
                operand1 = Number(editingRestriction.RangeExpression.Operand1)
                if (editingRestriction.RangeExpression.Operand2 != "") {
                    operand2 = Number(editingRestriction.RangeExpression.Operand2);
                }
                newValue = dataChangedEvent.NewValue;
                break
            case ColumnType.Boolean:
            case ColumnType.Object:
            case ColumnType.String:
                operand1 = editingRestriction.RangeExpression.Operand1.toLowerCase();
                operand2 = editingRestriction.RangeExpression.Operand2.toLowerCase();
                newValue = dataChangedEvent.NewValue.toLowerCase();
                break;
        }

        switch (editingRestriction.RangeExpression.Operator) {
            case LeafExpressionOperator.Equals:
                return newValue == operand1;
            case LeafExpressionOperator.NotEquals:
                return newValue != operand1;
            case LeafExpressionOperator.GreaterThan:
                return newValue > operand1;
            case LeafExpressionOperator.LessThan:
                return newValue < operand1;
            case LeafExpressionOperator.PercentChange:
                let percentChange: number = Math.abs(100 - Math.abs(newValue * 100 / dataChangedEvent.OldValue))
                return percentChange > Number(operand1);
            case LeafExpressionOperator.ValueChange:
                let changeInValue: number = Math.abs(newValue - dataChangedEvent.OldValue);
                return changeInValue > Number(operand1);
            case LeafExpressionOperator.Between:
                return (newValue > operand1 && newValue < operand2);
            case LeafExpressionOperator.NotBetween:
                return !(newValue > operand1 && newValue < operand2);
        }
        return true;
    }

    public CreateEmptyEditingRestriction(): IEditingRestriction {
        let newEditingRestriction: IEditingRestriction = {
            EditingRestrictionAction: EditingRestrictionAction.Prevent,
            ColumnId: "select",
            ColumnType: ColumnType.Object,
            RangeExpression: this.createEmptyRangeExpression(),
            HasOtherExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: ""
        }
        return newEditingRestriction;
    }

    private createEmptyRangeExpression(): IRangeExpression {
        let newRangeExpression: IRangeExpression = {
            Operator: LeafExpressionOperator.All,
            Operand1: "",
            Operand2: ""
        }
        return newRangeExpression;
    }

    private getExpressionDescription(editingRestriction: IEditingRestriction, columns: IColumn[]): string {
        return (editingRestriction.HasOtherExpression) ?
           " when " + ExpressionHelper.ConvertExpressionToString(editingRestriction.OtherExpression, columns, this.blotter) :
            "";
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetEditingRestrictionState(): EditingRestrictionState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().EditingRestriction;
    }
}


