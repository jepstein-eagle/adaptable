import { BlotterApiBase } from "../../Core/Api/BlotterApiBase";
import { IBlotterApi } from "../../Core/Api/IBlotterApi";
import { AdaptableBlotter } from "./AdaptableBlotter";


export class BlotterApi extends BlotterApiBase implements IBlotterApi {

    constructor( blotter : AdaptableBlotter) {
        super(blotter)
         this.blotter = blotter;
    }

    public setDataSource(dataSource: any): void {
        // todo
    }
}