import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../Strategy/FormatColumnStrategy';
import { Adaptable } from '../Adaptable';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';

export class FormatColumnStrategyagGrid extends FormatColumnStrategy
  implements IFormatColumnStrategy {
  constructor(private adaptableBypass: Adaptable) {
    super(adaptableBypass);
    this.adaptableBypass = adaptableBypass;
  }

  public initStyles(): void {
    if (this.adaptable.api.formatColumnApi.hasStyleFormatColumns()) {
      let columns = this.adaptable.api.columnApi.getColumns();

      // adding this check as things can get mixed up during 'clean user data'
      if (columns.length > 0) {
        for (let column of columns) {
          let cellClassRules: any = {};
          let formatColumn:
            | FormatColumn
            | undefined = this.adaptable.api.formatColumnApi.getFormatColumnWithStyleForColumn(
            column
          );
          // we just do one and then return
          if (formatColumn) {
            let styleName: string = StringExtensions.IsNullOrEmpty(formatColumn.Style.ClassName)
              ? this.adaptable.StyleService.CreateUniqueStyleName(
                  StrategyConstants.FormatColumnStrategyId,
                  formatColumn
                )
              : formatColumn.Style.ClassName;
            cellClassRules[styleName] = function(params: any) {
              return true;
            };

            (this.adaptable as Adaptable).setCellClassRules(
              cellClassRules,
              column.ColumnId,
              'FormatColumn'
            );
          }
        }
      }

      this.adaptable.redraw();
    }
  }
}
