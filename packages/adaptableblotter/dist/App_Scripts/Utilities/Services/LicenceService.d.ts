import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
export declare class LicenceService implements ILicenceService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    LicenceInfo: ILicenceInfo;
    private setLicenceInfo;
    private CreateCommunityLicence;
    private CreateEnterpriseLicence;
    private isPrimeNumber;
    private isCorrectLength;
    private getExpiryDate;
    private isExpiryDateValid;
    private getLicenceUserType;
    private isDemoSite;
}
