import { IFormatColumnStrategy } from '../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from './FormatColumnStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter'
import * as StyleConstants from '../Core/Constants/StyleConstants'
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { StyleHelper } from '../Core/Helpers/StyleHelper';
import * as StrategyIds from '../Core/Constants/StrategyIds'

export class FormatColumnagGridStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    constructor(private blotterBypass: AdaptableBlotter) {
        super(blotterBypass)
    }

    protected InitStyles(): void {

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let theBlotter = this.blotter as AdaptableBlotter

        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.FormatColumnState.FormatColumns.length > 0) {

            for (let column of columns) {
                let cellClassRules: any = {};
                this.FormatColumnState.FormatColumns.forEach((fc, index) => {
                    if (fc.ColumnId == column.ColumnId) {
                        let styleName: string = (StringExtensions.IsNullOrEmpty(fc.Style.ClassName)) ?
                            StyleHelper.CreateIndexedStyleName(StrategyIds.FormatColumnStrategyId, index, this.blotter) :
                            fc.Style.ClassName;
                        cellClassRules[styleName] = function (params: any) {
                            return true;
                        }
                    }
                })
                theBlotter.setCellClassRules(cellClassRules, column.ColumnId, "FormatColumn");
            }
        }

        theBlotter.redrawRows();
    }

}


