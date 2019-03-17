import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
export declare class LicenceService implements ILicenceService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    LicenceInfo: ILicenceInfo;
    private setLicenceInfo;
    private isPrimeNumber;
    private isCorrectLength;
    private checkDate;
    private getLicenceUserType;
    private isDemoSite;
}
