"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionalStyleStrategy_1 = require("./ConditionalStyleStrategy");
const Enums_1 = require("../Core/Enums");
const ExpressionHelper_1 = require("../Core/Helpers/ExpressionHelper");
const Helper_1 = require("../Core/Helpers/Helper");
const StringExtensions_1 = require("../Core/Extensions/StringExtensions");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const StyleHelper_1 = require("../Core/Helpers/StyleHelper");
class ConditionalStyleKendoStrategy extends ConditionalStyleStrategy_1.ConditionalStyleStrategy {
    constructor(blotter) {
        super(blotter);
    }
    // Called when a single piece of data changes, ie. usually the result of an inline edit
    handleDataSourceChanged(dataChangedEvent) {
        let theBlotter = this.blotter;
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        this.ConditionalStyleState.ConditionalStyles.forEach((cs, index) => {
            let columnIndex = this.blotter.getColumnIndex(cs.ColumnId);
            let styleName = (StringExtensions_1.StringExtensions.IsNullOrEmpty(cs.Style.ClassName)) ?
                StyleHelper_1.StyleHelper.CreateIndexedStyleName(StrategyConstants.ConditionalStyleStrategyId, index, this.blotter) :
                cs.Style.ClassName;
            if (ExpressionHelper_1.ExpressionHelper.checkForExpression(cs.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter)) {
                if (cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row) {
                    theBlotter.addRowStyle(dataChangedEvent.IdentifierValue, styleName);
                }
                else if (cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column) {
                    theBlotter.addCellStyle(dataChangedEvent.IdentifierValue, columnIndex, styleName);
                }
            }
            else {
                if (cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row) {
                    theBlotter.removeRowStyle(dataChangedEvent.IdentifierValue, styleName);
                }
                else if (cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column) {
                    theBlotter.removeCellStyle(dataChangedEvent.IdentifierValue, columnIndex, styleName);
                }
            }
        });
    }
    InitStyles() {
        let theBlotter = this.blotter;
        theBlotter.removeAllCellStylesWithRegex(new RegExp("^" + StrategyConstants.ConditionalStyleStrategyId));
        theBlotter.removeAllRowStylesWithRegex(new RegExp("^" + StrategyConstants.ConditionalStyleStrategyId));
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyles.length > 0) {
            let rowConditionalStyles = this.ConditionalStyleState.ConditionalStyles
                .filter(x => x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row);
            //we add the Index of the column to the list so we do not need to reevaluate every row
            let columnConditionalStyles = this.ConditionalStyleState.ConditionalStyles
                .filter(x => x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column)
                .map(cs => Object.assign({}, cs, { columnIndex: this.blotter.getColumnIndex(cs.ColumnId), collectionIndex: this.ConditionalStyleState.ConditionalStyles.indexOf(cs) }));
            let columnConditionalStylesGroupedByColumn = Helper_1.Helper.groupBy(columnConditionalStyles, "ColumnId");
            this.blotter.forAllRecordsDo((row) => {
                let primaryKey = this.blotter.getPrimaryKeyValueFromRecord(row);
                //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
                //an object with properties that have the name of the groupbykey
                for (let column in columnConditionalStylesGroupedByColumn) {
                    //we just need to find one that match....
                    for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
                        if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(columnCS.Expression, row, columns, this.blotter)) {
                            theBlotter.addCellStyle(primaryKey, columnCS.columnIndex, StrategyConstants.ConditionalStyleStrategyId + columnCS.collectionIndex);
                            break;
                        }
                    }
                }
                //we just need to find one that match....
                for (let rowCS of rowConditionalStyles) {
                    if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(rowCS.Expression, row, columns, this.blotter)) {
                        theBlotter.addRowStyle(primaryKey, StrategyConstants.ConditionalStyleStrategyId + this.ConditionalStyleState.ConditionalStyles.indexOf(rowCS));
                        break;
                    }
                }
            });
        }
    }
}
exports.ConditionalStyleKendoStrategy = ConditionalStyleKendoStrategy;
