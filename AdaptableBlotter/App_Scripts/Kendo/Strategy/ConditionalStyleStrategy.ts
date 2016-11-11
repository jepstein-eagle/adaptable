import { ConditionalStyleState } from '../../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../../Core/Interface/IConditionalStyleStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { ConditionalStyleScope, ColumnType, ConditionalStyleColour } from '../../Core/Enums';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { ExpressionString } from '../../Core/Expression/ExpressionString';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { Helper, EnumEx } from '../../Core/Helper';


export class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    private menuItemConfig: IMenuItem;
    private ConditionalStyleState: ConditionalStyleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ConditionalStyleStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Conditional Style", this.Id, 'ConditionalStyleConfig', "plus-sign");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitConditionalStyle())
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.OnGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter))
    }

    private InitConditionalStyle() {
        let oldState: ConditionalStyleState = this.ConditionalStyleState;

        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;

            // Need to remove only those conditions which have a guid in old state that is NOT in the new state
            // Because we update the guid when we edit the condition, we just need to remove conditions that have been deleted or edited
            if (oldState != null && oldState.ConditionalStyleConditions.length > 0 && oldState.ConditionalStyleConditions.length >= this.ConditionalStyleState.ConditionalStyleConditions.length) {
                let conditionsToRemove: IConditionalStyleCondition[] = [];
                oldState.ConditionalStyleConditions.forEach((c) => {
                    if (!this.ConditionalStyleState.ConditionalStyleConditions.find(f => f.Uid == c.Uid)) {
                        conditionsToRemove.push(c)
                    }
                })
                this.removeExistingStyles(conditionsToRemove);
            }

            // Need to add only those conditions which have a guid that is not in the old state
            if (this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
                let conditionsToAdd: IConditionalStyleCondition[] = [];
                this.ConditionalStyleState.ConditionalStyleConditions.forEach((c) => {
                    if (oldState == null || !oldState.ConditionalStyleConditions.find(f => f.Uid == c.Uid)) {
                        conditionsToAdd.push(c)
                    }
                })
                this.addNewStyles(conditionsToAdd);
            }
        }
    }

    private handleGridDataBound(blotter: IAdaptableBlotter) {
        if (this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
            // not nice but not sure we have a choice other than to have to paint every condition again :(
            this.addNewStyles(this.ConditionalStyleState.ConditionalStyleConditions);
        }
    }

    private removeExistingStyles(changedConditions: IConditionalStyleCondition[]): void {
         alert("removing " + changedConditions.length + " conditions")
        let existingStyles: string[] = changedConditions.map(c => ConditionalStyleColour[c.ConditionalStyleColour])
        let existingColumns: string[] = changedConditions.map(c => c.ColumnId)
        // get the columns currently affected - doesnt work with row styles if we do them :(
        this.blotter.removeCellStylesFromGrid(existingStyles, existingColumns);
    }

    private addNewStyles(newConditions: IConditionalStyleCondition[]): void {
         alert("adding " + newConditions.length + " conditions")
        let rowIds: string[] = this.blotter.getAllRowIds();
        rowIds.forEach(rowId => {
            newConditions.forEach(c => {
                if (this.checkForExpression(c.Expression, rowId)) {
                    this.blotter.addCellStyle(rowId, c.ColumnId, ConditionalStyleColour[c.ConditionalStyleColour])
                }
            })
        })
    }

    private handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        this.ConditionalStyleState.ConditionalStyleConditions.forEach(c => {
            if (this.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue)) {
                this.blotter.addCellStyle(dataChangedEvent.IdentifierValue, c.ColumnId, ConditionalStyleColour[c.ConditionalStyleColour])
            }
            else {
                this.blotter.removeCellStyle(dataChangedEvent.IdentifierValue, c.ColumnId, ConditionalStyleColour[c.ConditionalStyleColour])
            }
        })
    }

    private checkForExpression(expressionString: ExpressionString, identifierValue: any): boolean {
        let returnVal: boolean = (ExpressionHelper.IsSatisfied(expressionString,
            this.blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"),
            // was getDisplayColumnValue but I've changed it for a momnet so we update immediately...
            // obviously this is mad but it means I dont change IsInExpression until Jo gets back...
            this.blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"),
            this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns))

        return returnVal;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


