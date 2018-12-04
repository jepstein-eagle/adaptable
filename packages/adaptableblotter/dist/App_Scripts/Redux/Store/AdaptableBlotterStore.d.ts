import * as Redux from "redux";
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore';
import { IState } from '../ActionsReducers/Interface/IState';
export interface ResetUserDataAction extends Redux.Action {
}
export interface InitStateAction extends Redux.Action {
}
export interface LoadStateAction extends Redux.Action {
    State: {
        [s: string]: IState;
    };
}
export declare const ResetUserData: () => ResetUserDataAction;
export declare const InitState: () => ResetUserDataAction;
export declare const LoadState: (State: {
    [s: string]: IState;
}) => LoadStateAction;
export declare class AdaptableBlotterStore implements IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>;
    Load: PromiseLike<any>;
    constructor(blotter: IAdaptableBlotter);
}
