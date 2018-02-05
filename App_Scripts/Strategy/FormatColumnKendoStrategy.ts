import { FormatColumnStrategy } from './FormatColumnStrategy';
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { IFormatColumnStrategy } from '../Strategy/Interface/IFormatColumnStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IMenuItem } from '../Core/Interface/IMenu';;
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IFormatColumn } from '../Strategy/Interface/IFormatColumnStrategy';
import { Expression } from '../Core/Expression';
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper';
import { Helper } from '../Core/Helpers/Helper';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as StyleConstants from '../Core/Constants/StyleConstants'
import { AdaptableBlotter } from '../Vendors/Kendo/AdaptableBlotter';

export class FormatColumnKendoStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(blotter)
    }

    protected InitStyles(): void {
        let theBlotter = this.blotter as AdaptableBlotter
        let columns = theBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.FormatColumnState.FormatColumns.length > 0) {

            this.FormatColumnState.FormatColumns.forEach((fc) => {
                let columnIndex: number = columns.findIndex(c => c.ColumnId == fc.ColumnId)

                if (columnIndex > 0) {


                    theBlotter.forAllRecordsDo((row: any) => {
                        let primaryKey = this.blotter.getPrimaryKeyValueFromRecord(row)
                        theBlotter.addCellStyle(primaryKey, columnIndex, StyleConstants.FORMAT_COLUMN_STYLE + this.FormatColumnState.FormatColumns.indexOf(fc))

                    })
                }
            })
        }
    }
}

