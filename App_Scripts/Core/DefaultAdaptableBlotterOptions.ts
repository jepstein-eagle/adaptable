import { IAdaptableBlotterOptions } from '../Core/Interface/IAdaptableBlotter'

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    enableAuditLog: false,
    enableRemoteConfigServer: false,
    userName: "anonymous",
    blotterId: "adaptable_blotter_id",
    predefinedConfigUrl: "",
    maxColumnValueItemsDisplayed: 5000
}