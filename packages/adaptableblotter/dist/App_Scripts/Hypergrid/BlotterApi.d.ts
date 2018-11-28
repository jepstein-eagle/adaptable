import { BlotterApiBase } from "../App_Scripts/Api/BlotterApiBase";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { IBlotterApi } from "../App_Scripts/Api/Interface/IBlotterApi";
export declare class BlotterApi extends BlotterApiBase implements IBlotterApi {
    constructor(blotter: AdaptableBlotter);
    setGridData(dataSource: any): void;
}
