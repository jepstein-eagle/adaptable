import { ConditionalStyleState } from '../../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../../Core/Interface/IConditionalStyleStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { ConditionalStyleScope, ColumnType, CellStyle } from '../../Core/Enums';
import { IAdaptableBlotter, IColumn, IColumnCellStyleMapping } from '../../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { Helper } from '../../Core/Helper';
import { MenuType } from '../../Core/Enums';



export class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    private ConsitionalStylePrefix = "Ab-ConditionalStyle-"
    private menuItemConfig: IMenuItem;
    private ConditionalStyleState: ConditionalStyleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ConditionalStyleStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Conditional Styles", this.Id, 'ConditionalStyleConfig', MenuType.Configuration, "tint");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.OnGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter))
    }

    private InitState() {
        let oldState: ConditionalStyleState = this.ConditionalStyleState;

        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;

            // Remove conditions that have been deleted or edited
            if (oldState != null && oldState.ConditionalStyleConditions.length > 0 && oldState.ConditionalStyleConditions.length >= this.ConditionalStyleState.ConditionalStyleConditions.length) {
                let conditionsToRemove: IConditionalStyleCondition[] = oldState.ConditionalStyleConditions.filter(c => !this.ConditionalStyleState.ConditionalStyleConditions.find(f => f.Uid == c.Uid)).map((cs: IConditionalStyleCondition) => {
                    return cs;
                });
                this.removeExistingStyles(conditionsToRemove);
            }

            // Add conditions that are new or changed (i.e. which have a guid that is not in the old state)
            if (this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
                let conditionsToAdd: IConditionalStyleCondition[] = this.ConditionalStyleState.ConditionalStyleConditions.filter(c => oldState == null || !oldState.ConditionalStyleConditions.find(f => f.Uid == c.Uid)).map((cs: IConditionalStyleCondition) => {
                    return cs;
                });
                this.addNewStyles(conditionsToAdd);
            }
        }
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    private handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        this.ConditionalStyleState.ConditionalStyleConditions.forEach(c => {
            let columnIndex: number = this.blotter.getColumnIndex(c.ColumnId);
            let columnMapping: IColumnCellStyleMapping = { ColumnIndex: columnIndex, CellStyle: this.ConsitionalStylePrefix + CellStyle[c.CellStyle], Expression: null }

            if (this.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue, columns)) {
                this.blotter.addCellStyle(dataChangedEvent.IdentifierValue, columnMapping)
            }
            else {
                this.blotter.removeCellStyle(dataChangedEvent.IdentifierValue, columnMapping)
            }
        })
    }

    // Called when we have re-bound the grid e.g. after sorting a column or even after a smart edit or plus / minus :(
    private handleGridDataBound(blotter: IAdaptableBlotter) {
        if (this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
            // not nice but not sure we have a choice other than to have to paint every condition again :(
            // is there a way to avoid this other than changing how we update data?
            this.addNewStyles(this.ConditionalStyleState.ConditionalStyleConditions);
        }
    }

    private removeExistingStyles(changedConditions: IConditionalStyleCondition[]): void {
       // alert("removing " + changedConditions.length + " conditions")
        let columnStyleMappings: IColumnCellStyleMapping[] = changedConditions.map((nc: IConditionalStyleCondition) => {
            return { ColumnIndex: this.blotter.getColumnIndex(nc.ColumnId), CellStyle: this.ConsitionalStylePrefix + CellStyle[nc.CellStyle], Expression: nc.Expression }
        })

        // get the columns currently affected - doesnt work with row styles if we do them :(
        this.blotter.removeCellStyles(this.blotter.getAllRowIds(), columnStyleMappings);
    }

    private addNewStyles(newConditions: IConditionalStyleCondition[]): void {
        // ok, this seems a little mad but this method gets called A LOT - every time we do a plus / minus or smart edit or column sort
        // so I'm trying to improve performance by getting the rowId just once, the row object just once (if needed) and each column index just once
        // agree it looks messy but in a 1,0000 row grid with 5 conditions i could see the difference in performance after doing it below

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && newConditions.length > 0) {
         //   alert("starting adding " + newConditions.length + " conditions")
            let rowIds: string[] = this.blotter.getAllRowIds();

            let columnStyleMappings: IColumnCellStyleMapping[] = newConditions.map((nc: IConditionalStyleCondition) => {
                return { ColumnIndex: this.blotter.getColumnIndex(nc.ColumnId), CellStyle: this.ConsitionalStylePrefix + CellStyle[nc.CellStyle], Expression: nc.Expression }
            })

            rowIds.forEach(rowId => {
                let rowColumnStyleMappings: IColumnCellStyleMapping[] = []
                columnStyleMappings.forEach(c => {
                    if (this.checkForExpression(c.Expression, rowId, columns)) {
                        rowColumnStyleMappings.push(c);
                    }
                })
                this.blotter.addCellStylesForRow(rowId, rowColumnStyleMappings)
            })
           // alert("finishing adding " + newConditions.length + " conditions")
        }
    }

    private checkForExpression(Expression: Expression, identifierValue: any, columns: IColumn[]): boolean {
        let returnVal: boolean = (
            ExpressionHelper.IsSatisfied(
                Expression,
                this.blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"),
                this.blotter.getRecordIsSatisfiedFunction(identifierValue, "getDisplayColumnValue"),
                columns
            ))

        return returnVal;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


