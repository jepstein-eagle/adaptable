import { BlotterApiBase } from "../api/BlotterApiBase";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { IBlotterApi } from "../api/Interface/IBlotterApi";
export declare class BlotterApi extends BlotterApiBase implements IBlotterApi {
    constructor(blotter: AdaptableBlotter);
    setGridData(dataSource: any): void;
}
