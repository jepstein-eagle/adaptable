import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { Adaptable } from '../Adaptable';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { RowNode } from '@ag-grid-community/core';
import * as parser from '../../parser/src';

export class ConditionalStyleStrategyagGrid extends ConditionalStyleStrategy
  implements IConditionalStyleStrategy {
  constructor(adaptable: Adaptable) {
    super(adaptable);
  }

  // this initialises styles and creates the list of which columns have styles (will be used in onDataChanged)
  public initStyles(): void {
    // return;
    let columns = this.adaptable.api.columnApi.getColumns();
    let theadaptable = this.adaptable as Adaptable;

    let shouldRunStyle = this.shouldRunStyle;

    // first do rows
    let rowClassRules: any = {};
    this.adaptable.api.conditionalStyleApi.getRowConditionalStyles().forEach(cs => {
      let styleName: string = this.getNameForStyle(cs);
      rowClassRules[styleName] = (params: any) => {
        if (shouldRunStyle(cs, theadaptable, params.node)) {
          return this.evaluateExpression(cs, params.node);
        }
      };
      theadaptable.setRowClassRules(rowClassRules, 'ConditionalStyle');
    });

    // now do columns
    if (ArrayExtensions.IsNotNullOrEmpty(columns)) {
      for (let column of columns) {
        let cellClassRules: any = {};

        let conditionalStyleForColumn:
          | ConditionalStyle
          | undefined = this.adaptable.api.conditionalStyleApi.getConditionalStyleForColumn(column);

        if (conditionalStyleForColumn) {
          let styleName: string = this.getNameForStyle(conditionalStyleForColumn);

          cellClassRules[styleName] = (params: any) => {
            if (shouldRunStyle(conditionalStyleForColumn, theadaptable, params.node)) {
              return this.evaluateExpression(conditionalStyleForColumn, params.node);
            }
          };
          theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'ConditionalStyle');
        }
      }
    }

    // Redraw Adaptableto be on safe side (its rare use case)
    this.adaptable.redraw();
  }

  private evaluateExpression(conditionalStyle: ConditionalStyle, node: RowNode): boolean {
    let expression: string = this.adaptable.api.queryApi.getExpressionForQueryObject(
      conditionalStyle
    );
    return parser.evaluate(expression, { node: node, api: this.adaptable.api });
  }

  private shouldRunStyle(
    conditionalStyle: ConditionalStyle,
    adaptable: IAdaptable,
    node: RowNode
  ): boolean {
    if (conditionalStyle.ExcludeGroupedRows && adaptable.isGroupRowNode(node)) {
      return false;
    }
    return true;
  }

  private getNameForStyle(conditionalStyle: ConditionalStyle): string {
    return StringExtensions.IsNullOrEmpty(conditionalStyle.Style.ClassName)
      ? this.adaptable.StyleService.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
          conditionalStyle
        )
      : conditionalStyle.Style.ClassName;
  }
}
