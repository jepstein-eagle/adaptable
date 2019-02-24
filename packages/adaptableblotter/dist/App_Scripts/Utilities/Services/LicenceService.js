"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
/*
Class to manage licence keys.
Checks if the User has:
* Enterprise Licence (so can load and save state)
* AdvancedModules Licence (so can load and save charts - and other stuff in the future)
*/
class LicenceService {
    constructor(blotter) {
        this.blotter = blotter;
        this.LicenceType = this.setLicenceType();
    }
    setLicenceType() {
<<<<<<< HEAD
        let licenceKey = this.blotter.BlotterOptions.licenceKey;
        // if key is empty return Community
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(licenceKey)) {
            return Enums_1.LicenceType.Community;
        }
        // turn key into 3 item array ; if fails - return Community
        let licenceKeyArray = licenceKey.split("-");
        if (ArrayExtensions_1.ArrayExtensions.NotCorrectLength(licenceKeyArray, 3)) {
            return Enums_1.LicenceType.Community;
        }
        // standard licence - allows saving of items and loading of state but not access to enterprise features (charts)
        // the whole key should be 9 characters of which 3 are numbers; if that fails, return Community
        let standardIdAlphaNumeric = licenceKeyArray[1];
        if (!this.isCorrectLength(standardIdAlphaNumeric, 9)) {
            return Enums_1.LicenceType.Community;
        }
        let standardIdString = standardIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(standardIdString, 3)) {
            return Enums_1.LicenceType.Community;
        }
        // turn the digits into a number and return Community if that fails
        let standardIdNumber = Number(standardIdString);
        if (isNaN(standardIdNumber)) {
            return Enums_1.LicenceType.Community;
        }
        // Check that its prime and return Community if that fails
        let isStandardIdValid = this.isPrimeNumber(standardIdNumber);
        if (!isStandardIdValid) {
            return Enums_1.LicenceType.Community;
        }
        // enterprise licence - allows saving and loading of state of all items (including charts)
        // the whole key should be 10 characters of which 4 are numbers; if it fails return Standard
        let enterpriseIdAlphaNumeric = licenceKeyArray[2];
        if (!this.isCorrectLength(enterpriseIdAlphaNumeric, 10)) {
            return Enums_1.LicenceType.Standard;
        }
        let enterpriseIdString = enterpriseIdAlphaNumeric.replace(/\D/g, '');
        if (!this.isCorrectLength(enterpriseIdString, 3)) {
            return Enums_1.LicenceType.Standard;
        }
        // turn digits to number ; return Standard if that fails
        let enterpriseIdNumber = Number(enterpriseIdString);
        if (isNaN(enterpriseIdNumber)) {
            return Enums_1.LicenceType.Standard;
        }
        // Check that its prime and return Standard if that fails
        let isEnterpriseValid = this.isPrimeNumber(Number(enterpriseIdNumber));
        if (!isEnterpriseValid) {
            return Enums_1.LicenceType.Standard;
        }
        return Enums_1.LicenceType.Enterprise;
=======
        let myString = this.blotter.BlotterOptions.licenceKey;
        let myArr = myString.split("-");
        let enterpriseId = myArr[1].replace(/\D/g, '');
        let isEnterpriseValid = this.isPrimeNumber(Number(enterpriseId));
        let chartId = myArr[2].replace(/\D/g, '');
        let isChartValid = this.isPrimeNumber(Number(chartId));
        if (isChartValid) {
            return Enums_1.LicenceType.Advanced;
        }
        else if (isEnterpriseValid) {
            return Enums_1.LicenceType.Enterprise;
        }
        return Enums_1.LicenceType.Community;
    }
    isPrimeNumber(num) {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return num > 1;
>>>>>>> Put charts in the given chart container
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
}
exports.LicenceService = LicenceService;
