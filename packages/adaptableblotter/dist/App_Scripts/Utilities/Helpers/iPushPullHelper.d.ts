import { IPPDomain } from "../Interface/Reports/IPPDomain";
import { IPPStyle } from "../Interface/Reports/IPPStyle";
export declare module iPushPullHelper {
    enum ServiceStatus {
        Unknown = "Unknown",
        Disconnected = "Disconnected",
        Connected = "Connected",
        Error = "Error"
    }
    var IPPStatus: ServiceStatus;
    function init(iPPConfig?: any): void;
    function isIPushPullLoaded(): boolean;
    function Login(login: string, password: string): Promise<any>;
    function GetDomainPages(clientId: string): Promise<IPPDomain[]>;
    function LoadPage(folderIPP: string, pageIPP: string): Promise<any>;
    function UnloadPage(page: string): void;
    function pushData(page: string, data: any[], style: IPPStyle): Promise<any>;
}
