import { IAboutStrategy } from './Interface/IAboutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IAdaptableBlotterOptions } from '../Core/Api/Interface/IAdaptableBlotterOptions';
import { KeyValuePair } from '../View/UIInterfaces';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';

export class AboutStrategy extends AdaptableStrategyBase implements IAboutStrategy {
   
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AboutStrategyId, blotter)
    }


    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.AboutStrategyName, ScreenPopups.AboutPopup, StrategyGlyphs.AboutGlyph);
    }

    public CreateAboutInfo(): KeyValuePair[] {
        let options: IAdaptableBlotterOptions = this.blotter.BlotterOptions;
        let output: KeyValuePair[] = []
        output.push({ Key: "Vendor Grid", Value: this.blotter.VendorGridName })
        output.push({ Key: "Adaptable Blotter Version", Value: "2.4" })
        if (options.blotterId != undefined) {
            output.push({ Key: "Blotter Id", Value: options.blotterId })
        }
        if (options.userName != undefined) {
            output.push({ Key: "User", Value: options.userName })
        }
        if (options.enableAuditLog != undefined) {
            output.push({ Key: "Audit Log", Value: (options.enableAuditLog) ? "On" : "Off" })
        }
        if (options.enableRemoteConfigServer != undefined) {
            output.push({ Key: "Remote Configuration", Value: (options.enableRemoteConfigServer) ? "On" : "Off" })
        }
        if (options.serverSearchOption != undefined) {
            output.push({ Key: "Server Search Option", Value: options.serverSearchOption })
        }
        output.push({ Key: "All Rows", Value: this.blotter.getRowCount() })
        output.push({ Key: "Visible Rows", Value: this.blotter.getVisibleRowCount() })
        output.push({ Key: "All Columns", Value: this.blotter.getColumnCount() })
        output.push({ Key: "Visible Columns", Value: this.blotter.getVisibleColumnCount() })
        output.push({ Key: "Can Sort", Value: this.blotter.isSortable() ? "True" : "False" })
        output.push({ Key: "Can Multi Select", Value: this.blotter.isSelectable() ? "True" : "False" })
        let calcColumns: string[] = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns.map(c => c.ColumnId)
        output.push({ Key: "Calculated Columns", Value: ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None" })
        return output;
    }
}