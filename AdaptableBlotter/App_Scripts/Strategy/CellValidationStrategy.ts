import { ICellValidationStrategy, ICellValidationRule } from '../Core/Interface/ICellValidationStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType, CellValidationAction, CellChangeType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ICellChangeRule } from '../Core/Interface/ICellValidationStrategy';


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
        let validationRules = this.CellValidationRules.filter(v => v.CellChangeRule.ColumnId == dataChangedEvent.ColumnName);
        if (validationRules.length > 0) {
            // first do prevent 
            for (let validationRule of validationRules.filter(v => v.CellValidationAction == CellValidationAction.Prevent)) {
                let hasPassed: boolean = this.CheckValidationRulePasses(validationRule, dataChangedEvent);
                if (!hasPassed) {
                    alert("Validation Rule Failed: " + validationRule.Description)
                    return false;
                }
            }
            // now do warning 
            for (let validationRule of validationRules.filter(v => v.CellValidationAction == CellValidationAction.Warning)) {
                let hasPassed: boolean = this.CheckValidationRulePasses(validationRule, dataChangedEvent);
                if (!hasPassed) {
                    if (!confirm("Rule: " + validationRule.Description + " has failed.  Do you want to continue?")) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private CheckValidationRulePasses(cellValidationRule: ICellValidationRule, dataChangedEvent: IDataChangedEvent): boolean {
        switch (cellValidationRule.CellChangeRule.CellChangeType) {
            case CellChangeType.Any:
                return false;
            case CellChangeType.Equals:
                return dataChangedEvent.NewValue != cellValidationRule.CellChangeRule.ChangeValue;
            case CellChangeType.NotEquals:
                return dataChangedEvent.NewValue == cellValidationRule.CellChangeRule.ChangeValue;
            case CellChangeType.GreaterThan:
                return dataChangedEvent.NewValue <= cellValidationRule.CellChangeRule.ChangeValue;
            case CellChangeType.LessThan:
                return dataChangedEvent.NewValue >= cellValidationRule.CellChangeRule.ChangeValue;
            case CellChangeType.PercentChange:
                let percentChange: number = Math.abs(100 - Math.abs(dataChangedEvent.NewValue * 100 / dataChangedEvent.OldValue))
                return percentChange < cellValidationRule.CellChangeRule.ChangeValue;
            case CellChangeType.ValueChange:
                let changeInValue: number = Math.abs(dataChangedEvent.NewValue - dataChangedEvent.OldValue);
                return changeInValue < cellValidationRule.CellChangeRule.ChangeValue;
        }
        return true;
    }

    public CreateEmptyCellValidationRule(): ICellValidationRule {
        let newAlert: ICellValidationRule = {
            CellValidationAction: CellValidationAction.Prevent,
            CellChangeRule: this.CreateEmptyCellChangeRule(),
            Description: ""
        }
        return newAlert;
    }

    public CreateEmptyCellChangeRule(): ICellChangeRule {
        let newCellChangeRule: ICellChangeRule = {
            ColumnId: "select",
            ChangeValue: null,
            CellChangeType: CellChangeType.Any
        }
        return newCellChangeRule;
    }


    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetCellValidationState(): CellValidationState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
    }
}


