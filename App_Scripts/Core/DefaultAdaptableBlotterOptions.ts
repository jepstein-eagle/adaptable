import { IAdaptableBlotterOptions } from "./Interface/IAdaptableBlotterOptions";
import * as GeneralConstants from './Constants/GeneralConstants'
import { ServerSearchOption } from "./Enums";

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    enableAuditLog: false,
    enableRemoteConfigServer: false,
    userName: GeneralConstants.USER_NAME,
    blotterId: GeneralConstants.BLOTTER_ID,
    predefinedConfig: null,
    maxColumnValueItemsDisplayed: 5000,
    serverSearchOption: ServerSearchOption.None
}