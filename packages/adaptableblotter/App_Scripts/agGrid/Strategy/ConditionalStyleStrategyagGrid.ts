import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { ConditionalStyleScope } from '../../PredefinedConfig/Common/Enums';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { StyleHelper } from '../../Utilities/Helpers/StyleHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { DataChangedInfo } from '../../Utilities/Interface/DataChangedInfo';
import { ConditionalStyle } from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { ColumnCategory } from '../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import { TypeUuid } from '../../PredefinedConfig/Uuid';

export class ConditionalStyleStrategyagGrid extends ConditionalStyleStrategy
  implements IConditionalStyleStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
    this.conditionalStyleColumnIds = [];
    this.columnsForConditionalStyles = new Map<TypeUuid, string[]>();
  }

  private conditionalStyleColumnIds: string[];
  private columnsForConditionalStyles: Map<TypeUuid, string[]>;

  // The sole purpose that i can see for this method is to tell the Blotter to refresh the row or other columns in the case where the Grid would not automtically do it
  // and we need to tell the grid that the whole row has changed and not just this column
  // Note that we can have Col A changing when Col B updates so need to look at all 3 but should make it as quick as possible: in and out.
  protected handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void {
    let conditionalStyles: ConditionalStyle[] = this.blotter.api.conditionalStyleApi.getAllConditionalStyle();
    if (ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)) {
      if (ArrayExtensions.ContainsItem(this.conditionalStyleColumnIds, dataChangedEvent.ColumnId)) {
        let colsToRefresh: Array<string> = [];
        conditionalStyles.forEach(cs => {
          let colList = this.columnsForConditionalStyles.get(cs.Uuid);
          if (ArrayExtensions.ContainsItem(colList, dataChangedEvent.ColumnId)) {
            switch (cs.ConditionalStyleScope) {
              case ConditionalStyleScope.Row:
                colsToRefresh.push(...this.blotter.api.gridApi.getColumns().map(c => c.ColumnId));
                break;

              case ConditionalStyleScope.ColumnCategory:
                let columnCategory: ColumnCategory = this.blotter.api.columnCategoryApi
                  .getAllColumnCategory()
                  .find(lc => lc.ColumnCategoryId == cs.ColumnCategoryId);
                if (columnCategory) {
                  colsToRefresh.push(...columnCategory.ColumnIds);
                }
                break;

              case ConditionalStyleScope.Column:
                colsToRefresh.push(cs.ColumnId);
                break;
            }
          }
        });
        if (ArrayExtensions.IsNotNullOrEmpty(colsToRefresh)) {
          let listOfColumnsToRefresh = Array.from(new Set(colsToRefresh));

          // we dont want to refresh the actual column as that has been updated
          let index: number = listOfColumnsToRefresh.indexOf(dataChangedEvent.ColumnId);
          if (index !== -1) {
            listOfColumnsToRefresh.splice(index, 1);
          }
          if (listOfColumnsToRefresh.length > 0) {
            let theBlotter = this.blotter as AdaptableBlotter;
            theBlotter.refreshCells([dataChangedEvent.RowNode], listOfColumnsToRefresh);
          }
        }
      }
    }
  }

  // this initialises styles and creates the list of which columns have styles (will be used in onDataChanged)
  public initStyles(): void {
    let columns = this.blotter.api.gridApi.getColumns();
    let theBlotter = this.blotter as AdaptableBlotter;
    let conditionalStyles: ConditionalStyle[] = this.blotter.api.conditionalStyleApi.getAllConditionalStyle();
    this.conditionalStyleColumnIds = [];
    this.columnsForConditionalStyles.clear();

    if (
      ArrayExtensions.IsNotNullOrEmpty(columns) &&
      ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)
    ) {
      for (let column of columns) {
        let cellClassRules: any = {};
        conditionalStyles.forEach((cs, index) => {
          let styleName: string = StringExtensions.IsNullOrEmpty(cs.Style.ClassName)
            ? StyleHelper.CreateUniqueStyleName(
                StrategyConstants.ConditionalStyleStrategyId,
                this.blotter,
                cs
              )
            : cs.Style.ClassName;
          if (
            cs.ConditionalStyleScope == ConditionalStyleScope.Column &&
            cs.ColumnId == column.ColumnId
          ) {
            cellClassRules[styleName] = function(params: any) {
              return ExpressionHelper.checkForExpressionFromRowNode(
                cs.Expression,
                params.node,
                columns,
                theBlotter
              );
            };
          } else if (cs.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
            let columnCategory: ColumnCategory = this.blotter.api.columnCategoryApi
              .getAllColumnCategory()
              .find(lc => lc.ColumnCategoryId == cs.ColumnCategoryId);
            if (columnCategory) {
              if (ArrayExtensions.ContainsItem(columnCategory.ColumnIds, column.ColumnId)) {
                cellClassRules[styleName] = function(params: any) {
                  return ExpressionHelper.checkForExpressionFromRowNode(
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
              return ExpressionHelper.checkForExpressionFromRowNode(
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

    //  create the list of columns that are in Expressions here so that we dont need to do it each time data updates
    let colList: string[] = [];
    conditionalStyles.forEach(x => {
      let colsForCS: string[] = ExpressionHelper.GetColumnListFromExpression(x.Expression);
      colList.push(...colsForCS);
      this.columnsForConditionalStyles.set(x.Uuid, colsForCS);
    });

    this.conditionalStyleColumnIds = [...new Set(colList)];

    // Redraw the Blotter to be on safe side (its rare use case)
    this.blotter.redraw();
  }
}
