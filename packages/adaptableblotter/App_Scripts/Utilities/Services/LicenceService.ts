import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LicenceType } from '../Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
import { ObjectFactory } from '../ObjectFactory';
import { string } from 'prop-types';

/*
Class to manage licence keys.  
Checks if the User has:
* Enterprise Licence (so can load and save state)
* AdvancedModules Licence (so can load and save charts - and other stuff in the future)
*/

export class LicenceService implements ILicenceService {

    constructor(private blotter: IAdaptableBlotter) {
        this.LicenceInfo = this.setLicenceInfo();
    }

    LicenceInfo: ILicenceInfo;

    private setLicenceInfo(): ILicenceInfo {


        let licenceKey: string = this.blotter.BlotterOptions.licenceKey;

        // if key is empty return Community
        if (StringExtensions.IsNullOrEmpty(licenceKey)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Community, true, false);
        }

        // turn key into 3 item array ; if fails - return Community
        let licenceKeyArray: string[] = licenceKey.split("-");
        if (ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Community, true, false);
        }

        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters and contain an 'e' and an 'a' and 3 numbers; if any of that fails, return Community
        let standardIdAlphaNumeric: string = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Community, true, false);
        }
        if (StringExtensions.NotIncludes(standardIdAlphaNumeric, 'a') || StringExtensions.NotIncludes(standardIdAlphaNumeric, 'e')) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Community, true, false);
        }

        let standardIdString: string = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Community, true, false);
        }

        // turn the digits into a number and return Community if that fails
        let standardIdNumber = Number(standardIdString);
        if (isNaN(standardIdNumber)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Community, true, false);
        }

        // Check that its prime and return Community if that fails
        let isStandardIdValid: boolean = this.isPrimeNumber(standardIdNumber);
        if (!isStandardIdValid) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Community, true, false);
        }

        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters and contain an 'c' and an 'f' and 3 numbers; if any of that fails, return Standard
        // should also have a valid date
        let isValidDate: boolean = this.checkDate(licenceKeyArray[0]);
        let isUniversalLicence: boolean = this.checkUniversal(licenceKeyArray[0]);

        let enterpriseIdAlphaNumeric: string = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Standard, isValidDate, isUniversalLicence);
        }
        if (StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'c') || StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'f')) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Standard, isValidDate, isUniversalLicence);
        }

        let enterpriseIdString: string = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Standard, isValidDate, isUniversalLicence);
        }

        // turn digits to number ; return Standard if that fails
        let enterpriseIdNumber = Number(enterpriseIdString);
        if (isNaN(enterpriseIdNumber)) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Standard, isValidDate, isUniversalLicence);
        }

        // Check that its prime and return Standard if that fails
        let isEnterpriseValid: boolean = this.isPrimeNumber(Number(enterpriseIdNumber));
        if (!isEnterpriseValid) {
            return ObjectFactory.CreateLicenceInfo(LicenceType.Standard, isValidDate, isUniversalLicence);
        }

        return ObjectFactory.CreateLicenceInfo(LicenceType.Enterprise, isValidDate, isUniversalLicence);

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

    private checkDate(stringToCheck: string): boolean {
        // this should contain 4 numbers 
        // first 2 numbers are year second 2 are month  
        // 47, 15
        if (StringExtensions.IsNullOrEmpty(stringToCheck)) {
            return false;
        }

        let dateString: string = stringToCheck.replace(/\D/g, '');
        if (!this.isCorrectLength(dateString, 4)) {
            return false;
        }
        let dateNumber = Number(dateString);
        if (isNaN(dateNumber)) {
            return false;
        }

        let monthString: string = dateNumber.toString().substring(0, 2);
        let highMonthNumber = Number(monthString);
        if (isNaN(highMonthNumber)) {
            return false;
        }
        let monthNumber = highMonthNumber - 47;
        if (monthNumber > 12) {
            return false;
        }

        let yearString: string = dateNumber.toString().substring(2, 4);
        let highYearNumber = Number(yearString);
        if (isNaN(highYearNumber)) {
            return false;
        }
        let yearNumber = highYearNumber - 15;
        if (yearNumber < 19 || yearNumber > 20) {
            return false;
        }

        let expiryYear: number = (yearNumber == 19) ? 2019 : 2020;

        // make expiry date first day of following month (note: month ordinal in javascript)
        let expiryDate: Date = new Date(expiryYear, monthNumber, 1);

        return expiryDate > new Date();
    }

    private checkUniversal(stringToCheck: string): boolean {
        // check if last letter is 'u'
        let lastLetter: string = stringToCheck.substring(stringToCheck.length, 1);
        alert(lastLetter);
        return lastLetter == 'u';
    }

}
