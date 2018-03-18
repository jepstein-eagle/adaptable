import { IAdaptableBlotterOptions } from "./Interface/IAdaptableBlotterOptions";
import * as GeneralConstants from './Constants/GeneralConstants'

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    enableAuditLog: false,
    enableRemoteConfigServer: false,
    userName: GeneralConstants.USER_NAME,
    blotterId: GeneralConstants.BLOTTER_ID,
    predefinedConfigUrl: "",
    maxColumnValueItemsDisplayed: 5000
}