import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../Strategy/FormatColumnStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { StyleHelper } from '../../Utilities/Helpers/StyleHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'

export class FormatColumnStrategyagGrid extends FormatColumnStrategy implements IFormatColumnStrategy {
    constructor(private blotterBypass: AdaptableBlotter) {
        super(blotterBypass)
    }

    protected InitStyles(): void {

        let columns = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns;
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


