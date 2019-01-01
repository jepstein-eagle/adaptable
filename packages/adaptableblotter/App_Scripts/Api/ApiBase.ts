import { IAdaptableBlotter } from "./Interface/IAdaptableBlotter";
import { Action } from "redux";
import { AdaptableBlotterState } from "../Redux/Store/Interface/IAdaptableStore";

export abstract class ApiBase {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public dispatchAction(action: Action): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(action)
    }

    public getState(): AdaptableBlotterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState()
    }
}