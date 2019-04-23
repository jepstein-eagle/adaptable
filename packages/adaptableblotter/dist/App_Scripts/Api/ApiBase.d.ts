import { IAdaptableBlotter } from "../Utilities/Interface/IAdaptableBlotter";
import { Action } from "redux";
import { AdaptableBlotterState } from "../Redux/Store/Interface/IAdaptableStore";
export declare abstract class ApiBase {
    protected blotter: IAdaptableBlotter;
    constructor(blotter: IAdaptableBlotter);
    checkItemExists(item: any, name: string, type: string): boolean;
    dispatchAction(action: Action): void;
    getBlotterState(): AdaptableBlotterState;
}
