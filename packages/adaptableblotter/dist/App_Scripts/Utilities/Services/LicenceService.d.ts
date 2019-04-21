import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
export declare class LicenceService implements ILicenceService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    LicenceInfo: ILicenceInfo;
    private checkifRuningOnDemoSite;
    private isEmptyArray;
    private CheckIsDouble;
    private getOriginalDate;
    private CreateNewDateArray;
    private isNewPrimeNumber;
    private doubleFirstString;
    private checkDate;
}
