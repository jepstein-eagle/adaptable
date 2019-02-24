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

        if (StringExtensions.IsNullOrEmpty(licenceKey)) {
            alert(1)
            return LicenceType.Community;
        }

        let licenceKeyArray: string[] = licenceKey.split("-");
        if (ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            alert(2)
              return LicenceType.Community;
        }

        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters of which 4 are numbers
        let standardIdAlphaNumeric: string = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            alert(3)
               return LicenceType.Community;
        }
        let standardIdString: string = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            alert(4)
            alert(standardIdString)
               return LicenceType.Community;
        }

         let standardIdNumber = Number(standardIdString);
        if(isNaN(standardIdNumber)){
            alert(5)
                return LicenceType.Community;       
        }
        let isStandardIdValid: boolean = this.isPrimeNumber(standardIdNumber);
        if(!isStandardIdValid){
            return LicenceType.Community;
        }

        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters of which 4 are numbers
        let enterpriseIdAlphaNumeric: string = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
              return LicenceType.Standard;
        }
        let enterpriseIdString: string = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            alert(7)
            return LicenceType.Standard;
        }

        // need a NAN check???
        let enterpriseIdNumber = Number(enterpriseIdString);
        if(isNaN(enterpriseIdNumber)){
            alert(8)
            return LicenceType.Standard;
        }
        let isEnterpriseValid: boolean = this.isPrimeNumber(Number(enterpriseIdNumber));
        if(!isEnterpriseValid){
            return LicenceType.Standard;
        }


        if (isEnterpriseValid) {
            return LicenceType.Enterprise
        } else if (isStandardIdValid) {
            return LicenceType.Standard;
        }

        return LicenceType.Community;
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
