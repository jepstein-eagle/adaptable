import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IFormatColumnStrategy, IFormatColumn } from '../Core/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from './FormatColumnStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyConstants from '../Core/StrategyConstants'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { ConditionalStyleScope } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../Core/Expression/Expression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter'
import { FormatColumnConfigPopup } from '../Core/ScreenPopups';

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


