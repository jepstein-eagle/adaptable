import { IEditingRestrictionStrategy, IEditingRestrictionRule } from '../Core/Interface/IEditingRestrictionStrategy';
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
    private EditingRestrictionRules: IEditingRestrictionRule[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.EditingRestrictionStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Validation Rules", this.Id, 'EditingRestrictionConfig', MenuType.Configuration, "flag");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        //          this.blotter.OnGridSave().Subscribe((sender, gridSaveInfo) => this.CheckGridSaveInfo(gridSaveInfo))
    }

    InitState() {
        if (this.EditingRestrictionRules != this.GetEditingRestrictionState().EditingRestrictions) {
            this.EditingRestrictionRules = this.GetEditingRestrictionState().EditingRestrictions;
        }
    }

    public OnCellChanging(dataChangedEvent: IDataChangedEvent): boolean {
        let validationRules = this.EditingRestrictionRules.filter(v => v.ColumnId == dataChangedEvent.ColumnName);
        if (validationRules.length > 0) {
            let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

            // first do cell validations which prevent edit
            for (let validationRule of validationRules.filter(v => v.EditingRestrictionAction == EditingRestrictionAction.Prevent)) {
                let hasFailed: boolean = this.IsFailedValidation(validationRule, dataChangedEvent, columns);
                if (hasFailed) {
                    alert("Validation Rule Failed: " + validationRule.Description + this.getExpressionDescription(validationRule, columns))
                    return false;
                }
            }
            // then do cell validations which show a warning 
            for (let validationRule of validationRules.filter(v => v.EditingRestrictionAction == EditingRestrictionAction.Warning)) {
                let hasFailed: boolean = this.IsFailedValidation(validationRule, dataChangedEvent, columns);
                if (hasFailed) {
                    if (!confirm("Rule: " + validationRule.Description + this.getExpressionDescription(validationRule, columns) + " has failed.  Do you want to continue?")) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private IsFailedValidation(EditingRestrictionRule: IEditingRestrictionRule, dataChangedEvent: IDataChangedEvent, columns: IColumn[]): boolean {
        // first see if the Expression has passed (if there is one)
        if (EditingRestrictionRule.HasOtherExpression) {
            let isExpressionValid = ExpressionHelper.checkForExpression(EditingRestrictionRule.OtherExpression, dataChangedEvent.IdentifierValue, columns, this.blotter);
            if (!isExpressionValid) {
                return false;
            }
        }

        // if its any just get out before evaluating anything else
        if (EditingRestrictionRule.RangeExpression.Operator == LeafExpressionOperator.All) {
            return true;
        }

        // taken primarily from IsSatisfied in expresion - wonder if we can use that fully?
        let operand1: any;
        let operand2: any;
        let newValue: any;
        switch (EditingRestrictionRule.ColumnType) {
            case ColumnType.Date:
                operand1 = Date.parse(EditingRestrictionRule.RangeExpression.Operand1)
                if (EditingRestrictionRule.RangeExpression.Operand2 != "") {
                    operand2 = Date.parse(EditingRestrictionRule.RangeExpression.Operand2)
                }
                newValue = dataChangedEvent.NewValue.setHours(0, 0, 0, 0)
                break
            case ColumnType.Number:
                operand1 = Number(EditingRestrictionRule.RangeExpression.Operand1)
                if (EditingRestrictionRule.RangeExpression.Operand2 != "") {
                    operand2 = Number(EditingRestrictionRule.RangeExpression.Operand2);
                }
                newValue = dataChangedEvent.NewValue;
                break
            case ColumnType.Boolean:
            case ColumnType.Object:
            case ColumnType.String:
                operand1 = EditingRestrictionRule.RangeExpression.Operand1.toLowerCase();
                operand2 = EditingRestrictionRule.RangeExpression.Operand2.toLowerCase();
                newValue = dataChangedEvent.NewValue.toLowerCase();
                break;
        }

        switch (EditingRestrictionRule.RangeExpression.Operator) {
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

    public CreateEmptyEditingRestrictionRule(): IEditingRestrictionRule {
        let newValidationRule: IEditingRestrictionRule = {
            EditingRestrictionAction: EditingRestrictionAction.Prevent,
            ColumnId: "select",
            ColumnType: ColumnType.Object,
            RangeExpression: this.createEmptyRangeExpression(),
            HasOtherExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: ""
        }
        return newValidationRule;
    }

    private createEmptyRangeExpression(): IRangeExpression {
        let newRangeExpression: IRangeExpression = {
            Operator: LeafExpressionOperator.All,
            Operand1: "",
            Operand2: ""
        }
        return newRangeExpression;
    }

    private getExpressionDescription(validationRule: IEditingRestrictionRule, columns: IColumn[]): string {
        return (validationRule.OtherExpression) ?
           " when " + ExpressionHelper.ConvertExpressionToString(validationRule.OtherExpression, columns, this.blotter) :
            "";

    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetEditingRestrictionState(): EditingRestrictionState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().EditingRestriction;
    }
}


