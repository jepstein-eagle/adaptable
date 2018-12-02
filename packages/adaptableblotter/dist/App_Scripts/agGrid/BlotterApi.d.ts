import { BlotterApiBase } from "../Api/BlotterApiBase";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { IBlotterApi } from "../Api/Interface/IBlotterApi";
export declare class BlotterApi extends BlotterApiBase implements IBlotterApi {
    constructor(blotter: AdaptableBlotter);
    setGridData(dataSource: any): void;
}
