import * as GeneralConstants from './Constants/GeneralConstants'
import { IAdaptableBlotterOptions } from './Api/Interface/IAdaptableBlotterOptions';
import { ServerSearchOption } from './Api/Interface/ServerSearch';

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    enableAuditLog: false,
    enableRemoteConfigServer: false,
    userName: GeneralConstants.USER_NAME,
    blotterId: GeneralConstants.BLOTTER_ID,
    predefinedConfig: null,
    maxColumnValueItemsDisplayed: 5000,
    serverSearchOption: ServerSearchOption.None
}