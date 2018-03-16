import { IConditionalStyleStrategy } from '../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { ConditionalStyleScope } from '../Core/Enums';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../Strategy/Interface/IConditionalStyleStrategy';
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper';
import { Helper } from '../Core/Helpers/Helper';
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter'

export class ConditionalStyleHypergridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        let theBlotter = this.blotter as AdaptableBlotter
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        //here we don't call Repaint as we consider that we already are in the repaint loop
        for (let column of columns) {
            theBlotter.removeCellStyleHypergrid(dataChangedEvent.IdentifierValue, column.ColumnId, 'csColumn')
            theBlotter.removeCellStyleHypergrid(dataChangedEvent.IdentifierValue, column.ColumnId, 'csRow')
        }

        this.ConditionalStyleState.ConditionalStyleConditions.forEach((c, index) => {
          
            if (dataChangedEvent.Record) {
                if (ExpressionHelper.checkForExpressionFromRecord(c.Expression, dataChangedEvent.Record, columns, this.blotter)) {
                    if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                        theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, { conditionalStyleRow: c.Style })
                    }
                    else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, { conditionalStyleColumn: c.Style })
                    }
                }
            }
            else {
                if (ExpressionHelper.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter)) {
                    if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                        theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, { conditionalStyleRow: c.Style })
                    }
                    else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, { conditionalStyleColumn: c.Style })
                    }
                }
            }
        })
    }

    protected InitStyles(): void {
        let theBlotter = this.blotter as AdaptableBlotter
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        theBlotter.removeAllCellStyleHypergrid('csColumn')
        theBlotter.removeAllCellStyleHypergrid('csRow')

        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {

            let rowConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row)

            let columnConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column)
                .map(cs => cs)

            let columnConditionalStylesGroupedByColumn = Helper.groupBy(columnConditionalStyles, "ColumnId")
            theBlotter.forAllRecordsDo((row: any) => {
                //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
                //an object with properties that have the name of the groupbykey
                for (let column in columnConditionalStylesGroupedByColumn) {
                    //we just need to find one that match....
                    for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
                        let localCS: IConditionalStyleCondition = columnCS
                        if (ExpressionHelper.checkForExpressionFromRecord(localCS.Expression, row, columns, this.blotter)) {
                            theBlotter.addCellStyleHypergrid(theBlotter.getPrimaryKeyValueFromRecord(row), localCS.ColumnId, { conditionalStyleColumn: localCS.Style })
                            break
                        }
                    }
                }
                //we just need to find one that match....
                for (let rowCS of rowConditionalStyles) {
                    if (ExpressionHelper.checkForExpressionFromRecord(rowCS.Expression, row, columns, this.blotter)) {
                        theBlotter.addRowStyleHypergrid(theBlotter.getPrimaryKeyValueFromRecord(row), { conditionalStyleRow: rowCS.Style })
                        break
                    }
                }
            })
        }
        theBlotter.ReindexAndRepaint();
    }
}


