import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../Strategy/FormatColumnStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';

export class FormatColumnStrategyHypergrid extends FormatColumnStrategy
  implements IFormatColumnStrategy {
  constructor(private blotterBypass: AdaptableBlotter) {
    super(blotterBypass);
    this.blotterBypass = blotterBypass;
  }

  public initStyles(): void {
    //JO: temp fix
    if (!this.blotterBypass) {
      this.blotterBypass = this.blotter as AdaptableBlotter;
    }
    let columns = this.blotter.api.gridApi.getColumns();
    let formatColumns = this.blotter.api.formatColumnApi.getAllFormatColumn();
    this.blotterBypass.removeAllCellStyleHypergrid('formatColumn');

    // adding this check as things can get mixed up during 'clean user data'
    if (columns.length > 0 && formatColumns.length > 0) {
      this.blotterBypass.forAllRecordsDo((row: any) => {
        formatColumns.forEach(fc => {
          this.blotterBypass.addCellStyleHypergrid(
            this.blotterBypass.getPrimaryKeyValueFromRecord(row),
            fc.ColumnId,
            { formatColumnStyle: fc.Style }
          );
          //          break
        });
      });
    }
    this.blotterBypass.ReindexAndRepaint();
  }
}
