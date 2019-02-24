import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LicenceType } from '../Enums';
export declare class LicenceService implements ILicenceService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    LicenceType: LicenceType;
    private setLicenceType;
    private isPrimeNumber;
<<<<<<< HEAD
    private isCorrectLength;
=======
>>>>>>> Put charts in the given chart container
}
