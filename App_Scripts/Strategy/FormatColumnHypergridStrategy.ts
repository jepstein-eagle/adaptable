import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from './FormatColumnStrategy';
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter'

export class FormatColumnHypergridStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    constructor(private blotterBypass: AdaptableBlotter) {
        super(blotterBypass)
    }

    protected InitStyles(): void {
        //JO: temp fix
        if (!this.blotterBypass) {
            this.blotterBypass = this.blotter as AdaptableBlotter
        }
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        this.blotterBypass.removeAllCellStyleHypergrid('formatColumn')
     
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.FormatColumnState.FormatColumns.length > 0) {
            this.blotterBypass.forAllRecordsDo((row: any) => {
                  this.FormatColumnState.FormatColumns.forEach(fc=>{
                    this.blotterBypass.addCellStyleHypergrid(this.blotterBypass.getPrimaryKeyValueFromRecord(row), fc.ColumnId, { formatColumnStyle: fc.Style })
          //          break
                })
            })
        }
        this.blotterBypass.ReindexAndRepaint();
    }
}


