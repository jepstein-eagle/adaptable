import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../Core/Interface/IConditionalStyleStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { ConditionalStyleScope } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../Core/Expression/Expression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { MenuType } from '../Core/Enums';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { AdaptableBlotter } from '../Vendors/Kendo/AdaptableBlotter';

export class ConditionalStyleKendoStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    private ConsitionalStylePrefix = "Ab-ConditionalStyle-"
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        let theBlotter = this.blotter as AdaptableBlotter
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        this.ConditionalStyleState.ConditionalStyleConditions.forEach((c, index) => {
            let columnIndex: number = this.blotter.getColumnIndex(c.ColumnId);

            if (ExpressionHelper.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter)) {
                if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                    theBlotter.addRowStyle(dataChangedEvent.IdentifierValue, this.ConsitionalStylePrefix + index)
                }
                else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                    theBlotter.addCellStyle(dataChangedEvent.IdentifierValue, columnIndex, this.ConsitionalStylePrefix + index)
                }
            }
            else {
                if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                    theBlotter.removeRowStyle(dataChangedEvent.IdentifierValue, this.ConsitionalStylePrefix + index)
                }
                else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                    theBlotter.removeCellStyle(dataChangedEvent.IdentifierValue, columnIndex, this.ConsitionalStylePrefix + index)
                }
            }
        })
    }

    protected InitStyles(): void {
        let theBlotter = this.blotter as AdaptableBlotter
        theBlotter.removeAllCellStylesWithRegex(new RegExp("^" + this.ConsitionalStylePrefix));
        theBlotter.removeAllRowStylesWithRegex(new RegExp("^" + this.ConsitionalStylePrefix));

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {

            let rowConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row)

            //we add the Index of the column to the list so we do not need to reevaluate every row
            let columnConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column)
                .map(cs => Object.assign({}, cs, { columnIndex: this.blotter.getColumnIndex(cs.ColumnId), collectionIndex: this.ConditionalStyleState.ConditionalStyleConditions.indexOf(cs) }))

            let columnConditionalStylesGroupedByColumn = Helper.groupBy(columnConditionalStyles, "ColumnId")

            this.blotter.forAllRecordsDo((row: any) => {
                let primaryKey = this.blotter.getPrimaryKeyValueFromRecord(row)
                //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
                //an object with properties that have the name of the groupbykey
                for (let column in columnConditionalStylesGroupedByColumn) {
                    //we just need to find one that match....
                    for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
                        if (ExpressionHelper.checkForExpressionFromRecord(columnCS.Expression, row, columns, this.blotter)) {
                            theBlotter.addCellStyle(primaryKey, columnCS.columnIndex, this.ConsitionalStylePrefix + columnCS.collectionIndex)
                            break
                        }
                    }
                }
                //we just need to find one that match....
                for (let rowCS of rowConditionalStyles) {
                    if (ExpressionHelper.checkForExpressionFromRecord(rowCS.Expression, row, columns, this.blotter)) {
                        theBlotter.addRowStyle(primaryKey, this.ConsitionalStylePrefix + this.ConditionalStyleState.ConditionalStyleConditions.indexOf(rowCS))
                        break
                    }
                }
            })
        }
    }
}


