import { FormatColumnStrategy } from './FormatColumnStrategy';
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { IFormatColumnStrategy } from '../Core/Interface/IFormatColumnStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyConstants from '../Core/StrategyConstants'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IFormatColumn } from '../Core/Interface/IFormatColumnStrategy';
import { Expression } from '../Core/Expression/Expression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class FormatColumnKendoStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    private ConsitionalStylePrefix = "Ab-FormatColumn-"
    constructor(blotter: IAdaptableBlotter) {
        super(blotter)
    }

    protected InitStyles(): void {
     //   this.blotter.removeAllCellStylesWithRegex(new RegExp("^" + this.ConsitionalStylePrefix));
     ///   this.blotter.removeAllRowStylesWithRegex(new RegExp("^" + this.ConsitionalStylePrefix));

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 8990 && this.FormatColumnState.FormatColumns.length > 0) {

          let indices: any[]=  this.FormatColumnState.FormatColumns.map((fc) => {
               columns.findIndex(c=>c.ColumnId==fc.ColumnId)
            })


            this.blotter.forAllRecordsDo((row: any) => {
                let primaryKey = this.blotter.getPrimaryKeyValueFromRecord(row)
           
                indices.forEach((mt)=> {
            //        this.blotter.addCellStyle(primaryKey, mt, this.ConsitionalStylePrefix + mt)
                  
                })

            })
        }
    }
}


