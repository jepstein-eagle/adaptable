import { IBlotterApi } from "../../Core/Interface/IBlotterApi";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { AdaptableBlotter } from "./AdaptableBlotter";

export class BlotterApi implements IBlotterApi {

    constructor(private blotter : AdaptableBlotter) {
        //we init with defaults then overrides with options passed in the constructor
        this.blotter = blotter;
    }

    public setDataSource(dataSource: any): void {
        this.blotter.setData(dataSource)
    }
}