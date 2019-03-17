import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LicenceScopeType, LicenceUserType } from '../Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
import { ObjectFactory } from '../ObjectFactory';

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
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        // turn key into 3 item array ; if fails - return Community
        let licenceKeyArray: string[] = licenceKey.split("-");
        if (ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        // Check the first part to ensure its 8 characters of which 4 are numbers
        let firstPartAlphaNumeric: string = licenceKeyArray[0];

        // cannot be empty
        if (StringExtensions.IsNullOrEmpty(firstPartAlphaNumeric)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }
        // has to be 8 characters
        if (!this.isCorrectLength(firstPartAlphaNumeric, 8)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        // last lettter has to be eitehr 'u' or 'e'
        let lastLetter: string = firstPartAlphaNumeric.substr(firstPartAlphaNumeric.length - 1);
        if(lastLetter!= 'u' && lastLetter != 'e'){
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        // has to be 4 numbers only
        let dateString: string = firstPartAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(dateString, 4)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }
        let dateNumber = Number(dateString);
        if (isNaN(dateNumber)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        // Now check if the date is valid
        let isValidDate: boolean = this.checkDate(dateNumber);

        // is it universal or end user
        let licenceUserType: LicenceUserType = this.getLicenceUserType(lastLetter);


        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters and contain an 'e' and an 'a' and 3 numbers; if any of that fails, return Community
        let standardIdAlphaNumeric: string = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
         }
        if (StringExtensions.NotIncludes(standardIdAlphaNumeric, 'a') || StringExtensions.NotIncludes(standardIdAlphaNumeric, 'e')) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        let standardIdString: string = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        // turn the digits into a number and return Community if that fails
        let standardIdNumber = Number(standardIdString);
        if (isNaN(standardIdNumber)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
        }

        // Check that its prime and return Community if that fails
        let isStandardIdValid: boolean = this.isPrimeNumber(standardIdNumber);
        if (!isStandardIdValid) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser);
         }

        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters and contain an 'c' and an 'f' and 3 numbers; if any of that fails, return Standard
        // should also have a valid date

        let enterpriseIdAlphaNumeric: string = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType);
        }
        if (StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'c') || StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'f')) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType);
        }

        let enterpriseIdString: string = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType);
        }

        // turn digits to number ; return Standard if that fails
        let enterpriseIdNumber = Number(enterpriseIdString);
        if (isNaN(enterpriseIdNumber)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType);
        }

        // Check that its prime and return Standard if that fails
        let isEnterpriseValid: boolean = this.isPrimeNumber(Number(enterpriseIdNumber));
        if (!isEnterpriseValid) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType);
        }

        return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Enterprise, isValidDate, licenceUserType);

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

    private checkDate(dateNumber: number): boolean {
        // this should contain 4 numbers 
        // first 2 numbers are year second 2 are month  
        // 47, 15


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

    private getLicenceUserType(lastLetter: string): LicenceUserType {
        // check if last letter is 'u'
        console.log("domain name" + window.location.hostname);
      //  let lastLetter: string = stringToCheck.substr(stringToCheck.length - 1);
        return (lastLetter == 'u')? LicenceUserType.Universal: LicenceUserType.EndUser;
    }

}
