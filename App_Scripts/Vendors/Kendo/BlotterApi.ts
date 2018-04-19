import { IBlotterApi, BlotterApiBase } from "../../Core/Interface/IBlotterApi";
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