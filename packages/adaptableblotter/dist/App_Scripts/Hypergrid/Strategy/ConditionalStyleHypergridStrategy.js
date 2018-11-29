"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionalStyleStrategy_1 = require("../../App_Scripts/Strategy/ConditionalStyleStrategy");
const Enums_1 = require("../../App_Scripts/Utilities/Enums");
const ExpressionHelper_1 = require("../../App_Scripts/Utilities/Helpers/ExpressionHelper");
const Helper_1 = require("../../App_Scripts/Utilities/Helpers/Helper");
class ConditionalStyleHypergridStrategy extends ConditionalStyleStrategy_1.ConditionalStyleStrategy {
    constructor(blotter) {
        super(blotter);
    }
    // Called when a single piece of data changes, ie. usually the result of an inline edit
    handleDataSourceChanged(dataChangedEvent) {
        let theBlotter = this.blotter;
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        //here we don't call Repaint as we consider that we already are in the repaint loop
        for (let column of columns) {
            theBlotter.removeCellStyleHypergrid(dataChangedEvent.IdentifierValue, column.ColumnId, 'csColumn');
            theBlotter.removeCellStyleHypergrid(dataChangedEvent.IdentifierValue, column.ColumnId, 'csRow');
        }
        this.ConditionalStyleState.ConditionalStyles.forEach((c, index) => {
            if (dataChangedEvent.Record) {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(c.Expression, dataChangedEvent.Record, columns, this.blotter)) {
                    if (c.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row) {
                        theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, { conditionalStyleRow: c.Style });
                    }
                    else if (c.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory) {
                        let columnCategory = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == c.ColumnCategoryId);
                        columnCategory.ColumnIds.forEach(cc => {
                            //      alert('ouch')
                            theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, cc, { conditionalStyleColumn: c.Style });
                        });
                    }
                    else if (c.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column) {
                        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, { conditionalStyleColumn: c.Style });
                    }
                }
            }
            else {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter)) {
                    if (c.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row) {
                        theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, { conditionalStyleRow: c.Style });
                    }
                    else if (c.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory) {
                        //     alert("here")
                        let columnCategory = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == c.ColumnCategoryId);
                        columnCategory.ColumnIds.forEach(cc => {
                            theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, cc, { conditionalStyleColumn: c.Style });
                        });
                    }
                    else if (c.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column) {
                        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, { conditionalStyleColumn: c.Style });
                    }
                }
            }
        });
    }
    InitStyles() {
        let theBlotter = this.blotter;
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        theBlotter.removeAllCellStyleHypergrid('csColumn');
        theBlotter.removeAllCellStyleHypergrid('csRow');
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyles.length > 0) {
            let rowConditionalStyles = this.ConditionalStyleState.ConditionalStyles
                .filter(x => x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row);
            let columnConditionalStyles = this.ConditionalStyleState.ConditionalStyles
                .filter(x => x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column)
                .map(cs => cs);
            let columnConditionalStylesGroupedByColumn = Helper_1.Helper.groupBy(columnConditionalStyles, "ColumnId");
            theBlotter.forAllRecordsDo((row) => {
                //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
                //an object with properties that have the name of the groupbykey
                for (let column in columnConditionalStylesGroupedByColumn) {
                    //we just need to find one that match....
                    for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
                        let localCS = columnCS;
                        if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(localCS.Expression, row, columns, this.blotter)) {
                            theBlotter.addCellStyleHypergrid(theBlotter.getPrimaryKeyValueFromRecord(row), localCS.ColumnId, { conditionalStyleColumn: localCS.Style });
                            break;
                        }
                    }
                }
                //we just need to find one that match....
                for (let rowCS of rowConditionalStyles) {
                    if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(rowCS.Expression, row, columns, this.blotter)) {
                        theBlotter.addRowStyleHypergrid(theBlotter.getPrimaryKeyValueFromRecord(row), { conditionalStyleRow: rowCS.Style });
                        break;
                    }
                }
            });
        }
        theBlotter.ReindexAndRepaint();
    }
}
exports.ConditionalStyleHypergridStrategy = ConditionalStyleHypergridStrategy;
