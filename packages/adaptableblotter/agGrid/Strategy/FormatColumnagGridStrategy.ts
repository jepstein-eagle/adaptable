import { IFormatColumnStrategy } from '../../App_Scripts/Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../App_Scripts/Strategy/FormatColumnStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter'
import * as StyleConstants from '../../App_Scripts/Core/Constants/StyleConstants'
import { StringExtensions } from '../../App_Scripts/Utilities/Extensions/StringExtensions';
import { StyleHelper } from '../../App_Scripts/Utilities/Helpers/StyleHelper';
import * as StrategyConstants from '../../App_Scripts/Core/Constants/StrategyConstants'

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
                            StyleHelper.CreateIndexedStyleName(StrategyConstants.FormatColumnStrategyId, index, this.blotter) :
                            fc.Style.ClassName;
                        cellClassRules[styleName] = function (params: any) {
                            return true;
                        }
                    }
                })
                theBlotter.setCellClassRules(cellClassRules, column.ColumnId, "FormatColumn");
            }
        }

        this.blotter.redraw()
    }

}


