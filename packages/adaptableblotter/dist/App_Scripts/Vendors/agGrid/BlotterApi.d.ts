import { BlotterApiBase } from "../../Core/Api/BlotterApiBase";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { IBlotterApi } from "../../Core/Api/Interface/IBlotterApi";
export declare class BlotterApi extends BlotterApiBase implements IBlotterApi {
    constructor(blotter: AdaptableBlotter);
    setGridData(dataSource: any): void;
}
