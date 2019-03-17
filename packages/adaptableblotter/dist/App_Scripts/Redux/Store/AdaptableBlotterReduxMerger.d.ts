import { ILicenceInfo } from '../../Utilities/Interface/ILicenceInfo';
export declare function MergeStateFunctionChooser(oldState: any, newState: any, licenceInfo: ILicenceInfo): any;
export declare function MergeStateCommunityLicence(oldState: any, newState: any): any;
export declare function MergeStateStandardLicence(oldState: any, newState: any): any;
export declare function MergeStateEnterpriseLicence(oldState: any, newState: any): any;
export declare function MergeState(oldState: any, newState: any, nonMergableKeys: string[]): any;
