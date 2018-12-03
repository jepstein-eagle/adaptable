import { BlotterApiBase } from "../api/BlotterApiBase";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { IBlotterApi } from "../api/Interface/IBlotterApi";

export class BlotterApi extends BlotterApiBase implements IBlotterApi {


    constructor(blotter: AdaptableBlotter) {
        super(blotter)
        this.blotter = blotter;
    }

    public setGridData(dataSource: any): void {
        let theBlotter = this.blotter as AdaptableBlotter
        theBlotter.setGridData(dataSource);
    }
}