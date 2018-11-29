"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionalStyleStrategy_1 = require("../../App_Scripts/Strategy/ConditionalStyleStrategy");
const Enums_1 = require("../../App_Scripts/Utilities/Enums");
const ExpressionHelper_1 = require("../../App_Scripts/Utilities/Helpers/ExpressionHelper");
const StringExtensions_1 = require("../../App_Scripts/Utilities/Extensions/StringExtensions");
const StyleHelper_1 = require("../../App_Scripts/Utilities/Helpers/StyleHelper");
const StrategyConstants = require("../../App_Scripts/Core/Constants/StrategyConstants");
const ArrayExtensions_1 = require("../../App_Scripts/Utilities/Extensions/ArrayExtensions");
class ConditionalStyleagGridStrategy extends ConditionalStyleStrategy_1.ConditionalStyleStrategy {
    constructor(blotter) {
        super(blotter);
    }
    handleDataSourceChanged(dataChangedEvent) {
        //we refresh all columns that need to be refreshed
        //this method needs to be optimised and probably cached as well. Will do when doing perf monitor
        let listOfColumns = [];
        this.ConditionalStyleState.ConditionalStyles.forEach(x => {
            let colList = ExpressionHelper_1.ExpressionHelper.GetColumnListFromExpression(x.Expression);
            if (colList.indexOf(dataChangedEvent.ColumnId) > -1) {
                if (x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row) {
                    listOfColumns.push(...this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(c => c.ColumnId));
                }
                else if (x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory) {
                    let columnCategory = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == x.ColumnCategoryId);
                    if (columnCategory) {
                        listOfColumns.push(...columnCategory.ColumnIds);
                    }
                }
                else if (x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column) {
                    listOfColumns.push(x.ColumnId);
                }
            }
        });
        let listOfColumnsToRefresh = Array.from(new Set(listOfColumns));
        let index = listOfColumnsToRefresh.indexOf(dataChangedEvent.ColumnId);
        if (index !== -1) {
            listOfColumnsToRefresh.splice(index, 1);
        }
        if (listOfColumnsToRefresh.length > 0) {
            let theBlotter = this.blotter;
            theBlotter.refreshCells(dataChangedEvent.Record, listOfColumnsToRefresh);
        }
    }
    InitStyles() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let theBlotter = this.blotter;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyles.length > 0) {
            for (let column of columns) {
                let cellClassRules = {};
                this.ConditionalStyleState.ConditionalStyles.forEach((cs, index) => {
                    let styleName = (StringExtensions_1.StringExtensions.IsNullOrEmpty(cs.Style.ClassName)) ?
                        StyleHelper_1.StyleHelper.CreateIndexedStyleName(StrategyConstants.ConditionalStyleStrategyId, index, this.blotter) :
                        cs.Style.ClassName;
                    if (cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column && cs.ColumnId == column.ColumnId) {
                        cellClassRules[styleName] = function (params) {
                            return ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter);
                        };
                    }
                    else if (cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory) {
                        let columnCategory = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == cs.ColumnCategoryId);
                        if (columnCategory) {
                            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(columnCategory.ColumnIds, column.ColumnId)) {
                                cellClassRules[styleName] = function (params) {
                                    return ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter);
                                };
                            }
                        }
                    }
                    else if (cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row) {
                        cellClassRules[styleName] = function (params) {
                            return ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter);
                        };
                    }
                });
                theBlotter.setCellClassRules(cellClassRules, column.ColumnId, "ConditionalStyle");
            }
        }
        this.blotter.redraw();
    }
}
exports.ConditionalStyleagGridStrategy = ConditionalStyleagGridStrategy;
