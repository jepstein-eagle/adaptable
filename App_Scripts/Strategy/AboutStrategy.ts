import { IAboutStrategy } from './Interface/IAboutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter, IAdaptableBlotterOptions } from '../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Core/Extensions/StringExtensions'


export class AboutStrategy extends AdaptableStrategyBase implements IAboutStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AboutStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.AboutStrategyName, ScreenPopups.AboutPopup, StrategyGlyphs.AboutGlyph, this.convertBlotterOptionsToString());
    }

    private convertBlotterOptionsToString(): string {
        let options: IAdaptableBlotterOptions = this.blotter.BlotterOptions;
        let output: string = ""

        if (options.blotterId != undefined) {
            output += "Blotter Id:"
            output += options.blotterId
            output += "|"
        }
        if (options.userName != undefined) {
            output += "User:"
            output += options.userName
            output += "|"
        }
        if (options.enableAuditLog != undefined) {
            output += "Audit Log:"
            output += (options.enableAuditLog) ? "On" : "Off"
            output += "|"
        }
        if (options.enableRemoteConfigServer != undefined) {
            output += "Remote Configuration:"
            output += (options.enableRemoteConfigServer) ? "On" : "Off"
            output += "|"
        }
             output += "Rows:"
            output += this.blotter.getRowInfo()
            output += "|"

             output += "Columns:"
            output += this.blotter.getColumnInfo()
            output += "|"
       

        return output.slice(0, -1);;
    }
}