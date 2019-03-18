"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ObjectFactory_1 = require("../ObjectFactory");
/*
Class to manage licence keys.
Checks if the User has:
* Enterprise Licence (so can load and save state)
* AdvancedModules Licence (so can load and save charts - and other stuff in the future)
*/
class LicenceService {
    constructor(blotter) {
        this.blotter = blotter;
        this.LicenceInfo = this.setLicenceInfo();
    }
    setLicenceInfo() {
        let licenceKey = this.blotter.BlotterOptions.licenceKey;
        // check if demo site - if so return Enterprise
        if (this.isDemoSite()) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Enterprise, true, Enums_1.LicenceUserType.EndUser);
        }
        // if key is empty return Community
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(licenceKey)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // turn key into 3 item array ; if fails - return Community
        let licenceKeyArray = licenceKey.split("-");
        if (ArrayExtensions_1.ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // Check the first part to ensure its 8 characters of which 4 are numbers
        let firstPartAlphaNumeric = licenceKeyArray[0];
        // cannot be empty
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(firstPartAlphaNumeric)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // has to be 8 characters
        if (!this.isCorrectLength(firstPartAlphaNumeric, 8)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // last lettter has to be either 't' or 'u' or 'e'
        let lastLetter = firstPartAlphaNumeric.substr(firstPartAlphaNumeric.length - 1);
        if (lastLetter != 'u' && lastLetter != 'e' && lastLetter != 't') {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // has to be 4 numbers only
        let dateString = firstPartAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(dateString, 4)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        let dateNumber = Number(dateString);
        if (isNaN(dateNumber)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // Now check if the date is valid
        let isValidDate = this.checkDate(dateNumber);
        // is it universal or end user
        let licenceUserType = this.getLicenceUserType(lastLetter);
        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters and contain an 'e' and an 'a' and 3 numbers; if any of that fails, return Community
        let standardIdAlphaNumeric = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        if (StringExtensions_1.StringExtensions.NotIncludes(standardIdAlphaNumeric, 'a') || StringExtensions_1.StringExtensions.NotIncludes(standardIdAlphaNumeric, 'e')) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        let standardIdString = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // turn the digits into a number and return Community if that fails
        let standardIdNumber = Number(standardIdString);
        if (isNaN(standardIdNumber)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // Check that its prime and return Community if that fails
        let isStandardIdValid = this.isPrimeNumber(standardIdNumber);
        if (!isStandardIdValid) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser);
        }
        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters and contain an 'c' and an 'f' and 3 numbers; if any of that fails, return Standard
        // should also have a valid date
        let enterpriseIdAlphaNumeric = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType);
        }
        if (StringExtensions_1.StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'c') || StringExtensions_1.StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'f')) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType);
        }
        let enterpriseIdString = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType);
        }
        // turn digits to number ; return Standard if that fails
        let enterpriseIdNumber = Number(enterpriseIdString);
        if (isNaN(enterpriseIdNumber)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType);
        }
        // Check that its prime and return Standard if that fails
        let isEnterpriseValid = this.isPrimeNumber(Number(enterpriseIdNumber));
        if (!isEnterpriseValid) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType);
        }
        return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Enterprise, isValidDate, licenceUserType);
    }
    isPrimeNumber(num) {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return num > 1;
    }
    isCorrectLength(stringToCheck, requiredLength) {
        return stringToCheck.length === requiredLength;
    }
    checkDate(dateNumber) {
        // this should contain 4 numbers 
        // first 2 numbers are year second 2 are month  
        // 47, 15
        let monthString = dateNumber.toString().substring(0, 2);
        let highMonthNumber = Number(monthString);
        if (isNaN(highMonthNumber)) {
            return false;
        }
        let monthNumber = highMonthNumber - 47;
        if (monthNumber > 12) {
            return false;
        }
        let yearString = dateNumber.toString().substring(2, 4);
        let highYearNumber = Number(yearString);
        if (isNaN(highYearNumber)) {
            return false;
        }
        let yearNumber = highYearNumber - 15;
        if (yearNumber < 19 || yearNumber > 23) {
            return false;
        }
        let expiryYear = yearNumber + 2000;
        // make expiry date first day of following month (note: month ordinal in javascript)
        let expiryDate = new Date(expiryYear, monthNumber, 1);
        return expiryDate > new Date();
    }
    getLicenceUserType(lastLetter) {
        switch (lastLetter) {
            case 'u':
                return Enums_1.LicenceUserType.Universal;
            case 'e':
                return Enums_1.LicenceUserType.EndUser;
            case 't':
                return Enums_1.LicenceUserType.Team;
        }
    }
    isDemoSite() {
        return (window.location.hostname == 'demo.adaptableblotter.com');
    }
}
exports.LicenceService = LicenceService;
