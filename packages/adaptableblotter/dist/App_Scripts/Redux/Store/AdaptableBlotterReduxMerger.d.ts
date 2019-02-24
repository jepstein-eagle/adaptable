import { LicenceType } from '../../Utilities/Enums';
export declare function MergeStateFunctionChooser(oldState: any, newState: any, licenceType: LicenceType): any;
export declare function MergeStateCommunityLicence(oldState: any, newState: any): any;
<<<<<<< HEAD
export declare function MergeStateStandardLicence(oldState: any, newState: any): any;
export declare function MergeStateEnterpriseLicence(oldState: any, newState: any): any;
=======
export declare function MergeStateEnterpriseLicence(oldState: any, newState: any): any;
export declare function MergeStateAdvancedLicence(oldState: any, newState: any): any;
>>>>>>> Put charts in the given chart container
export declare function MergeState(oldState: any, newState: any, nonMergableKeys: string[]): any;
