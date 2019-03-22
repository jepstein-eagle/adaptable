"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ObjectFactory_1 = require("../ObjectFactory");
const GeneralConstants_1 = require("../Constants/GeneralConstants");
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
            return this.CreateEnterpriseLicence();
        }
        // if key is empty return Community
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(licenceKey)) {
            return this.CreateCommunityLicence();
        }
        // turn key into 3 item array ; if fails - return Community
        let licenceKeyArray = licenceKey.split("-");
        if (ArrayExtensions_1.ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            return this.CreateCommunityLicence();
        }
        // Check the first part to ensure its 8 characters of which 4 are numbers
        let firstPartAlphaNumeric = licenceKeyArray[0];
        // cannot be empty
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(firstPartAlphaNumeric)) {
            return this.CreateCommunityLicence();
        }
        // has to be 8 characters
        if (!this.isCorrectLength(firstPartAlphaNumeric, 8)) {
            return this.CreateCommunityLicence();
        }
        // last lettter has to be either 't' or 'u' or 'e'
        let lastLetter = firstPartAlphaNumeric.substr(firstPartAlphaNumeric.length - 1);
        if (lastLetter != 'u' && lastLetter != 'e' && lastLetter != 't') {
            return this.CreateCommunityLicence();
        }
        // has to be 4 numbers only
        let dateString = firstPartAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(dateString, 4)) {
            return this.CreateCommunityLicence();
        }
        let dateNumber = Number(dateString);
        if (isNaN(dateNumber)) {
            return this.CreateCommunityLicence();
        }
        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters and contain an 'e' and an 'a' and 3 numbers; if any of that fails, return Community
        let standardIdAlphaNumeric = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            return this.CreateCommunityLicence();
        }
        if (StringExtensions_1.StringExtensions.NotIncludes(standardIdAlphaNumeric, 'a') || StringExtensions_1.StringExtensions.NotIncludes(standardIdAlphaNumeric, 'e')) {
            return this.CreateCommunityLicence();
        }
        let standardIdString = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            return this.CreateCommunityLicence();
        }
        // turn the digits into a number and return Community if that fails
        let standardIdNumber = Number(standardIdString);
        if (isNaN(standardIdNumber)) {
            return this.CreateCommunityLicence();
        }
        // Check that its prime and return Community if that fails
        let isStandardIdValid = this.isPrimeNumber(standardIdNumber);
        if (!isStandardIdValid) {
            return this.CreateCommunityLicence();
        }
        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters and contain an 'c' and an 'f' and 3 numbers; if any of that fails, return Standard
        // should also have a valid date
        // Now check if the date is valid
        let expiryDate = this.getExpiryDate(dateNumber);
        let isValidDate = this.isExpiryDateValid(expiryDate);
        // is it universal or end user
        let licenceUserType = this.getLicenceUserType(lastLetter);
        let enterpriseIdAlphaNumeric = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }
        if (StringExtensions_1.StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'c') || StringExtensions_1.StringExtensions.NotIncludes(enterpriseIdAlphaNumeric, 'f')) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }
        let enterpriseIdString = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }
        // turn digits to number ; return Standard if that fails
        let enterpriseIdNumber = Number(enterpriseIdString);
        if (isNaN(enterpriseIdNumber)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }
        // Check that its prime and return Standard if that fails
        let isEnterpriseValid = this.isPrimeNumber(Number(enterpriseIdNumber));
        if (!isEnterpriseValid) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, isValidDate, licenceUserType, expiryDate);
        }
        return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Enterprise, isValidDate, licenceUserType, expiryDate);
    }
    CreateCommunityLicence() {
        return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser, new Date());
    }
    CreateEnterpriseLicence() {
        return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Enterprise, true, Enums_1.LicenceUserType.EndUser, new Date(2020, 11, 31));
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
    getExpiryDate(dateNumber) {
        // if we cannot make a proper date from the input for any reason then return a fictitious date
        let oldDate = new Date(2019, 0, 1);
        let monthString = dateNumber.toString().substring(0, 2);
        let highMonthNumber = Number(monthString);
        if (isNaN(highMonthNumber)) {
            return oldDate;
        }
        let monthNumber = highMonthNumber - GeneralConstants_1.MONTH_ADD;
        if (monthNumber > 12) {
            return oldDate;
        }
        let yearString = dateNumber.toString().substring(2, 4);
        let highYearNumber = Number(yearString);
        if (isNaN(highYearNumber)) {
            return oldDate;
        }
        // make expiry date first day of following month (note: month ordinal in javascript)
        return new Date(highYearNumber + GeneralConstants_1.YEAR_ADD, monthNumber, 1);
    }
    isExpiryDateValid(expiryDate) {
        if (expiryDate.getFullYear() > 2023) {
            return false;
        }
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
