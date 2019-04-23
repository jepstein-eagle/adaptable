import { ILicenceInfo } from '../../Utilities/Interface/ILicenceInfo';
import { AdaptableBlotterState } from './Interface/IAdaptableStore';
import { IState } from '../ActionsReducers/Interface/IState';
export declare function MergeStateFunctionChooser(oldState: any, newState: any, licenceInfo: ILicenceInfo): any;
export declare function MergeStateCommunityLicence(oldState: any, newState: any): any;
export declare function MergeStateStandardLicence(oldState: any, newState: any): any;
export declare function MergeStateEnterpriseLicence(oldState: any, newState: any): any;
export declare function MergeState(oldState: any, newState: any, nonMergableKeys: string[]): any;
declare type TypeReducer = (state: AdaptableBlotterState, action: {
    type: string;
    State?: {
        [s: string]: IState;
    };
}) => AdaptableBlotterState;
export declare const licenseMergeReducer: (rootReducer: TypeReducer, licenceInfo: ILicenceInfo, LOAD_STATE_TYPE: string) => TypeReducer;
export {};
