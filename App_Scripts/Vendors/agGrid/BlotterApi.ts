import { IBlotterApi, BlotterApiBase } from "../../Core/Interface/IBlotterApi";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { EventDispatcher } from "../../Core/EventDispatcher";
import { IEvent } from "../../Core/Interface/IEvent";

export class BlotterApi extends BlotterApiBase implements IBlotterApi {

    constructor( blotter : AdaptableBlotter) {
        super(blotter)
         this.blotter = blotter;
    }

    public setDataSource(dataSource: any): void {
        let theBlotter = this.blotter as AdaptableBlotter
       
        theBlotter.setData(dataSource)
    }

    
}
