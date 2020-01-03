import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../Strategy/FormatColumnStrategy';
import { Adaptable } from '../Adaptable';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

export class FormatColumnStrategyagGrid extends FormatColumnStrategy
  implements IFormatColumnStrategy {
  constructor(private adaptableBypass: Adaptable) {
    super(adaptableBypass);
    this.adaptableBypass = adaptableBypass;
  }

  public initStyles(): void {
    let columns = this.adaptable.api.gridApi.getColumns();
    let formatColumns = this.adaptable.api.formatColumnApi.getAllFormatColumn();
    let theadaptable = this.adaptable as Adaptable;

    // adding this check as things can get mixed up during 'clean user data'
    if (columns.length > 0 && formatColumns.length > 0) {
      for (let column of columns) {
        let cellClassRules: any = {};
        formatColumns.forEach((fc, index) => {
          if (fc.ColumnId == column.ColumnId) {
            let styleName: string = StringExtensions.IsNullOrEmpty(fc.Style.ClassName)
              ? theadaptable.StyleService.CreateUniqueStyleName(
                  StrategyConstants.FormatColumnStrategyId,
                  fc
                )
              : fc.Style.ClassName;
            cellClassRules[styleName] = function(params: any) {
              return true;
            };
          }
        });
        theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'FormatColumn');
      }
    }

    this.adaptable.redraw();
  }
}
