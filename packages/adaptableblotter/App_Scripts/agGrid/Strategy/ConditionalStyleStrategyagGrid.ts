import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { ConditionalStyleScope } from '../../PredefinedConfig/Common/Enums';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { StyleHelper } from '../../Utilities/Helpers/StyleHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IDataChangedInfo } from '../../Utilities/Interface/IDataChangedInfo';
import { IConditionalStyle } from '../../PredefinedConfig/IUserState/ConditionalStyleState';
import { IColumnCategory } from '../../PredefinedConfig/IUserState/ColumnCategoryState';

export class ConditionalStyleStrategyagGrid extends ConditionalStyleStrategy
  implements IConditionalStyleStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
  }

  protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void {
    //we refresh all columns that need to be refreshed
    //this method needs to be optimised and probably cached as well. Will do when doing perf monitor
    let conditionalStyles: IConditionalStyle[] = this.blotter.api.conditionalStyleApi.getAllConditionalStyle();
    if (ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)) {
      let listOfColumns: Array<string> = [];
      conditionalStyles.forEach(x => {
        let colList = ExpressionHelper.GetColumnListFromExpression(x.Expression);
        if (colList.indexOf(dataChangedEvent.ColumnId) > -1) {
          if (x.ConditionalStyleScope == ConditionalStyleScope.Row) {
            listOfColumns.push(...this.blotter.api.gridApi.getColumns().map(c => c.ColumnId));
          } else if (x.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
            let columnCategory: IColumnCategory = this.blotter.api.columnCategoryApi
              .getAllColumnCategory()
              .find(lc => lc.ColumnCategoryId == x.ColumnCategoryId);
            if (columnCategory) {
              listOfColumns.push(...columnCategory.ColumnIds);
            }
          } else if (x.ConditionalStyleScope == ConditionalStyleScope.Column) {
            listOfColumns.push(x.ColumnId);
          }
        }
      });
      let listOfColumnsToRefresh = Array.from(new Set(listOfColumns));
      let index: number = listOfColumnsToRefresh.indexOf(dataChangedEvent.ColumnId);
      if (index !== -1) {
        listOfColumnsToRefresh.splice(index, 1);
      }
      if (listOfColumnsToRefresh.length > 0) {
        let theBlotter = this.blotter as AdaptableBlotter;
        theBlotter.refreshCells(dataChangedEvent.Record, listOfColumnsToRefresh);
      }
    }
  }

  public initStyles(): void {
    let columns = this.blotter.api.gridApi.getColumns();
    let theBlotter = this.blotter as AdaptableBlotter;
    let conditionalStyles: IConditionalStyle[] = this.blotter.api.conditionalStyleApi.getAllConditionalStyle();
    if (
      ArrayExtensions.IsNotNullOrEmpty(columns) &&
      ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)
    ) {
      for (let column of columns) {
        let cellClassRules: any = {};
        conditionalStyles.forEach((cs, index) => {
          let styleName: string = StringExtensions.IsNullOrEmpty(cs.Style.ClassName)
            ? StyleHelper.CreateIndexedStyleName(
                StrategyConstants.ConditionalStyleStrategyId,
                index,
                this.blotter
              )
            : cs.Style.ClassName;
          if (
            cs.ConditionalStyleScope == ConditionalStyleScope.Column &&
            cs.ColumnId == column.ColumnId
          ) {
            cellClassRules[styleName] = function(params: any) {
              return ExpressionHelper.checkForExpressionFromRecord(
                cs.Expression,
                params.node,
                columns,
                theBlotter
              );
            };
          } else if (cs.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
            let columnCategory: IColumnCategory = this.blotter.api.columnCategoryApi
              .getAllColumnCategory()
              .find(lc => lc.ColumnCategoryId == cs.ColumnCategoryId);
            if (columnCategory) {
              if (ArrayExtensions.ContainsItem(columnCategory.ColumnIds, column.ColumnId)) {
                cellClassRules[styleName] = function(params: any) {
                  return ExpressionHelper.checkForExpressionFromRecord(
                    cs.Expression,
                    params.node,
                    columns,
                    theBlotter
                  );
                };
              }
            }
          } else if (cs.ConditionalStyleScope == ConditionalStyleScope.Row) {
            cellClassRules[styleName] = function(params: any) {
              return ExpressionHelper.checkForExpressionFromRecord(
                cs.Expression,
                params.node,
                columns,
                theBlotter
              );
            };
          }
        });
        theBlotter.setCellClassRules(cellClassRules, column.ColumnId, 'ConditionalStyle');
      }
    }
    this.blotter.redraw();
  }
}
