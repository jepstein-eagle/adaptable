import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LicenceType } from '../Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';

/*
Class to manage licence keys.  
Checks if the User has:
* Enterprise Licence (so can load and save state)
* AdvancedModules Licence (so can load and save charts - and other stuff in the future)
*/

export class LicenceService implements ILicenceService {

    constructor(private blotter: IAdaptableBlotter) {
        this.LicenceType = this.setLicenceType();
    }

    LicenceType: LicenceType;

    private setLicenceType(): LicenceType {

        let licenceKey: string = this.blotter.BlotterOptions.licenceKey;

        // if key is empty return Community
        if (StringExtensions.IsNullOrEmpty(licenceKey)) {
            return LicenceType.Community;
        }

        // turn key into 3 item array ; if fails - return Community
        let licenceKeyArray: string[] = licenceKey.split("-");
        if (ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            return LicenceType.Community;
        }

        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters and contain an 'e' and an 'a' and 3 numbers; if any of that fails, return Community
        let standardIdAlphaNumeric: string = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            return LicenceType.Community;
        }
        if (StringExtensions.NotIncludes(standardIdAlphaNumeric, 'a') || StringExtensions.NotIncludes(standardIdAlphaNumeric, 'e')) {
            return LicenceType.Community;
        }

        let standardIdString: string = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            return LicenceType.Community;
        }

        // turn the digits into a number and return Community if that fails
        let standardIdNumber = Number(standardIdString);
        if (isNaN(standardIdNumber)) {
            return LicenceType.Community;
        }

        // Check that its prime and return Community if that fails
        let isStandardIdValid: boolean = this.isPrimeNumber(standardIdNumber);
        if (!isStandardIdValid) {
            return LicenceType.Community;
        }

        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters and contain an 'c' and an 'f' and 3 numbers; if any of that fails, return Standard
        let enterpriseIdAlphaNumeric: string = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
            return LicenceType.Standard;
        }
        if (StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'c') || StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'f')) {
            return LicenceType.Standard;
        }

        let enterpriseIdString: string = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            return LicenceType.Standard;
        }

        // turn digits to number ; return Standard if that fails
        let enterpriseIdNumber = Number(enterpriseIdString);
        if (isNaN(enterpriseIdNumber)) {
            return LicenceType.Standard;
        }

        // Check that its prime and return Standard if that fails
        let isEnterpriseValid: boolean = this.isPrimeNumber(Number(enterpriseIdNumber));
        if (!isEnterpriseValid) {
            return LicenceType.Standard;
        }

        return LicenceType.Enterprise;
    }

    private isPrimeNumber(num: number): boolean {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return num > 1;
    }

    private isCorrectLength(stringToCheck: string, requiredLength: number): boolean {
        return stringToCheck.length === requiredLength;
    }

}
