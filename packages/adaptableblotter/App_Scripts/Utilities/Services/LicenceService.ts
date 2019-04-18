import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LicenceScopeType, LicenceUserType } from '../Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
import { ObjectFactory } from '../ObjectFactory';
import { YEAR_ADD, MONTH_ADD } from '../Constants/GeneralConstants';
import { BlotterHelper } from '../Helpers/BlotterHelper';

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

        // check if demo site - if so return Enterprise
        if (BlotterHelper.IsDemoSite()) {
            return this.CreateEnterpriseLicence();
        }

        // if key is empty return Community
        if (StringExtensions.IsNullOrEmpty(licenceKey)) {
            return this.CreateCommunityLicence();
        }

        // turn key into 3 item array ; if fails - return Community
        let licenceKeyArray: string[] = licenceKey.split("-");
        if (ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            return this.CreateCommunityLicence();
        }

        // Check the first part to ensure its 8 characters of which 4 are numbers
        let firstPartAlphaNumeric: string = licenceKeyArray[0];

        // cannot be empty
        if (StringExtensions.IsNullOrEmpty(firstPartAlphaNumeric)) {
            return this.CreateCommunityLicence();
        }
        // has to be 8 characters
        if (!this.isCorrectLength(firstPartAlphaNumeric, 8)) {
            return this.CreateCommunityLicence();
        }

        // last lettter has to be either 't' or 'u' or 'e'
        let lastLetter: string = firstPartAlphaNumeric.substr(firstPartAlphaNumeric.length - 1);
        if (lastLetter != 'u' && lastLetter != 'e' && lastLetter != 't') {
            return this.CreateCommunityLicence();
        }

        // has to be 4 numbers only
        let dateString: string = firstPartAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(dateString, 4)) {
            return this.CreateCommunityLicence();
        }
        let dateNumber = Number(dateString);
        if (isNaN(dateNumber)) {
            return this.CreateCommunityLicence();
        }


        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters and contain an 'e' and an 'a' and 3 numbers; if any of that fails, return Community
        let standardIdAlphaNumeric: string = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            return this.CreateCommunityLicence();
        }
        if (StringExtensions.NotIncludes(standardIdAlphaNumeric, 'a') || StringExtensions.NotIncludes(standardIdAlphaNumeric, 'e')) {
            return this.CreateCommunityLicence();
        }

        let standardIdString: string = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            return this.CreateCommunityLicence();
        }

        // turn the digits into a number and return Community if that fails
        let standardIdNumber = Number(standardIdString);
        if (isNaN(standardIdNumber)) {
            return this.CreateCommunityLicence();
        }

        // Check that its prime and return Community if that fails
        let isStandardIdValid: boolean = this.isPrimeNumber(standardIdNumber);
        if (!isStandardIdValid) {
            return this.CreateCommunityLicence();
        }

        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters and contain an 'c' and an 'f' and 3 numbers; if any of that fails, return Standard
        // should also have a valid date

        // Now check if the date is valid
        let expiryDate: Date = this.getExpiryDate(dateNumber);
        let isValidDate: boolean = this.isExpiryDateValid(expiryDate);
        
        // is it universal or end user
        let licenceUserType: LicenceUserType = this.getLicenceUserType(lastLetter);

        let enterpriseIdAlphaNumeric: string = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }
        if (StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'c') || StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'f')) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }

        let enterpriseIdString: string = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }

        // turn digits to number ; return Standard if that fails
        let enterpriseIdNumber = Number(enterpriseIdString);
        if (isNaN(enterpriseIdNumber)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }

        // Check that its prime and return Standard if that fails
        let isEnterpriseValid: boolean = this.isPrimeNumber(Number(enterpriseIdNumber));
        if (!isEnterpriseValid) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }

        return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Enterprise, isValidDate, licenceUserType, expiryDate);
    }

    private CreateCommunityLicence(): ILicenceInfo {
        return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser, new Date());
    }

    private CreateEnterpriseLicence(): ILicenceInfo {
        return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Enterprise, true, LicenceUserType.EndUser, new Date(2020, 11, 31));
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

    private getExpiryDate(dateNumber: number): Date {
         // if we cannot make a proper date from the input for any reason then return a fictitious date
        let oldDate: Date = new Date(2019, 0, 1);

        let monthString: string = dateNumber.toString().substring(0, 2);
        let highMonthNumber = Number(monthString);
        if (isNaN(highMonthNumber)) {
            return oldDate;
        }
        let monthNumber = highMonthNumber - MONTH_ADD;
        if (monthNumber > 12) {
            return oldDate;
        }

        let yearString: string = dateNumber.toString().substring(2, 4);
        let highYearNumber = Number(yearString);
        if (isNaN(highYearNumber)) {
            return oldDate;
        }

        // make expiry date first day of following month (note: month ordinal in javascript)
        return new Date(highYearNumber + YEAR_ADD, monthNumber, 1);
    }

    private isExpiryDateValid(expiryDate: Date): boolean {
        if (expiryDate.getFullYear() > 2023) {
            return false;
        }
        return expiryDate > new Date();
    }

    private getLicenceUserType(lastLetter: string): LicenceUserType {
        switch (lastLetter) {
            case 'u':
                return LicenceUserType.Universal;
            case 'e':
                return LicenceUserType.EndUser;
            case 't':
                return LicenceUserType.Team;
        }
    }






}
