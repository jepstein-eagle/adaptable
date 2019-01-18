import { IAdaptableBlotter } from "../Utilities/Interface/IAdaptableBlotter";
import { Action } from "redux";
import { AdaptableBlotterState } from "../Redux/Store/Interface/IAdaptableStore";
import { LoggingHelper } from "../Utilities/Helpers/LoggingHelper";

// Base class for the API - provides checking dispatching methods
export abstract class ApiBase {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public checkItemExists(item: any, name: string, type: string): boolean {
        if (!item) {
          LoggingHelper.LogError("No " + type + " found with the name: " + name)
          return false;
        }
        return true;
      }

    public dispatchAction(action: Action): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(action)
    }

    public getState(): AdaptableBlotterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState()
    }
}