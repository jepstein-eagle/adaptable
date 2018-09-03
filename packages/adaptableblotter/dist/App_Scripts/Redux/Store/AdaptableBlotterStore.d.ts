import * as Redux from "redux";
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore';
export interface ResetUserDataAction extends Redux.Action {
}
export interface InitStateAction extends Redux.Action {
}
export declare const ResetUserData: () => ResetUserDataAction;
export declare const InitState: () => ResetUserDataAction;
export declare class AdaptableBlotterStore implements IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>;
    Load: PromiseLike<any>;
    constructor(blotter: IAdaptableBlotter);
}
