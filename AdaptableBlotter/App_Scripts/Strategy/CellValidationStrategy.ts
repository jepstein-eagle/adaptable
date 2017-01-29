import { ICellValidationStrategy, ICellValidationRule } from '../Core/Interface/ICellValidationStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType, CellValidationAction, LeafExpressionOperator } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IRangeExpression } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'


export class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {
    private menuItemConfig: IMenuItem;
    private CellValidationRules: ICellValidationRule[]


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CellValidationStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Validation Rules", this.Id, 'CellValidationConfig', MenuType.Configuration, "flag");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        //          this.blotter.OnGridSave().Subscribe((sender, gridSaveInfo) => this.CheckGridSaveInfo(gridSaveInfo))
    }


    InitState() {
        if (this.CellValidationRules != this.GetCellValidationState().CellValidationRules) {

            // call search service as search might need to re-run if its using a filter that has changed / been deleted
            // tell the search service that a filter has changed and it will decide if it needs to run search
            // get filter ids in old collection that are not in new one (as we dont care about new user filter expressions)
            if (this.CellValidationRules != null && this.CellValidationRules.length > 0) {


            }
            this.CellValidationRules = this.GetCellValidationState().CellValidationRules;
        }
    }

    public ValidateCellChange(dataChangedEvent: IDataChangedEvent): boolean {
        let validationRules = this.CellValidationRules.filter(v => v.ColumnId == dataChangedEvent.ColumnName);
        if (validationRules.length > 0) {
            // first do prevent 
            for (let validationRule of validationRules.filter(v => v.CellValidationAction == CellValidationAction.Prevent)) {
                let hasFailed: boolean = this.IsFailedValidation(validationRule, dataChangedEvent);
                if (hasFailed) {
                    alert("Validation Rule Failed: " + validationRule.Description)
                    return false;
                }
            }
            // now do warning 
            for (let validationRule of validationRules.filter(v => v.CellValidationAction == CellValidationAction.Warning)) {
                let hasFailed: boolean = this.IsFailedValidation(validationRule, dataChangedEvent);
                if (hasFailed) {
                    if (!confirm("Rule: " + validationRule.Description + " has failed.  Do you want to continue?")) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private IsFailedValidation(cellValidationRule: ICellValidationRule, dataChangedEvent: IDataChangedEvent): boolean {
        // if its any just get out before evaluating anything else
        if (cellValidationRule.RangeExpression.Operator == LeafExpressionOperator.Any) {
            return false;
        }

        // taken primarily from IsSatisfied in expresion - wonder if we can use that fully?
        let operand1: any;
        let operand2: any;
        let newValue: any;
        switch (cellValidationRule.ColumnType) {
            case ColumnType.Date:
                operand1 = Date.parse(cellValidationRule.RangeExpression.Operand1)
                if (cellValidationRule.RangeExpression.Operand2 != "") {
                    operand2 = Date.parse(cellValidationRule.RangeExpression.Operand2)
                }
                newValue = dataChangedEvent.NewValue.setHours(0, 0, 0, 0)
                break
            case ColumnType.Number:
                operand1 = Number(cellValidationRule.RangeExpression.Operand1)
                if (cellValidationRule.RangeExpression.Operand2 != "") {
                    operand2 = Number(cellValidationRule.RangeExpression.Operand2);
                }
                newValue = dataChangedEvent.NewValue;
                break
            case ColumnType.Boolean:
            case ColumnType.Object:
            case ColumnType.String:
                operand1 = cellValidationRule.RangeExpression.Operand1.toLowerCase();
                operand2 = cellValidationRule.RangeExpression.Operand2.toLowerCase();
                newValue = dataChangedEvent.NewValue.toLowerCase();
                break;
        }

        switch (cellValidationRule.RangeExpression.Operator) {
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

    public CreateEmptyCellValidationRule(): ICellValidationRule {
        let newValidationRule: ICellValidationRule = {
            CellValidationAction: CellValidationAction.Prevent,
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
            Operator: LeafExpressionOperator.Any,
            Operand1: "",
            Operand2: ""
        }
        return newRangeExpression;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetCellValidationState(): CellValidationState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
    }
}


